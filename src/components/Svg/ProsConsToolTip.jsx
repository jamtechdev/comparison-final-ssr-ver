import React from "react";
import { renderToString } from "react-dom/server";

const ProsConsToolTip = (props) => {
  const { hover_phrase, info_not_verified, data } = props;
  return (
    <>
      {hover_phrase && (
        <div className="tooltip-display-content">
          <span
            className="mb-2 prosconsColor"
           // dangerouslySetInnerHTML={{ __html: hover_phrase }}
          ></span>
          {info_not_verified && (
            <>
              <hr />
              <span className="mb-2">
                <i>
                  (Information is not verified. If you believe this is a
                  mistake, please, contact our team.)
                </i>
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProsConsToolTip;
