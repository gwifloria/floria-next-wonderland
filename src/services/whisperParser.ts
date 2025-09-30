import path from "path";
import { promises as fs } from "fs";
import crypto from "crypto";
import { ParsedWhisperEntry, WhisperParseResult } from "@/types/whisper";

export class WhisperParser {
  private static readonly IMAGE_BASE_PATH = "/uploads/whisper/images";
  private static readonly PUBLIC_PATH = path.join(process.cwd(), "public");

  /**
   * Parse whisper HTML export file using regex (no JSDOM dependency)
   */
  static async parseWhisperHTML(
    htmlContent: string,
    sourceFileName?: string,
  ): Promise<WhisperParseResult> {
    const result: WhisperParseResult = {
      entries: [],
      totalEntries: 0,
      imageFiles: [],
      errors: [],
    };

    try {
      // Extract all memo blocks using a more robust approach for nested divs
      const memoBlocks = this.extractMemoBlocks(htmlContent);
      result.totalEntries = memoBlocks.length;

      console.log(`Found ${memoBlocks.length} memo entries`);

      for (let i = 0; i < memoBlocks.length; i++) {
        try {
          const memoHtml = memoBlocks[i];
          const entry = await this.parseMemoBlock(
            memoHtml,
            sourceFileName,
            result.imageFiles,
          );
          if (entry) {
            result.entries.push(entry);
          }
        } catch (error) {
          console.error(`Error parsing memo ${i + 1}:`, error);
          result.errors.push(
            `Error parsing memo ${i + 1}: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      }
    } catch (error) {
      console.error("Error parsing HTML:", error);
      result.errors.push(
        `Error parsing HTML: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return result;
  }

  /**
   * Extract memo blocks handling nested divs properly
   */
  private static extractMemoBlocks(htmlContent: string): string[] {
    const memoBlocks: string[] = [];
    let index = 0;

    while (index < htmlContent.length) {
      // Find the start of a memo block
      const memoStart = htmlContent.indexOf('<div class="memo">', index);
      if (memoStart === -1) break;

      // Find the content start (after the opening tag)
      const contentStart = memoStart + '<div class="memo">'.length;

      // Find the matching closing tag by counting nested divs
      let divCount = 1;
      let currentIndex = contentStart;
      let contentEnd = -1;

      while (currentIndex < htmlContent.length && divCount > 0) {
        const nextOpenDiv = htmlContent.indexOf("<div", currentIndex);
        const nextCloseDiv = htmlContent.indexOf("</div>", currentIndex);

        if (nextCloseDiv === -1) break;

        if (nextOpenDiv !== -1 && nextOpenDiv < nextCloseDiv) {
          // Found an opening div before closing div
          divCount++;
          currentIndex = nextOpenDiv + 4;
        } else {
          // Found a closing div
          divCount--;
          if (divCount === 0) {
            contentEnd = nextCloseDiv;
          }
          currentIndex = nextCloseDiv + 6;
        }
      }

      if (contentEnd !== -1) {
        // Extract the content between opening and closing memo tags
        const memoContent = htmlContent
          .substring(contentStart, contentEnd)
          .trim();
        memoBlocks.push(memoContent);
        index = contentEnd + 6;
      } else {
        // Malformed HTML, skip to next potential memo
        index = contentStart;
      }
    }

    return memoBlocks;
  }

  /**
   * Parse individual memo block using regex
   */
  private static async parseMemoBlock(
    memoHtml: string,
    sourceFileName?: string,
    imageFiles?: Array<{ original: string; target: string }>,
  ): Promise<ParsedWhisperEntry | null> {
    // Extract timestamp - handle cases where closing div might be missing
    const timeMatch = memoHtml.match(/<div class="time">([^<]*)/);
    if (!timeMatch) {
      throw new Error("No timestamp found in memo");
    }

    const timestamp = this.parseTimestamp(timeMatch[1].trim());
    const originalId = this.generateOriginalId(timestamp, sourceFileName);

    // Extract content - be more flexible with the HTML structure
    const contentMatch = memoHtml.match(
      /<div class="content">([\s\S]*?)(?:<\/div>|$)/,
    );
    if (!contentMatch) {
      throw new Error("No content found in memo");
    }

    const { content, tags } = this.parseContent(contentMatch[1]);
    const originalHtml = contentMatch[1];

    // Extract images
    const images: string[] = [];
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(memoHtml)) !== null) {
      const src = imgMatch[1];
      if (imageFiles) {
        const targetPath = await this.processImage(src, originalId, imageFiles);
        if (targetPath) {
          images.push(targetPath);
        }
      }
    }

    return {
      originalId,
      timestamp,
      content,
      originalHtml,
      images,
      tags,
    };
  }

  /**
   * Parse timestamp string to Date object
   */
  private static parseTimestamp(timeString: string): Date {
    // Expected format: "2025-09-29 17:50:09"
    const date = new Date(timeString.replace(" ", "T") + "Z");
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid timestamp format: ${timeString}`);
    }
    return date;
  }

  /**
   * Generate a unique ID for the entry
   */
  private static generateOriginalId(
    timestamp: Date,
    sourceFileName?: string,
  ): string {
    const timeStr = timestamp.getTime().toString();
    const fileStr = sourceFileName || "unknown";
    return crypto
      .createHash("md5")
      .update(`${timeStr}-${fileStr}`)
      .digest("hex")
      .substring(0, 16);
  }

  /**
   * Parse content HTML and extract tags
   */
  private static parseContent(contentHtml: string): {
    content: string;
    tags: string[];
  } {
    // Extract paragraphs using regex
    const pRegex = /<p>([\s\S]*?)<\/p>/g;
    const paragraphs = [...contentHtml.matchAll(pRegex)];

    const contentLines: string[] = [];
    const tags: string[] = [];

    for (const pMatch of paragraphs) {
      const text = this.stripHtmlTags(pMatch[1]).trim();

      // Skip empty paragraphs
      if (!text) {
        contentLines.push("");
        continue;
      }

      // Extract hashtags as tags
      const hashtagMatches = text.match(/#[\u4e00-\u9fa5\w]+/g);
      if (hashtagMatches) {
        tags.push(...hashtagMatches.map((tag) => tag.substring(1))); // Remove #
      }

      contentLines.push(text);
    }

    // Remove trailing empty lines
    while (contentLines.length > 0 && !contentLines[contentLines.length - 1]) {
      contentLines.pop();
    }

    const content = contentLines.join("\n\n");
    const uniqueTags = [...new Set(tags)]; // Remove duplicates

    return { content, tags: uniqueTags };
  }

  /**
   * Strip HTML tags from text
   */
  private static stripHtmlTags(html: string): string {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  }

  /**
   * Process image file and prepare for copying
   */
  private static async processImage(
    originalPath: string,
    entryId: string,
    imageFiles: Array<{ original: string; target: string }>,
  ): Promise<string | null> {
    try {
      // Handle base64 encoded images
      if (originalPath.startsWith("data:image/")) {
        const timestamp = Date.now();
        const ext = this.getBase64Extension(originalPath);
        const newFileName = `${entryId}_${timestamp}.${ext}`;
        const targetRelativePath = `${this.IMAGE_BASE_PATH}/${newFileName}`;

        // Store base64 data for extraction
        imageFiles.push({
          original: originalPath, // This contains the base64 data
          target: targetRelativePath,
        });

        return targetRelativePath;
      }

      // Handle external URLs - keep as is
      if (
        originalPath.startsWith("http://") ||
        originalPath.startsWith("https://")
      ) {
        return originalPath;
      }

      // Handle local file paths
      const fileName = path.basename(originalPath);
      const ext = path.extname(fileName);

      // Generate new filename with entry ID
      const timestamp = Date.now();
      const newFileName = `${entryId}_${timestamp}${ext}`;
      const targetRelativePath = `${this.IMAGE_BASE_PATH}/${newFileName}`;

      // Store mapping for file copying
      imageFiles.push({
        original: originalPath,
        target: targetRelativePath,
      });

      return targetRelativePath;
    } catch (error) {
      console.error("Error processing image:", error);
      return null;
    }
  }

  /**
   * Extract file extension from base64 data URL
   */
  private static getBase64Extension(dataUrl: string): string {
    const match = dataUrl.match(/^data:image\/(\w+);base64,/);
    return match ? match[1] : "png";
  }

  /**
   * Extract and save images from base64 data or copy from local paths
   */
  static async copyImageFiles(
    imageFiles: Array<{ original: string; target: string }>,
    sourceDir?: string,
  ): Promise<{ success: string[]; errors: string[] }> {
    const success: string[] = [];
    const errors: string[] = [];

    for (const file of imageFiles) {
      try {
        // Handle base64 encoded images
        if (file.original.startsWith("data:image/")) {
          await this.saveBase64Image(file.original, file.target);
          success.push(file.target);
        }
        // Handle external URLs - no need to download, they're referenced directly
        else if (
          file.original.startsWith("http://") ||
          file.original.startsWith("https://")
        ) {
          success.push(file.target);
        }
        // Handle local file paths - would need source directory
        else if (sourceDir) {
          const sourcePath = path.join(sourceDir, file.original);
          const targetPath = path.join(this.PUBLIC_PATH, file.target);

          // Ensure target directory exists
          await fs.mkdir(path.dirname(targetPath), { recursive: true });

          // Copy file
          await fs.copyFile(sourcePath, targetPath);
          success.push(file.target);
        } else {
          errors.push(
            `Cannot copy local file without source directory: ${file.original}`,
          );
        }
      } catch (error) {
        console.error(`Error processing image ${file.original}:`, error);
        errors.push(
          `${file.original}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    return { success, errors };
  }

  /**
   * Save base64 encoded image to disk
   */
  private static async saveBase64Image(
    dataUrl: string,
    targetPath: string,
  ): Promise<void> {
    // Extract base64 data
    const matches = dataUrl.match(/^data:image\/\w+;base64,(.+)$/);
    if (!matches) {
      throw new Error("Invalid base64 data URL");
    }

    const base64Data = matches[1];
    const buffer = Buffer.from(base64Data, "base64");

    // Ensure target directory exists
    const fullPath = path.join(this.PUBLIC_PATH, targetPath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });

    // Write file
    await fs.writeFile(fullPath, buffer);
  }
}
