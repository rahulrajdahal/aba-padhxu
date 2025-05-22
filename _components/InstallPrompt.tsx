"use client";

import { Cross } from "@meistericons/react";
import { useEffect, useState } from "react";
import { PushNotificationManager } from "./PushNotificationManager";

export function InstallPrompt() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  const handleClosePrompt = () => {
    setShowInstallPrompt(false);
  };

  return showInstallPrompt || isIOS ? (
    <div className="fixed py-8 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.4)] px-4">
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
      <PushNotificationManager />
      <Cross
        onClick={handleClosePrompt}
        className="absolute right-4 top-4 text-gray-900 w-6 h-6 hover:cursor-pointer"
      />
    </div>
  ) : null;
}
