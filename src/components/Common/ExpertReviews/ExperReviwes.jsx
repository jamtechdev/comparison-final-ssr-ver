import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

function ExperReviwes() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
        <SwiperSlide>
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
                  {isExpanded
                    ? "The Botslab S8 Plus is a great example of a modern robot vacuum that can do it all: it can vacuum, mop, and self-empty to take over the cleaning of your house completely. However, it’s not a perfect device and has flaws, like the irritating voice that can’t be sadasdasdasd sadasdasdasd asdasdasdasd asdasdasdasda aasdas"
                    : "The Botslab S8 Plus is a great example of a modern robot vacuum that can do it all: it can vacuum, mop, and self-empty to take over the cleaning of your house completely. However, it’s not a perfect device and has flaws,can’t be"}
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
                    ....read more
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
              <small>04/03/2024</small>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
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
                  The Botslab S8 Plus is a great example of a modern robot
                  vacuum that can do it all: it can vacuum, mop, and self-empty
                  to take over the cleaning of your house completely. However,
                  it’s not a perfect device and has flaws, like the irritating
                  voice that can’t be
                </i>
              </p>
            </div>
            <div className="review__card-footer">
              <span>translate</span>
              <small>04/03/2024</small>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
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
                  The Botslab S8 Plus is a great example of a modern robot
                  vacuum that can do it all: it can vacuum, mop, and self-empty
                  to take over the cleaning of your house completely. However,
                  it’s not a perfect device and has flaws, like the irritating
                  voice that can’t be
                </i>
              </p>
            </div>
            <div className="review__card-footer">
              <span>translate</span>
              <small>04/03/2024</small>
            </div>
          </div>
        </SwiperSlide>

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
