function UnsubscribeButton(props) {
  const { setResult } = props;

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
      // unsubscribe from push service
      registration.pushManager
        .getSubscription()
        .then(function (subscription) {
          if (subscription) {
            setResult("Got subscription: " + JSON.stringify(subscription));
            return subscription;
          }
          setResult("No subscription found.");
          return null;
        })
        .then(function (subscription) {
          if (subscription) {
            setResult("Unsubscribing from push service...");
            return subscription.unsubscribe();
          }
          setResult("No subscription found.");
          return null;
        })
        .then(function (subscription) {
          if (subscription) {
            setResult("Unsubscribed from push service.");
          } else {
            setResult("No subscription found.");
          }
        })
        .catch(function (error) {
          setResult("Error unsubscribing from push service: " + error);
        });
    });
  }
  return (
    <button
      aria-label="Unsubscribe from push service"
      className="CustomButton"
      onClick={subscribeToPushService}
    >
      Unsubscribe from push service
    </button>
  );
}

export default UnsubscribeButton;
