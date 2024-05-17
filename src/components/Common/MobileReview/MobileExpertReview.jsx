"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { useCallback, useState } from "react";
import formatValue from "@/_helpers/formatValue";

export default function MobileExpertReview({ expertReview }) {
  const [expandedId, setExpandedId] = useState(null);
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
  const extractDomainName = (url) => {
    const domain = url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .split(/[/?#]/)[0];
    return domain;
  };
  const product = [
    {
      image: "/images/review.png",
    },
    {
      image: "/images/review.png",
    },
    {
      image: "/images/review.png",
    },
    {
      image: "/images/review.png",
    },
    {
      image: "/images/review.png",
    },
    {
      image: "/images/review.png",
    },
    {
      image: "/images/review.png",
    },
    {
      image: "/images/review.png",
    },
    {
      image: "/images/review.png",
    },
  ];
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);
  return (
    <section className="mobile-product-slider">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        loop={true}
        navigation={{
          nextEl: ".expert_reviews_slider.swiper-next",
          prevEl: ".expert_reviews_slider.swiper-prev",
        }}
        pagination={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
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
          // console.log(data);
          const [isExpanded, setIsExpanded] = useState(false);
          const [isTranslateExpanded, setIsTranslateExpanded] = useState(false);
          const [isTranslating, setIsTranslating] = useState(false);
          const maxLength = 385;
          const isLong = data?.comment?.length > maxLength;
          let truncatedComment = data?.comment;
          const isTransLong = data?.translation?.length > maxLength;
          let truncatedTranslation = data?.translation;
          if (isTranslateExpanded && isTransLong) {
            const lastSpaceIndex = truncatedTranslation.lastIndexOf(
              " ",
              maxLength
            );
            truncatedTranslation =
              lastSpaceIndex > 0
                ? truncatedTranslation.substring(0, lastSpaceIndex) + "..."
                : truncatedTranslation.substring(0, maxLength) + "...";
          }
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
          const toggleTranslateExpand = () => {
            setIsTranslateExpanded(!isTranslateExpanded);
          };
          const toggleTranslate = () => {
            setIsTranslating(!isTranslating);
          };

          return (
            <SwiperSlide key={index}>
              <div className="review__card">
                <div className="review__card-header">
                  <div className="review__name">
                    {data?.image !== null && (
                      <a href={`/link?p=${btoa(data?.website_name)}`}>
                        <img src={`${data?.image}`} />
                      </a>
                    )}

                    <h3>
                      {data?.name !== null ? (
                        <a
                          href={`/link?p=${btoa(data?.website_name)}`}
                          style={{ color: "inherit" }}
                        >
                          {" "}
                          {data?.name}
                        </a>
                      ) : (
                        <a
                          href={`/link?p=${btoa(data?.website_name)}`}
                          style={{ color: "inherit" }}
                        >
                          {" "}
                          {extractDomainName(data?.website_name)}
                        </a>
                      )}
                    </h3>
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
                          {formatValue(data?.evaluation)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="review__card-body">
                  {isTranslating ? (
                    <>
                      <p>
                        {isTranslateExpanded
                          ? data?.translation
                          : truncatedTranslation}
                        {isTransLong && (
                          <span
                            onClick={toggleTranslateExpand}
                            className="btn btn-link"
                            style={{
                              textDecoration: "none",
                              fontWeight: "600",
                              padding: "0px",
                              color: "#071b42",
                              cursor: "pointer",
                            }}
                          >
                            {isTranslateExpanded ? "Read less" : "Read more"}
                          </span>
                        )}
                      </p>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
                <div className="review__card-footer">
                  {data?.language !== true && (
                    <span
                      onClick={toggleTranslate}
                      style={{ cursor: "pointer" }}
                    >
                      {isTranslating ? "Show original" : "Translate"}
                    </span>
                  )}

                  <small>{data?.date_of_review}</small>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {expertReview?.length > 3 ? (
          <>
            <span className="expert_reviews_slider swiper-prev">
              <i className="ri-arrow-left-s-line"></i>
            </span>
            <span className="expert_reviews_slider swiper-next">
              <i className="ri-arrow-right-s-line"></i>
            </span>
          </>
        ) : (
          ""
        )}
    </section>
  );
}
