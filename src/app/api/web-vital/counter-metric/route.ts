import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/api/lib/mongoose";
import { WebVitalMetric } from "@/app/api/models/WebVitalMetric";
import { logger } from "@/monitoring/logger";
import * as Sentry from "@sentry/nextjs";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, help, labels } = body;

    if (!name || !help || !labels) {
      return NextResponse.json(
        { error: "Missing required fields: name, help, labels" },
        { status: 400 },
      );
    }

    // Extract additional context from request
    const userAgent = request.headers.get("user-agent") || undefined;
    const referer = request.headers.get("referer") || undefined;

    // Create metric entry
    const metric = new WebVitalMetric({
      name,
      help,
      labels,
      value: labels.value || undefined,
      url: referer,
      userAgent,
      sessionId: labels.sessionId || undefined,
    });

    await metric.save();

    // Log the metric
    logger.info(`Web Vital counter metric recorded: ${name}`, {
      name,
      labels,
      value: labels.value,
      type: "web-vital-counter",
    });

    // Add to Sentry for monitoring
    Sentry.addBreadcrumb({
      category: "web-vitals-legacy",
      message: `Counter metric: ${name}`,
      level: "info",
      data: {
        name,
        labels,
        value: labels.value,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Metric recorded successfully",
      id: metric._id,
    });
  } catch (error) {
    logger.error("Failed to record web vital counter metric", error as Error, {
      body: await request.text().catch(() => "Failed to read body"),
    });

    Sentry.captureException(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
