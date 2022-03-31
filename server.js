const webpush = require("web-push");

const vapidKeys = {
  publicKey:
    "BLM900B_3AKRjMrzFEpNsRdqJ14fJS6dS0q5DYYwKTJycE6DJ6bYfcJEb-VKy__2hXIGryKEgiJsM5H2yCManJE",
  privateKey: "Tilq7_KK20Y1dNj6FKB8ApvQ-3aaF2dJWNkS67JUtr4",
};

// webpush.setGCMAPIKey("<Your GCM API Key Here>");
webpush.setVapidDetails(
  "mailto:admin@toki.mn",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cyOKWNKXgS4:APA91bEg9wEACbZE0Kkir-m9oyoGjYJiZz5E9dFequvyQTMogDVkq9KWCB3C89yPQomq0ikKITMWK03A31HE0KsM-0wG3IcydIIoMvXLJM9LlZoAdc9MEIAZIlP1rxLbsD8BLcNm3ngs",
  expirationTime: null,
  keys: {
    p256dh:
      "BO2mtbRFxm4SX804nYaj0cCh60VUNU7CrX9RMQ4BX70oReX6QIv7Ig7QhtojPyiHq0Vfw1NOzqIXn7t77Lyl_Kc",
    auth: "NDti5m7QUZPfo54xfBvKPw",
  },
};

webpush.sendNotification(
  pushSubscription,
  JSON.stringify({
    title: "Hello from server!",
    actions: [
      {
        action: "open",
        icon: "",
        title: "Open",
      },
      {
        action: "ignore",
        icon: "",
        title: "Ignore",
      },
    ],
    badge: "/logo192.png",
    body: "This is a test notification from the server!",
    data: {
      url: "http://localhost:3000",
    },
    dir: "auto",
    icon: "/logo192.png",
    image: "/logo192.png",
    lang: "en-US",
    requireInteraction: true,
    silent: false,
    timestamp: Date.now(),
    vibrate: [100, 50, 100],
  })
);
