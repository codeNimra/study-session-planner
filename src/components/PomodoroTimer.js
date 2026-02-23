import React, { useEffect, useMemo, useState } from "react";
import useTimer from "../hooks/useTimer";
import { playBell, requestNotificationPermission, sendBrowserNotification } from "../utils/notifications";
import { toast } from "react-toastify";

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.max(0, sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PomodoroTimer({ settings }) {
  const workSeconds = useMemo(() => settings.workMinutes * 60, [settings.workMinutes]);
  const shortBreak = useMemo(() => settings.shortBreak * 60, [settings.shortBreak]);
  const longBreak = useMemo(() => settings.longBreak * 60, [settings.longBreak]);
  const [mode, setMode] = useState("work");
  const [sessionCount, setSessionCount] = useState(0);

  const { secondsLeft, isRunning, start, pause, reset, setSecondsLeft } = useTimer(workSeconds);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (mode === "work") reset(workSeconds);
    if (mode === "short") reset(shortBreak);
    if (mode === "long") reset(longBreak);
  }, [mode, workSeconds, shortBreak, longBreak, reset]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      playBell();
      sendBrowserNotification("PocketStudy", `${mode === "work" ? "Study session complete!" : "Break ended!"}`);
      toast.success(mode === "work" ? "Study session complete! 🎉" : "Break ended. Get ready!");
      if (mode === "work") {
        const nextCount = sessionCount + 1;
        setSessionCount(nextCount);
        if (nextCount % settings.sessionsBeforeLongBreak === 0) {
          setMode("long");
        } else {
          setMode("short");
        }
        window.dispatchEvent(new CustomEvent("pocketstudy:celebrate", { detail: { emoji: "📚🎉" } }));
      } else {
        setMode("work");
      }
    } else if (secondsLeft <= 10 && isRunning) {
      toast.info("Almost done — wrap up in a few seconds.");
    }
  }, [secondsLeft, isRunning, mode, sessionCount, settings.sessionsBeforeLongBreak]);

  const handleStart = () => start();
  const handlePause = () => pause();
  const handleReset = () => {
    setMode("work");
    setSessionCount(0);
    reset(workSeconds);
  };

  return (
    <div className="timer-card">
      <h2>{mode === "work" ? "Focus Time" : mode === "short" ? "Short Break" : "Long Break"}</h2>
      <div className="timer-display">{formatTime(secondsLeft)}</div>

      <div className="timer-controls">
        {!isRunning ? (
          <button className="btn" onClick={handleStart}>Start</button>
        ) : (
          <button className="btn secondary" onClick={handlePause}>Pause</button>
        )}
        <button className="btn small" onClick={handleReset}>Reset</button>
      </div>

      <div style={{marginTop:12, color:"#444"}}>
        <div>Sessions completed: <strong>{sessionCount}</strong></div>
        <div style={{marginTop:8}}>
          <label style={{fontSize:13, color:"#666"}}>Quick set work minutes:</label>
          <div style={{display:"flex", gap:8, marginTop:6}}>
            {[15,25,30,45].map(m => (
              <button key={m} className="btn small" onClick={() => {
                setSecondsLeft(m * 60);
                setMode("work");
              }}>{m}m</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}