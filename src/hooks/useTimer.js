import { useEffect, useRef, useState } from "react";
import { getMotivation } from "./services/featherless";
import { toast } from "react-toastify";

export default function useTimer(initialSeconds = 1500) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

 // Handle session completion + Featherless.ai call
  useEffect(() => {
    if (secondsLeft <= 0 && isRunning) {
      setIsRunning(false);

      (async () => {
        const tip = await getMotivation();
        toast.info(`Motivation: ${tip}`);
      })();
    }
  }, [secondsLeft, isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (newSeconds = initialSeconds) => {
    setSecondsLeft(newSeconds);
    setIsRunning(false);
  };

  return {
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
    setSecondsLeft,
    setIsRunning
  };
}