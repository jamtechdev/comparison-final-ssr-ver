import React from "react";

function ExperReviwes() {
  return (
    <div className="review__card">
      <div className="review__card-header">
        <div className="review__name">
          <img src="https://seeklogo.com/images/L/logo-com-hr-logo-5636A4D2D5-seeklogo.com.png" />
          <h6>NationalPost</h6>
        </div>
        <div className="review__rating">
          <p>Very good</p>
          <span>8.0</span>
        </div>
      </div>
      <div className="review__card-body">
        <p>
          <i>
            The Botslab S8 Plus is a great example of a modern robot vacuum that
            can do it all: it can vacuum, mop, and self-empty to take over the
            cleaning of your house completely. However, it’s not a perfect
            device and has flaws, like the irritating voice that can’t be
          </i>
        </p>
      </div>
      <div className="review__card-footer">
        <span>translate</span>
        <small>04/03/2024</small>
      </div>
    </div>
  );
}

export default ExperReviwes;
