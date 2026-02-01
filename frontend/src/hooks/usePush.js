export async function subscribePush(userId) {
  const reg = await navigator.serviceWorker.register("/sw.js");

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
  });

  await fetch("http://localhost:5000/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, subscription: sub })
  });
}
