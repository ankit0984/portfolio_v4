"use client";
import { useEffect } from "react";

export default function TrackVisitor() {
    useEffect(() => {
        try {
            const hasVisited = sessionStorage.getItem("visited");

            if (!hasVisited) {
                fetch("/api/track", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        path: window.location.pathname,
                        referrer: document.referrer || null
                    }),
                    keepalive: true // 🔥 ensures request completes on tab close
                });

                sessionStorage.setItem("visited", "true");
            }
        } catch (err) {
            // Fail silently — analytics should NEVER break UI
            console.error("Tracking failed", err);
        }
    }, []);

    return null;
}
