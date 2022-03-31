function InstallServiceWorkerButton(props) {
  const { setResult } = props;

  function subscribeToPushService() {
    console.log("here");
    if (!("serviceWorker" in navigator)) {
      setResult("serviceWorker not supported");
      return;
    }
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        setResult("Registered service worker. Installing...");
        if (registration.active.state === "activated") {
          setResult("Service worker installed");
        }
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                setResult(
                  "Service worker installed and ready to control page."
                );
              } else {
                setResult("Service worker installed from cache.");
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error("Error during service worker registration:", error);
      });
  }
  return (
    <button
      aria-label="Install Service Worker"
      className="CustomButton"
      onClick={subscribeToPushService}
    >
      Install Service Worker
    </button>
  );
}

export default InstallServiceWorkerButton;
