import React, { useEffect, useState } from "react";
import { playBell, requestNotificationPermission, sendBrowserNotification } from "../utils/notifications";
import { FiBell } from "react-icons/fi";

export default function NotificationBell() {
  const [enabled, setEnabled] = useState(() => {
    const s = localStorage.getItem("pocketstudy:notify");
    return s ? JSON.parse(s) : true;
  });

  useEffect(() => {
    localStorage.setItem("pocketstudy:notify", JSON.stringify(enabled));
    if (enabled) requestNotificationPermission();
  }, [enabled]);

  const test = () => {
    if (enabled) {
      playBell();
      sendBrowserNotification("PocketStudy", "This is a test reminder.");
    }
  };

  return (
    <div style={{marginTop:12}}>
      <h3>Reminders</h3>
      <div className="bell">
        <button className="btn small" onClick={() => setEnabled(!enabled)}>
          <FiBell style={{marginRight:8}} /> {enabled ? "Enabled" : "Disabled"}
        </button>
        <button className="btn small secondary" onClick={test}>Test</button>
      </div>
      <div style={{marginTop:8,color:"#666",fontSize:13}}>When enabled, the app will ring and send a browser notification as sessions near completion.</div>
    </div>
  );
}