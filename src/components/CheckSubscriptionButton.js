function CheckSubscriptionButton(props) {
  const { setResult } = props;

  async function checkSubscription() {
    setResult("Checking subscription");
    if (!("serviceWorker" in navigator)) {
      setResult("serviceWorker not supported");
      return;
    }
    if (Notification.permission !== "granted") {
      setResult("Notification permission not granted");
      return;
    }
    try {
      const timeoutId = setTimeout(() => {
        setResult("Service worker not ready");
      }, 2000);
      const registration = await navigator.serviceWorker.ready;
      timeoutId && clearTimeout(timeoutId);
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        setResult("subscription found" + JSON.stringify(subscription));
      } else {
        setResult("subscription not found");
      }
    } catch (error) {
      setResult("error: " + error.message);
    }
  }
  return (
    <button
      aria-label="Check Subscription"
      className="CustomButton"
      onClick={() => {
        checkSubscription();
      }}
    >
      Check Subscription
    </button>
  );
}

export default CheckSubscriptionButton;
