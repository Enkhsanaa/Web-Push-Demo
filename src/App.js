import { useState } from "react";
import "./App.css";

import TestNotificationButton from "./components/TestNotificationButton";

import AskPermissionButton from "./components/AskPermissionButton";
import CheckPermissionButton from "./components/CheckPermissionButton";

import InstallServiceWorkerButton from "./components/InstallServiceWorkerButton";
import UninstallServiceWorkerButton from "./components/UninstallServiceWorkerButton";

import SubscribeButton from "./components/SubscribeButton";
import CheckSubscriptionButton from "./components/CheckSubscriptionButton";
import NewlineText from "./components/NewLineText";
import UnsubscribeButton from "./components/UnsubscribeButton";

function App() {
  const [result, appendResult] = useState("");
  function setResult(newResult) {
    appendResult(newResult + "\n" + result);
  }
  return (
    <div className="App">
      <div className="flex flex-column">
        <h1>Notification Test</h1>
        <div>
          <div className="flex">
            <CheckSubscriptionButton
              setResult={setResult}
            ></CheckSubscriptionButton>
            <CheckPermissionButton
              setResult={setResult}
            ></CheckPermissionButton>
          </div>
          <div className="flex">
            <AskPermissionButton setResult={setResult}></AskPermissionButton>
            <TestNotificationButton
              setResult={setResult}
            ></TestNotificationButton>
          </div>
          <div className="flex">
            <InstallServiceWorkerButton
              setResult={setResult}
            ></InstallServiceWorkerButton>
            <UninstallServiceWorkerButton
              setResult={setResult}
            ></UninstallServiceWorkerButton>
          </div>
          <div className="flex">
            <SubscribeButton setResult={setResult}></SubscribeButton>
            <UnsubscribeButton setResult={setResult}></UnsubscribeButton>
          </div>

          <code className="code-container">
            <NewlineText text={result}></NewlineText>
          </code>
        </div>
      </div>
    </div>
  );
}

export default App;
