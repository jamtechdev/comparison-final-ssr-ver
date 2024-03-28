import React from "react";
import { renderToString } from "react-dom/server";

const ProsConsToolTip = (props) => {
  const { hover_phrase, info_not_verified, data, comment } = props;
  return (
    <>
      {hover_phrase && (
        <div className="tooltip-display-content">
          <div
            className="mb-2 prosconsColor"
            dangerouslySetInnerHTML={{ __html: hover_phrase }}
          ></div>
       {/* {   console.log(comment)} */}
          {comment && <div className="test__phrase__content">{comment}</div>}

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
