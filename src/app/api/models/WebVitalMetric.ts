import mongoose from "mongoose";

export interface IWebVitalMetric {
  name: string;
  help: string;
  labels: Record<string, any>;
  value?: number;
  timestamp: Date;
  url?: string;
  userAgent?: string;
  sessionId?: string;
}

const WebVitalMetricSchema = new mongoose.Schema<IWebVitalMetric>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    help: {
      type: String,
      required: true,
    },
    labels: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    value: {
      type: Number,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    url: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    sessionId: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "webVitalMetrics",
  },
);

// Create indexes for better query performance
WebVitalMetricSchema.index({ name: 1, timestamp: -1 });
WebVitalMetricSchema.index({ sessionId: 1, timestamp: -1 });

export const WebVitalMetric =
  mongoose.models.WebVitalMetric ||
  mongoose.model<IWebVitalMetric>("WebVitalMetric", WebVitalMetricSchema);
