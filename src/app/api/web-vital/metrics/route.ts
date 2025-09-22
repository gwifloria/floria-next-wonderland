import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/api/lib/mongoose";
import { WebVitalMetric } from "@/app/api/models/WebVitalMetric";
import { logger } from "@/monitoring/logger";
import * as Sentry from "@sentry/nextjs";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "json";
    const timeframe = searchParams.get("timeframe") || "24h";
    const metricName = searchParams.get("name");

    // Calculate time range
    const now = new Date();
    let startTime: Date;

    switch (timeframe) {
      case "1h":
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case "24h":
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "7d":
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    // Build query
    const query: any = {
      timestamp: { $gte: startTime },
    };

    if (metricName) {
      query.name = metricName;
    }

    // Fetch metrics
    const metrics = await WebVitalMetric.find(query)
      .sort({ timestamp: -1 })
      .limit(1000)
      .lean();

    if (format === "prometheus") {
      // Return Prometheus format
      const prometheusOutput = generatePrometheusFormat(metrics);

      return new NextResponse(prometheusOutput, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Return JSON format with aggregated data
    const aggregated = aggregateMetrics(metrics);

    logger.info("Web vital metrics requested", {
      format,
      timeframe,
      metricName,
      count: metrics.length,
      type: "web-vital-metrics",
    });

    return NextResponse.json({
      success: true,
      timeframe,
      count: metrics.length,
      startTime: startTime.toISOString(),
      endTime: now.toISOString(),
      metrics: aggregated,
      raw: format === "raw" ? metrics : undefined,
    });
  } catch (error) {
    logger.error("Failed to fetch web vital metrics", error as Error, {
      query: request.url,
    });

    Sentry.captureException(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function aggregateMetrics(metrics: any[]) {
  const grouped = metrics.reduce((acc, metric) => {
    const key = metric.name;
    if (!acc[key]) {
      acc[key] = {
        name: key,
        help: metric.help,
        count: 0,
        values: [],
        labels: new Set(),
      };
    }

    acc[key].count++;
    if (metric.labels.value !== undefined) {
      acc[key].values.push(metric.labels.value);
    }

    // Collect unique label combinations
    Object.keys(metric.labels).forEach((label) => {
      acc[key].labels.add(label);
    });

    return acc;
  }, {});

  // Calculate statistics for each metric
  return Object.values(grouped).map((metric: any) => ({
    name: metric.name,
    help: metric.help,
    count: metric.count,
    labels: Array.from(metric.labels),
    stats:
      metric.values.length > 0
        ? {
            min: Math.min(...metric.values),
            max: Math.max(...metric.values),
            avg:
              metric.values.reduce((a: number, b: number) => a + b, 0) /
              metric.values.length,
            median: calculateMedian(metric.values),
          }
        : null,
  }));
}

function calculateMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    return sorted[mid];
  }
}

function generatePrometheusFormat(metrics: any[]): string {
  const grouped = metrics.reduce((acc, metric) => {
    const key = metric.name;
    if (!acc[key]) {
      acc[key] = {
        help: metric.help,
        type: "gauge",
        samples: [],
      };
    }

    // Build label string
    const labelPairs = Object.entries(metric.labels)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}="${value}"`)
      .join(",");

    const labelStr = labelPairs ? `{${labelPairs}}` : "";
    const value = metric.labels.value || 0;
    const timestamp = new Date(metric.timestamp).getTime();

    acc[key].samples.push(`${key}${labelStr} ${value} ${timestamp}`);
    return acc;
  }, {});

  let output = "";

  for (const [metricName, data] of Object.entries(grouped) as [string, any][]) {
    output += `# HELP ${metricName} ${data.help}\n`;
    output += `# TYPE ${metricName} ${data.type}\n`;

    for (const sample of data.samples) {
      output += `${sample}\n`;
    }
    output += "\n";
  }

  return output;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
