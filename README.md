# PocketStudy: Study Session Planner with Pomodoro

PocketStudy is a beginner‑friendly React web app that helps students stay focused and motivated using the **Pomodoro technique**.  
It combines a countdown timer, study targets, reminders, and fun emoji celebrations to make learning more engaging.

---

## Features

- **Pomodoro Timer**: Start, pause, reset, and quick‑set durations.
- **Reminders & Notifications**: Browser alerts and sound cues near session completion.
- **Target Planner**: Track daily, weekly, and monthly study goals with charts.
- **Emoji Celebration**: Confetti and emojis when a study session is completed.
- **Beginner‑Friendly UI**: Clean, simple, and motivating design.

---

## How It Works

- Timer flow: Start a work session → timer counts down → when it reaches zero the app rings, shows a toast and browser
notification, increments session count, and triggers a celebration.
- Break logic: After each work session the app switches to a short break; after a configured number of sessions it switches to a long break.
- Targets: Enter numeric goals for daily, weekly, and monthly study time; the chart updates as sessions complete.
- Reminders: Toggle reminders on to receive sound and browser alerts; a test button verifies notifications.

## Tech Stack

- React 18 ⚛️
- Chart.js + react-chartjs-2 📊
- React Confetti 🎉
- React Toastify 🔔
- Howler.js 🔊
- CSS Modules / Plain CSS 🎨
- Netlify for continuous deployment 🚀

## Quick Start

- git clone: https://github.com/codeNimra/study-session-planner.git
- Live Demo: https://study-session-planner.netlify.app/

## Deployment

- Build: npm run build
- Publish: Upload the build/ folder to your hosting provider or connect the GitHub repo to Netlify for automatic deploys on every push to main.

## Project Status and License

- Status: Demo ready and deployed (Netlify).
- License: MIT see the LICENSE file.

## Contact

- Author: Nimra Abid
- Hackathon: Built for CodeSprout Beginner's Hackathon 2026

---
