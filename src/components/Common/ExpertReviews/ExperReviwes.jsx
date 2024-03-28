import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

function ExperReviwes({ expertReview }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id, event) => {
    // Prevent default click behavior to stop slider navigation
    if (event) {
      event.preventDefault();
    }
    // event.preventDefault();
    setExpandedId(expandedId === id ? null : id);
  };

  const getEvaluation = (score) => {
    if (score >= 9) {
      return "Outstanding";
    } else if (score >= 8) {
      return "Excellent";
    } else if (score >= 7) {
      return "Very good";
    } else if (score >= 5) {
      return "Good";
    } else if (score >= 3) {
      return "Fair";
    } else if (score >= 1) {
      return "Poor";
    }
    return "Poor"; // Handle other cases as needed
  };
  const getColorBasedOnScore = (score) => {
    if (score >= 7.5) {
      return "#093673";
    } else if (score >= 5 && score < 7.5) {
      return "#437ECE";
    } else {
      return "#85B2F1";
    }
  };

  const ExpertReviewsSlider = ({ expertReview }) => {
    const [language, setLanguage] = useState("EN");

    const getTranslatedText = (text) => {
      // Assume you have a function to get translated text based on the language
      // For simplicity, I'll use a simple object for translation
      const translations = {
        EN: "Translate",
        FN: "Translated Text",
      };
      return translations[text] || text;
    };
  };
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        loop={true}
        navigation={{
          nextEl: ".expert_reviews_slider .swiper-next",
          prevEl: ".expert_reviews_slider .swiper-prev",
        }}
        pagination={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        className="expert_reviews_slider"
      >
        {expertReview?.map((data, index) => {
          const maxLength = 385;
          const isLong = data?.comment?.length > maxLength;
          let truncatedComment = data?.comment;
          const [isExpanded, setIsExpanded] = useState(false);

          if (!isExpanded && isLong) {
            const lastSpaceIndex = truncatedComment.lastIndexOf(" ", maxLength);
            truncatedComment =
              lastSpaceIndex > 0
                ? truncatedComment.substring(0, lastSpaceIndex) + "..."
                : truncatedComment.substring(0, maxLength) + "...";
          }

          const toggleExpand = () => {
            setIsExpanded(!isExpanded);
          };

          return (
            <SwiperSlide key={index}>
              <div className="review__card">
                <div className="review__card-header">
                  <div className="review__name">
                    {data?.image !== null && <img src={`${data?.image}`} />}

                    <h6>{data?.name}</h6>
                  </div>
                  <div className="review__rating">
                    {typeof data?.evaluation === "string" ? (
                      <>
                        <p>no rating assigned</p>
                        <span style={{ background: "#D0D0D0" }}>
                          {data?.evaluation}
                        </span>
                      </>
                    ) : (
                      <>
                        <p>{getEvaluation(data?.evaluation)}</p>
                        <span
                          style={{
                            background: getColorBasedOnScore(data?.evaluation),
                          }}
                        >
                          {data?.evaluation}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="review__card-body">
                  <p>
                    {isExpanded ? data?.comment : truncatedComment}
                    {isLong && (
                      <span
                        onClick={toggleExpand}
                        className="btn btn-link"
                        style={{
                          textDecoration: "none",
                          fontWeight: "600",
                          padding: "0px",
                          color: "#071b42",
                          cursor: "pointer",
                        }}
                      >
                        {isExpanded ? "Read less" : "Read more"}
                      </span>
                    )}
                  </p>
                </div>
                <div className="review__card-footer">
                  <span>translate</span>
                  <small>{data?.date_of_review}</small>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        {expertReview?.length > 3 ? (
          <>
            <span className="swiper-prev">
              <i className="ri-arrow-left-s-line"></i>
            </span>
            <span className="swiper-next">
              <i className="ri-arrow-right-s-line"></i>
            </span>
          </>
        ) : (
          ""
        )}
      </Swiper>
    </>
  );
}

export default ExperReviwes;
