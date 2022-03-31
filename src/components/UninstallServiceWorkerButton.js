function UninstallServiceWorkerButton(props) {
  const { setResult } = props;

  function uninstallServiceWorker() {
    console.log("here");
    if (!("serviceWorker" in navigator)) {
      setResult("serviceWorker not supported");
      return;
    }
    navigator.serviceWorker.ready.then((registration) => {
      console.log("registration", registration);
      console.log("registration.active", registration.active);
      console.log("registration.waiting", registration.waiting);
      registration.unregister();
      setResult("serviceWorker uninstalled");
    });
  }
  return (
    <button
      aria-label="Uninstall Service Worker"
      className="CustomButton"
      onClick={uninstallServiceWorker}
    >
      Uninstall Service Worker
    </button>
  );
}

export default UninstallServiceWorkerButton;
