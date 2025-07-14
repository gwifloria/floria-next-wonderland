"use client";
import { useCallback, useEffect } from "react";
import { Metric, onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from "web-vitals";

export const useWebVital = () => {
  async function report(name: string, labels: any, help = "default help") {
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
  }
  useEffect(() => {
    fetch("/web-vital/metrics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);
  const onGetWebVitalsData = useCallback((data: Metric) => {
    console.log("onGetWebVitalsData", data);
    if (!data?.name) {
      return;
    }
    const name = data.name;
    const value = data.value;
    const rating = data.rating;
    const msg = `${name}: value=${value}, rating=${rating}`;
    report(name, { rating, value });
  }, []);

  useEffect(() => {
    onFCP(onGetWebVitalsData);
    onLCP(onGetWebVitalsData);
    onFID(onGetWebVitalsData);
    onCLS(onGetWebVitalsData);
    onINP(onGetWebVitalsData);
    onTTFB(onGetWebVitalsData);
  }, [onGetWebVitalsData]);
};
