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

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        loop={true}
        navigation={{
          nextEl: ".blog-slider .swiper-next",
          prevEl: ".blog-slider .swiper-prev",
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
        className="blog-slider"
      >
        {expertReview?.map((data, index) => {
          const isExpanded = data.id === expandedId;
          return (
            <SwiperSlide key={index}>
              <div className="review__card">
                <div className="review__card-header">
                  <div className="review__name">
                    <img src={`${data?.image}`} />
                    <h6>{data?.name}</h6>
                  </div>
                  <div className="review__rating">
                    {typeof data?.evaluation === "string" ? (
                      <>
                        <p>no rating assigned</p>
                        <span>{data?.evaluation}</span>
                      </>
                    ) : (
                      <>
                        <p>{getEvaluation(data?.evaluation)}</p>
                        <span>{data?.evaluation}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="review__card-body">
                  <p>
                    <i>
                      {isExpanded
                        ? data?.comment
                        : data?.comment.length > 190
                        ? `${data?.comment.substring(0, 190)}...`
                        : data?.comment}
                    </i>
                    {/* {!isExpanded && (
                      <b
                        onClick={() => toggleExpand(data.id)}
                        className="btn btn-link"
                        style={{
                          textDecoration: "none",
                          fontWeight: "600",
                          padding: "0px",
                          color: "#071b42",
                        }}
                      >
                        read more
                      </b>
                    )}
                    {isExpanded && (
                      <b
                        className="btn btn-link"
                        onClick={() => toggleExpand(data.id)}
                        style={{
                          textDecoration: "none",
                          fontWeight: "600",
                          padding: "0px",
                          color: "#071b42",
                        }}
                      >
                        ..less
                      </b>
                    )} */}
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
      </Swiper>
    </>
  );
}

export default ExperReviwes;
