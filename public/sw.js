/* eslint-disable no-restricted-globals */
self.addEventListener("push", (event) => {
  if (event.data) {
    const notification = event.data.json();

    event.waitUntil(
      self.registration.showNotification(notification.title, notification)
    );
  }
});

self.addEventListener("pushsubscriptionchange", (event) => {
  const options = event.oldSubscription.options;
  // Fetch options if they do not exist in the event.
  event.waitUntil(
    self.registration.pushManager.subscribe(options).then((subscription) => {
      // eslint-disable-line no-unused-vars
      // Send new subscription to application server.
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  let url = "http://localhost:3000/";
  if (event.notification.data) {
    url = event.notification.data.url;
  }

  event.notification.close();

  if (event.action === "open") {
    event.waitUntil(
      self.clients
        .matchAll({
          type: "window",
        })
        .then((clientList) => {
          for (let i = 0; i < clientList.length; i += 1) {
            const client = clientList[i];
            const found = client.url === url || client.url === `${url}/`;
            if (found && "focus" in client) {
              client.focus();
              return;
            }
          }
          if (self.clients.openWindow) {
            self.clients.openWindow(url);
          }
        })
    );
  }
});
