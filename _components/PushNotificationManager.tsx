"use client";

import { useEffect, useState } from "react";
import { subscribeUser } from "./actions";
import { urlBase64ToUint8Array } from "./utils";

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  useEffect(() => {
    if (isSupported) {
      subscribeToPush();
    }
  }, [isSupported]);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  // async function unsubscribeFromPush() {
  //   await subscription?.unsubscribe();
  //   setSubscription(null);
  //   await unsubscribeUser();
  // }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }
}
