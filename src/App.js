import React, { useState, useCallback } from "react";
import Canvas from "./components/Canvas";
import Goo from "./components/Goo";
import Intro from "./components/Intro";
import Toolbar from "./components/Toolbar";
import usePainter from "./hooks/usePainter";

const App = () => {
  const [dateUrl, setDataUrl] = useState("#");
  const [{ canvas, isReady, ...state }, { init, ...api }] = usePainter();

  const handleDownload = useCallback(() => {
    if (!canvas || !canvas.current) {
      return;
    }
    setDataUrl(canvas.current.toDataURL("image/png"));
  }, [canvas]);

  return (
    <>
      <Intro init={init} isReady={isReady} />
      <Toolbar {...{ ...state, ...api, dateUrl, handleDownload }} />
      <Canvas canvasRef={canvas} width={state.currentWidth} />
      <Goo />
    </>
  );
};
export default App;
