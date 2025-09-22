"use client";
import { useCallback, useEffect } from "react";
import { Metric, onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from "web-vitals";
import { logger } from "@/monitoring/logger";
import {
  performanceMonitor,
  PerformanceMetric,
} from "@/monitoring/performance";
import * as Sentry from "@sentry/nextjs";

export const useWebVital = () => {
  async function report(name: string, labels: any, help = "default help") {
    try {
      await fetch("/web-vital/counter-metric", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          help,
          labels,
        }),
      });
    } catch (error) {
      logger.error("Failed to report web vital metric", error as Error, {
        metricName: name,
        labels,
      });
    }
  }
  useEffect(() => {
    // Initialize Web Vitals monitoring
    logger.info("Web Vitals monitoring initialized", {
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  }, []);
  const onGetWebVitalsData = useCallback((data: Metric) => {
    if (!data?.name) {
      return;
    }

    const { name, value, rating, id, navigationType } = data;

    // Log the metric
    logger.info(`Web Vital: ${name}`, {
      value,
      rating,
      id,
      navigationType,
      type: "web-vital",
    });

    // Create performance metric for our monitoring system
    const performanceMetric: PerformanceMetric = {
      name: `web-vital-${name}`,
      value,
      rating: rating as "good" | "needs-improvement" | "poor",
      timestamp: Date.now(),
      url: window.location.href,
      sessionId: performanceMonitor.getSessionId(),
      metadata: {
        id,
        navigationType,
        webVital: true,
      },
    };

    // Send to Sentry
    Sentry.addBreadcrumb({
      category: "web-vitals",
      message: `${name}: ${value} (${rating})`,
      level: rating === "poor" ? "warning" : "info",
      data: {
        value,
        rating,
        id,
      },
    });

    // Send to integrated Web Vitals API (legacy format)
    report(name, { rating, value });

    // Send to new monitoring API for all metrics
    sendToMonitoringAPI(performanceMetric);
  }, []);

  const sendToMonitoringAPI = async (metric: PerformanceMetric) => {
    try {
      await fetch("/api/monitoring/web-vitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metric),
      });
    } catch (error) {
      logger.debug("Failed to send web vital to monitoring API", { error });
    }
  };

  useEffect(() => {
    onFCP(onGetWebVitalsData);
    onLCP(onGetWebVitalsData);
    onFID(onGetWebVitalsData);
    onCLS(onGetWebVitalsData);
    onINP(onGetWebVitalsData);
    onTTFB(onGetWebVitalsData);
  }, [onGetWebVitalsData]);
};
