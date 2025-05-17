"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case "FCP": {
        // handle FCP results
        console.log(metric, "FCP METRIC");
        break;
      }
      case "LCP": {
        // handle LCP results
        console.log(metric, "LCP METRIC");
        break;
      }
      case "TTFB": {
        // handle TTFB results
        console.log(metric, "TTFB METRIC");
        break;
      }
      case "FID": {
        // handle FID results
        console.log(metric, "FID METRIC");
        break;
      }
      case "CLS": {
        // handle CLS results
        console.log(metric, "CLS METRIC");
        break;
      }
      case "INP": {
        // handle INP results
        console.log(metric, "INP METRIC");
        break;
      }
      default: {
        console.log(metric, "DEFAULT METRIC");
        break;
      }
    }
  });

  return null;
}
