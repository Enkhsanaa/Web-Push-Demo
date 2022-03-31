function CheckPermissionButton(props) {
  const { setResult } = props;
  async function notificationPermissionStatus() {
    return navigator.permissions
      .query({ name: "notifications" })
      .then((result) => {
        let newPrompt;

        if (result.state === "granted") {
          // notifications allowed, go wild
          setResult("Notifications allowed");
        } else if (result.state === "prompt") {
          // we can ask the user
          setResult("Notifications allowed, but we need to ask for permission");
        } else if (result.state === "denied") {
          // notifications were disabled
          setResult("Notifications denied");
        }

        result.onchange = () => console.debug({ updatedPermission: result });

        return newPrompt || result;
      })
      .catch((err) => {
        setResult("query failed");
        console.log("permission check err", err);
      });
  }
  return (
    <button
      aria-label="check permission status"
      className="CustomButton"
      onClick={notificationPermissionStatus}
    >
      Check permission status
    </button>
  );
}

export default CheckPermissionButton;
