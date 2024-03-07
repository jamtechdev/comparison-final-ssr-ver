import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

function ExperReviwes({ expertReview }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // console.log(expertReview?.length)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
        {expertReview?.map((data) => {
          return (
            <SwiperSlide>
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
                        : data?.comment.length >150
                        ? `${data?.comment.substring(0, 150)}...`
                        : data?.comment}
                    </i>
                    {!isExpanded && (
                      <b
                        onClick={toggleExpand}
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
                        onClick={toggleExpand}
                        style={{
                          textDecoration: "none",
                          fontWeight: "600",
                          padding: "0px",
                          color: "#071b42",
                        }}
                      >
                        ..less
                      </b>
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

        {/* {blogPageType == "listPage" &&
    blogDataList &&
    blogDataList?.map(function (item, index) {
      return (
        <SwiperSlide key={index}>
          <Link
            href={`/blog${
              item?.category_url === null && item?.category_url === ""
                ? `/${item?.permalink}`
                : `/${item?.category_url}/${item?.permalink}`
            }`}
            style={{ color: "#27304e" }}
          >
            <div className="blog-card">
              <div className="blog-card-img">
                <img
                  src={
                    item.banner_image
                      ? item.banner_image
                      : "/images/nofound.png"
                  }
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
                <p className="dates">{item.published_at}</p>
              </div>
              <span className="blog-title">{item.title}</span>
              <p className="category">{item.category}</p>
            </div>
          </Link>
        </SwiperSlide>
      );
    })} */}
      </Swiper>
    </>
  );
}

export default ExperReviwes;
