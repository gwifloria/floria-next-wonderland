import { NextRequest, NextResponse } from "next/server";
import { WhisperParser } from "@/services/whisperParser";
import WhisperEntry from "@/app/api/models/WhisperEntry";
import dbConnect from "@/app/api/lib/mongoose";
import { WhisperUploadResponse } from "@/types/whisper";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "HTML file is required" },
        { status: 400 },
      );
    }

    // Validate file type
    if (!file.name.endsWith(".html")) {
      return NextResponse.json(
        { error: "Only HTML files are supported" },
        { status: 400 },
      );
    }

    // Read HTML content
    const htmlContent = await file.text();

    console.log(`Processing file: ${file.name}`);

    // Parse the HTML
    const parseResult = await WhisperParser.parseWhisperHTML(
      htmlContent,
      file.name,
    );

    console.log(
      `Parse result: ${parseResult.entries.length} entries, ${parseResult.errors.length} errors`,
    );

    if (parseResult.errors.length > 0 && parseResult.entries.length === 0) {
      return NextResponse.json(
        {
          error: "Failed to parse HTML file",
          details: parseResult.errors,
        },
        { status: 400 },
      );
    }

    // Handle image files (simplified - no file copying needed for uploaded HTML)
    const imageCopyResult = await WhisperParser.copyImageFiles(
      parseResult.imageFiles,
    );

    // Save entries to database
    const savedEntries = [];
    const duplicates = [];
    const saveErrors = [];

    for (const entry of parseResult.entries) {
      try {
        // Check for existing entry with same originalId and source
        const existing = await WhisperEntry.findOne({
          originalId: entry.originalId,
          source: "whisper",
        });

        if (existing) {
          duplicates.push({
            originalId: entry.originalId,
            timestamp: entry.timestamp.toISOString(),
            reason: "Already exists",
          });
          continue;
        }

        // Create new entry
        const whisperEntry = new WhisperEntry({
          originalId: entry.originalId,
          timestamp: entry.timestamp,
          content: entry.content,
          originalHtml: entry.originalHtml,
          images: entry.images,
          tags: entry.tags,
          source: "whisper",
          sourceFile: file.name,
          visibility: "private", // Default to private
        });

        const saved = await whisperEntry.save();
        savedEntries.push({
          id: saved.id,
          timestamp: saved.timestamp,
          contentPreview: saved.content.substring(0, 100),
        });
      } catch (error) {
        console.error("Error saving entry:", error);
        saveErrors.push({
          timestamp: entry.timestamp.toISOString(),
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const response: WhisperUploadResponse = {
      success: true,
      summary: {
        totalParsed: parseResult.totalEntries,
        saved: savedEntries.length,
        duplicates: duplicates.length,
        errors: saveErrors.length,
      },
      details: {
        savedEntries,
        duplicates,
        saveErrors,
        parseErrors: parseResult.errors,
        imageFiles: {
          processed: parseResult.imageFiles.length,
          copied: imageCopyResult.success.length,
          errors: imageCopyResult.errors,
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to process upload",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to upload." },
    { status: 405 },
  );
}
