import React from "react";

const Canvas = ({ canvasRef, width }) => {
  const WIDTH_HALF = width ? width / 2 : 0;
  const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${WIDTH_HALF}" cy="${WIDTH_HALF}" r="${WIDTH_HALF}" fill="%23000000" /></svg>') ${WIDTH_HALF} ${WIDTH_HALF}, auto`;
  return (
    <section>
      <canvas ref={canvasRef} style={{ cursor }} />
    </section>
  );
};
export default Canvas;
