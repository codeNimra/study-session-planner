import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function EmojiCelebration() {
  const [show, setShow] = useState(false);
  const [emoji, setEmoji] = useState("🎉");
  const { width, height } = useWindowSize();

  useEffect(() => {
    function onCelebrate(e) {
      const em = e?.detail?.emoji || "🎉";
      setEmoji(em);
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    }
    window.addEventListener("pocketstudy:celebrate", onCelebrate);
    return () => window.removeEventListener("pocketstudy:celebrate", onCelebrate);
  }, []);

  return (
    <div className="celebration">
      {show && <Confetti width={width} height={height} numberOfPieces={200} />}
      <div className="emoji" aria-hidden>{emoji}</div>
      <div style={{color:"#444"}}>Great job! Keep it up - plan your next session.</div>
    </div>
  );
}