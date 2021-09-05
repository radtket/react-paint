import React from "react";
import classNames from "classnames";
import {
  faArrowsAltH,
  faEraser,
  faMagic,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BrushPreview from "./BrushPreview";

const Toolbar = ({
  currentColor,
  currentWidth,
  dateUrl,
  handleClear,
  handleColor,
  handleDownload,
  handleEraserMode,
  handleRegularMode,
  handleSpecialMode,
  handleWidth,
  isAutoWidth,
  isEraser,
  isRegularMode,
  setAutoWidth,
  setCurrentLightness,
  setCurrentSaturation,
}) => {
  return (
    <aside>
      <div>
        <BrushPreview currentColor={currentColor} currentWidth={currentWidth} />
        <div className="tool-section tool-section--lrg">
          <div className="tool-section">
            <small>
              <strong>Brush color</strong>
            </small>
          </div>
          <input
            className="btn--color"
            disabled={!isRegularMode}
            id="toolColorPicker"
            onChange={handleColor}
            type="color"
          />
        </div>
        <div className="tool-section">
          <small>
            <strong>Tools</strong>
          </small>
        </div>
        <div className="tool-grid tool-section tool-section--lrg">
          <div>
            <button
              className={classNames("btn", "btn--tool", {
                "btn--active": isRegularMode && !isEraser,
              })}
              onClick={handleRegularMode}
              type="button"
            >
              <FontAwesomeIcon icon={faPaintBrush} />
            </button>
          </div>
          <div>
            <button
              className={classNames("btn", "btn--tool", {
                "btn--dream-active": !isRegularMode,
              })}
              onClick={handleSpecialMode}
              type="button"
            >
              <FontAwesomeIcon icon={faMagic} />
            </button>
          </div>
          <div>
            <button
              className={classNames("btn", "btn--tool", {
                "btn--eraser-active": isEraser,
              })}
              onClick={handleEraserMode}
              type="button"
            >
              <FontAwesomeIcon icon={faEraser} />
            </button>
          </div>
          <div>
            <label
              className={classNames("btn", "btn--tool", {
                "btn--width-active": isAutoWidth,
              })}
              htmlFor="tool-autowidth"
            >
              <FontAwesomeIcon icon={faArrowsAltH} />
              <input
                checked={isAutoWidth}
                disabled={isEraser}
                id="tool-autowidth"
                onChange={setAutoWidth}
                title="Dynamic brush size"
                type="checkbox"
              />
            </label>
          </div>
        </div>
        {!isAutoWidth && (
          <div className="tool-section tool-section--lrg">
            <div className="tool-section">
              <small>
                <strong>Brush size</strong>
              </small>
            </div>
            <div className="tool-section">
              <input
                defaultValue="50"
                max="90"
                min="10"
                onChange={handleWidth}
                type="range"
              />
            </div>
          </div>
        )}
        {!isRegularMode && (
          <div className="tool-section tool-section--lrg">
            <div className="tool-section">
              <small>
                <strong>Magic brush</strong>
              </small>
            </div>
            <div className="tool-section">
              <label htmlFor="Saturation">
                <small>Saturation</small>
                <input
                  defaultValue="100"
                  id="Saturation"
                  max="100"
                  min="0"
                  onChange={setCurrentSaturation}
                  type="range"
                />
              </label>
            </div>

            <label htmlFor="Lightness">
              Lightness
              <input
                defaultValue="50"
                id="Lightness"
                max="100"
                min="0"
                onChange={setCurrentLightness}
                type="range"
              />
            </label>
          </div>
        )}
      </div>
      <div>
        <a
          className="btn btn--main btn--block"
          download="image.png"
          href={dateUrl}
          onClick={handleDownload}
        >
          Save Image
        </a>
        <button className="btn btn--block" onClick={handleClear} type="button">
          Clear
        </button>
      </div>
    </aside>
  );
};

export default Toolbar;
