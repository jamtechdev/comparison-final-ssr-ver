import { useRef, useState } from "react";
import useScreenSize from "@/_helpers/useScreenSize";
const QuestionIcon = ({ attributes }) => {
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: 0,
  });
  const tooltipRef = useRef(null);
  // console.log(tooltipPosition);
  function adjustTooltipPosition() {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const tooltipRect = tooltip.getBoundingClientRect();

    const viewportWidth = document.documentElement.clientWidth;

    const tooltipWidth = tooltipRect.width;
    console.log(viewportWidth - tooltipWidth / 2 - viewportWidth + 50);

    // Calculate ideal left position for centered alignment
    const idealLeft = (viewportWidth - tooltipWidth) / 2;

    // Calculate the final left position to ensure the tooltip stays within the screen boundaries
    const left = Math.min(
      Math.max(0, idealLeft),
      viewportWidth - tooltipWidth / 2 - viewportWidth + 50
    );

    setTooltipPosition({ ...tooltipPosition, left });
  }
  return (
    <div
      className="question_hover_container question-marker-icon"
      onMouseOver={adjustTooltipPosition}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526                         11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
      </svg>
      {/* { console.log(attributes)} */}
      {attributes !== undefined && (
        <div
          className="display-content"
          ref={tooltipRef}
          style={{
            left: tooltipPosition ? "50%" : "calc(50% - 128px)",
            transform: tooltipPosition ? "translateX(-50%)" : "none",
            width: "200px",
          }}
        >
          {attributes?.description && (
            <p className="mb-2">
              <b>What it is: </b>
              {attributes?.description}
            </p>
          )}
          {attributes?.when_matters && (
            <p className="mb-2">
              <b>When it matters: </b>
              {attributes?.when_matters}
            </p>
          )}
          {attributes?.good_value && (
            <p className="mb-2">
              <b>Good value: </b>
              {attributes?.good_value}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default QuestionIcon;
