import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import {
  playBell,
  requestNotificationPermission,
  sendBrowserNotification,
} from "../utils/notifications";

function formatTime(sec) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.max(0, sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function PomodoroTimer({ settings }) {
  const workSeconds = settings.workMinutes * 60;
  const shortBreak = settings.shortBreak * 60;
  const longBreak = settings.longBreak * 60;

  const [secondsLeft, setSecondsLeft] = useState(workSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [sessionCount, setSessionCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  // Request notification permission once
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Handle mode changes
  useEffect(() => {
    if (mode === "work") setSecondsLeft(workSeconds);
    if (mode === "short") setSecondsLeft(shortBreak);
    if (mode === "long") setSecondsLeft(longBreak);
  }, [mode, workSeconds, shortBreak, longBreak]);

  // Handle session completion
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      playBell();
      sendBrowserNotification(
        "PocketStudy",
        mode === "work" ? "Study session complete!" : "Break ended!",
      );
      toast.success(
        mode === "work"
          ? "Study session complete! 🎉"
          : "Break ended. Get ready!",
      );

      if (mode === "work") {
        const nextCount = sessionCount + 1;
        setSessionCount(nextCount);
        setCelebrate(true); // trigger emoji + confetti

        if (nextCount % settings.sessionsBeforeLongBreak === 0) {
          setMode("long");
        } else {
          setMode("short");
        }
      } else {
        setMode("work");
      }
    }
  }, [
    secondsLeft,
    isRunning,
    mode,
    sessionCount,
    settings.sessionsBeforeLongBreak,
  ]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setMode("work");
    setSessionCount(0);
    setSecondsLeft(workSeconds);
    setIsRunning(false);
    setCelebrate(false);
  };

  return (
    <div className="timer-card">
      <h2>
        {mode === "work"
          ? "Focus Time"
          : mode === "short"
            ? "Short Break"
            : "Long Break"}
      </h2>
      <div className="timer-display">{formatTime(secondsLeft)}</div>

      <div className="timer-controls">
        {!isRunning ? (
          <button className="btn" onClick={handleStart}>
            Start
          </button>
        ) : (
          <button className="btn secondary" onClick={handlePause}>
            Pause
          </button>
        )}
        <button className="btn small" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div style={{ marginTop: 12, color: "#444" }}>
        <div>
          Sessions completed: <strong>{sessionCount}</strong>
        </div>
        <div style={{ marginTop: 8 }}>
          <label style={{ fontSize: 13, color: "#666" }}>
            Quick set work minutes:
          </label>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            {[15, 25, 30, 45].map((m) => (
              <button
                key={m}
                className="btn small"
                onClick={() => {
                  setSecondsLeft(m * 60);
                  setMode("work");
                  setCelebrate(false);
                }}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {celebrate && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Confetti />
          <h2 style={{ fontSize: "2rem" }}>📚🎉</h2>
        </div>
      )}
    </div>
  );
}
