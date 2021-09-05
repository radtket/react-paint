import { useCallback, useRef, useState } from "react";

const usePainter = () => {
  const autoWidth = useRef(false);
  const canvas = useRef();
  const direction = useRef(true);
  const hue = useRef(0);
  const isDrawing = useRef(false);
  const isEraserMode = useRef(false);
  const isRegularPaintMode = useRef(true);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const selectedColor = useRef("#000000");
  const selectedLightness = useRef(50);
  const selectedLineWidth = useRef(50);
  const selectedSaturation = useRef(100);
  const ctx = useRef(canvas?.current?.getContext("2d"));

  // State
  const [state, setState] = useState({
    currentColor: "#000000",
    currentWidth: 50,
    isAutoWidth: false,
    isEraser: false,
    isReady: false,
    isRegularMode: true,
  });

  const isNotMounted = ref => {
    return !ref || !ref.current;
  };

  const isMounted = ref => {
    return ref && ref.current;
  };

  const drawOnCanvas = useCallback(event => {
    if (isNotMounted(ctx)) {
      return;
    }
    ctx.current.beginPath();
    ctx.current.moveTo(lastX.current, lastY.current);
    ctx.current.lineTo(event.offsetX, event.offsetY);
    ctx.current.stroke();
    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  }, []);

  const handleMouseDown = useCallback(e => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
  }, []);

  const dynamicLineWidth = useCallback(() => {
    if (isNotMounted(ctx)) {
      return;
    }
    if (ctx.current.lineWidth > 90 || ctx.current.lineWidth < 10) {
      direction.current = !direction.current;
    }

    direction.current ? ctx.current.lineWidth++ : ctx.current.lineWidth--;

    setState(prev => {
      return {
        ...prev,
        currentWidth: ctx.current.lineWidth,
      };
    });
  }, []);

  const drawNormal = useCallback(
    e => {
      if (isNotMounted(isDrawing) || isNotMounted(ctx)) {
        return;
      }

      setState(prev => {
        const copy = { ...prev };
        if (isMounted(isRegularPaintMode) || isMounted(isEraserMode)) {
          ctx.current.strokeStyle = selectedColor.current;
          copy.currentColor = selectedColor.current;
          autoWidth.current && !isEraserMode.current
            ? dynamicLineWidth()
            : (ctx.current.lineWidth = selectedLineWidth.current);
          isEraserMode.current
            ? (ctx.current.globalCompositeOperation = "destination-out")
            : (ctx.current.globalCompositeOperation = "source-over");
        } else {
          copy.currentColor = `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`;
          ctx.current.strokeStyle = `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`;
          ctx.current.globalCompositeOperation = "source-over";

          hue.current++;
          if (hue.current >= 360) hue.current = 0;
          autoWidth.current
            ? dynamicLineWidth()
            : (ctx.current.lineWidth = selectedLineWidth.current);
        }

        return copy;
      });

      drawOnCanvas(e);
    },
    [drawOnCanvas, dynamicLineWidth]
  );

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const init = useCallback(() => {
    ctx.current = canvas?.current?.getContext("2d");
    if (isMounted(canvas) && isMounted(ctx)) {
      canvas.current.addEventListener("mousedown", handleMouseDown);
      canvas.current.addEventListener("mousemove", drawNormal);
      canvas.current.addEventListener("mouseup", stopDrawing);
      canvas.current.addEventListener("mouseout", stopDrawing);
      canvas.current.width = window.innerWidth - 196;
      canvas.current.height = window.innerHeight;
      ctx.current.strokeStyle = "#000";
      ctx.current.lineJoin = "round";
      ctx.current.lineCap = "round";
      ctx.current.lineWidth = 10;

      setState(prev => {
        return {
          ...prev,
          isReady: true,
        };
      });
    }
  }, [drawNormal, handleMouseDown, stopDrawing]);

  const handleRegularMode = useCallback(() => {
    setState(prev => {
      const copy = { ...prev };
      copy.isRegularMode = true;
      isEraserMode.current = false;
      copy.isEraser = false;
      isRegularPaintMode.current = true;
      return copy;
    });
  }, []);

  const handleSpecialMode = useCallback(() => {
    setState(prev => {
      const copy = { ...prev };
      copy.isRegularMode = false;
      isEraserMode.current = false;
      copy.isEraser = false;
      isRegularPaintMode.current = false;
      return copy;
    });
  }, []);

  const handleColor = e => {
    setState(prev => {
      const copy = { ...prev };
      selectedColor.current = e.currentTarget.value;
      copy.currentColor = e.currentTarget.value;

      return copy;
    });
  };

  const handleWidth = e => {
    setState(prev => {
      const copy = { ...prev };
      selectedLineWidth.current = e.currentTarget.value;
      copy.currentWidth = e.currentTarget.value;

      return copy;
    });
  };

  const handleClear = useCallback(() => {
    if (isNotMounted(ctx) || isNotMounted(canvas)) {
      return;
    }
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }, []);

  const handleEraserMode = () => {
    setState(prev => {
      const copy = { ...prev };
      autoWidth.current = false;
      copy.isAutoWidth = false;
      copy.isRegularMode = true;
      copy.isEraser = true;
      isEraserMode.current = true;

      return copy;
    });
  };

  const setCurrentSaturation = e => {
    setState(prev => {
      const copy = { ...prev };
      selectedSaturation.current = e.currentTarget.value;
      copy.currentColor = `hsl(${hue.current},${e.currentTarget.value}%,${selectedLightness.current}%)`;

      return copy;
    });
  };

  const setCurrentLightness = e => {
    setState(prev => {
      const copy = { ...prev };
      selectedLightness.current = e.currentTarget.value;
      copy.currentColor = `hsl(${hue.current},${selectedSaturation.current}%,${e.currentTarget.value}%)`;

      return copy;
    });
  };

  const setAutoWidth = e => {
    setState(prev => {
      const copy = { ...prev };
      autoWidth.current = e.currentTarget.checked;
      copy.isAutoWidth = e.currentTarget.checked;
      copy.currentWidth = !e.currentTarget.checked
        ? selectedLineWidth.current
        : ctx?.current?.lineWidth ?? selectedLineWidth.current;
      return copy;
    });
  };

  return [
    {
      canvas,
      ...state,
    },
    {
      handleClear,
      handleColor,
      handleEraserMode,
      handleRegularMode,
      handleSpecialMode,
      handleWidth,
      init,
      setAutoWidth,
      setCurrentLightness,
      setCurrentSaturation,
    },
  ];
};

export default usePainter;
