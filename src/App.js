import React, { useState } from "react";
import PomodoroTimer from "./components/PomodoroTimer";
import TargetPlanner from "./components/TargetPlanner";
import EmojiCelebration from "./components/EmojiCelebration";
import NotificationBell from "./components/NotificationBell";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [settings, setSettings] = useState({
    workMinutes: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLongBreak: 4
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>PocketStudy</h1>
        <p className="subtitle">Pomodoro study planner with emoji celebration and targets</p>
      </header>

      <main className="main-grid">
        <section className="left">
          <PomodoroTimer settings={settings} />
          <NotificationBell />
        </section>

        <section className="right">
          <TargetPlanner />
          <EmojiCelebration />
        </section>
      </main>

      <ToastContainer position="top-right" />
      <footer className="footer">Built for CodeSprout Beginner's Hackathon 2026</footer>
    </div>
  );
}