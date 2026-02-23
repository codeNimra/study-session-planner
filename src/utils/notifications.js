import { Howl } from "howler";

const bellSound = new Howl({
  src: ["https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"],
  volume: 0.6
});

export function playBell() {
  try {
    bellSound.play();
  } catch (e) {
    // ignore
  }
}

export function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

export function sendBrowserNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}