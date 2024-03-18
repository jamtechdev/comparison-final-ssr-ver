"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

export default function ReviewSlider({ favSlider }) {
  // console.log(favSlider);
  // if value is an integer and not equal to 10, add decimal that value
  const formatValue = (value) => {
    if (value % 1 === 0 && value !== 10) {
      return `${value}.0`;
    }
    return value;
  };
  return (
    <section className="review-slider">
      <Swiper
        slidesPerView={6}
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        loop={true}
        // rewind={true}
        onSwiper={(swiper) => {}}
        navigation={{
          nextEl: ".review-slider .swiper-next",
          prevEl: ".review-slider .swiper-prev",
        }}
        pagination={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
        className="product-slider"
      >
        {favSlider?.map((item, index) => {
          const url = item?.category?.replace(/\s+/g, "-").toLowerCase();
          return (
            <SwiperSlide key={index}>
              <a href={`/${url}/${item?.permalink}`}>
                <div className="review-wrapper">
                  <div className="review-card">
                    <Image
                      src={item?.main_image || "/images/nofound.png"}
                      width={0}
                      height={0}
                      sizes="100%"
                      alt=""
                    />
                    <div className="footer_content">
                      <span>{item?.name}</span>
                      <p>{item?.category}</p>
                    </div>
                    <span
                      className="rating_count"
                      style={{
                        background:
                          item.overall_score >= 7.5
                            ? "#093673"
                            : item.overall_score >= 5 &&
                              item.overall_score < 7.5
                            ? "#437ECE"
                            : "#85B2F1",
                      }}
                    >
                      {formatValue(item?.overall_score)}
                    </span>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {favSlider?.length >= 6 && (
        <>
          <span
            className="swiper-prev"
            onClick={(e) => {
              {
              }
            }}
          >
            <i className="ri-arrow-left-s-line"></i>
          </span>
          <span
            className="swiper-next"
            onClick={(e) => {
              {
              }
            }}
          >
            <i className="ri-arrow-right-s-line"></i>
          </span>
        </>
      )}
    </section>
  );
}
