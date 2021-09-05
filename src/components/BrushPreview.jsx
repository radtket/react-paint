import React from "react";

const BrushPreview = ({ currentColor, currentWidth }) => {
  return (
    <div className="tool-section tool-section--lrg">
      <small>
        <strong>Brush Preview</strong>
      </small>
      <div className="preview">
        <div
          className="preview__brush"
          style={{
            backgroundColor: currentColor,
            width: `${currentWidth}px`,
            height: `${currentWidth}px`,
          }}
        />
      </div>
    </div>
  );
};

export default BrushPreview;
