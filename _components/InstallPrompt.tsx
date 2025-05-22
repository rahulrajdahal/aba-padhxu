"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  return isIOS
    ? toast(
        'To install this app on your iOS device, tap the share button and then "Add to Home Screen"',
        {
          icon: "ℹ️",
          duration: 10000,
        }
      )
    : null;
}
