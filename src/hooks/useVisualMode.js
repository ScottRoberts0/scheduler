import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      setHistory([newMode, history[history.length - 1]]);
    } else {
      setHistory([newMode, ...history]);
    }
  }

  function back() {
    if (history.length !== 1) {
      const arr = history.slice(1);
      setMode(arr[0]);
      setHistory(arr);
    }
  }

  return { mode, transition, back };
}
