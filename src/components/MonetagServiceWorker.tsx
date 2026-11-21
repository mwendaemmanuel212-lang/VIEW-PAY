"use client";

import { useEffect } from "react";

export default function MonetagServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((error) =>
          console.error("Monetag service worker error:", error)
        );
    }
  }, []);

  return null;
}
