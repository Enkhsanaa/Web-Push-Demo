function SubscribeButton(props) {
  const { setResult } = props;

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  function subscribeToPushService() {
    if (!("serviceWorker" in navigator)) {
      setResult("serviceWorker not supported");
      return;
    }
    navigator.serviceWorker.ready.then(function (registration) {
      if (!registration) {
        setResult("serviceWorker not registered");
        return;
      }
      setResult(
        `Got registration (state: ${registration.active.state}). Getting subscription...`
      );
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BLM900B_3AKRjMrzFEpNsRdqJ14fJS6dS0q5DYYwKTJycE6DJ6bYfcJEb-VKy__2hXIGryKEgiJsM5H2yCManJE"
          ),
        })
        .then(function (sub) {
          if (!sub) {
            // Update UI to ask user to register for Push
            setResult("Not subscribed to push service!");
          }

          console.log("Endpoint URL: ", sub.endpoint);
          // We have a subscription, update the database
          setResult(`Subscription object: ${JSON.stringify(sub)}`);
        })
        .catch(function (e) {
          if (Notification.permission === "denied") {
            console.warn("Permission for notifications was denied");
          } else {
            console.error("Unable to subscribe to push", e);
            setResult("Unable to subscribe to push" + e.message);
          }
        });
    });
  }
  return (
    <button
      aria-label="Subscribe to push service"
      className="CustomButton"
      onClick={subscribeToPushService}
    >
      Subscribe to push service
    </button>
  );
}

export default SubscribeButton;
