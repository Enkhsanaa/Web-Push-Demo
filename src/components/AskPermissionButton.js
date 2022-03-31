function AskPermissionButton(props) {
  const { setResult } = props;

  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }

    return true;
  }
  function askNotificationPermission() {
    // function to actually ask the permissions
    function handlePermission(permission) {
      if (
        Notification.permission === "denied" ||
        Notification.permission === "default"
      ) {
        setResult("permission is denied");
      } else {
        setResult("permission is granted");
      }
    }

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
    } else {
      if (checkNotificationPromise()) {
        Notification.requestPermission().then((permission) => {
          handlePermission(permission);
        });
      } else {
        Notification.requestPermission(function (permission) {
          handlePermission(permission);
        });
      }
    }
  }
  return (
    <button
      aria-label="Ask for permission"
      className="CustomButton"
      onClick={() => {
        askNotificationPermission();
      }}
    >
      Ask for permission
    </button>
  );
}

export default AskPermissionButton;
