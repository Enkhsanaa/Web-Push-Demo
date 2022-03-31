function TestNotificationButton(props) {
  const { setResult } = props;

  function sendNotification() {
    let title = "Test";
    let notification = new Notification("Test notification", {
      // actions: [
      //   {
      //     action: "open",
      //     icon: "",
      //     title: "Open",
      //   },
      // ],
      badge: "/to-do-notifications/img/icon-128.png",
      body: 'HEY! Your task "' + title + '" is now overdue.',
      data: {
        url: "https://toki.mn",
      },
      dir: "auto",
      icon: "/to-do-notifications/img/icon-128.png",
      image: "/to-do-notifications/img/icon-128.png",
      lang: "en-US",
      requireInteraction: true,
      silent: false,
      timestamp: Date.now(),
      vibrate: [100, 50, 100],
    });

    notification.onclick = function (event) {
      event.preventDefault();
      setResult("Notification clicked");
      window.open(event.target.data.url, "_blank");
    };
    notification.onshow = function () {
      setResult("Notification shown");
    };
    notification.onclose = function () {
      setResult("Notification closed");
    };
    notification.onerror = function (err) {
      setResult("Notification failed. No permission?");
    };
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        // The tab has become visible so clear the now-stale Notification.
        notification.close();
      }
    });
  }
  return (
    <button
      aria-label="Send local notification"
      className="CustomButton"
      onClick={sendNotification}
    >
      Send local notification
    </button>
  );
}

export default TestNotificationButton;
