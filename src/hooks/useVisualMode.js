import { useState } from "react";
export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      return { transition };
    };

    setMode(newMode);
    setHistory(prev => ([...prev, newMode]));
    return { transition };
  };

  function back () {
    if(history.length <= 1 ) {
      setMode(initial);
      setHistory(initial); 
      return { back };
    };
    history.pop();
    setMode(history[history.length-1]);
    return { back };
  };

  return { mode, transition, back };

}