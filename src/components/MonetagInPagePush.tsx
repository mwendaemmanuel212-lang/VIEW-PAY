
"use client";

import { useEffect } from "react";

export default function MonetagInPagePush() {
  useEffect(() => {
    const scriptId = "monetag-inpage-push-313445";

    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://quge5.com/88/tag.min.js";
    script.dataset.zone = "313445";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.head.appendChild(script);
  }, []);

  return null;
}
