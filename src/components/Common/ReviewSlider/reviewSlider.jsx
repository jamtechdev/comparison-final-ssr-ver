"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import Image from "next/image";
import Link from "next/link";

export default function ReviewSlider({ favSlider }) {
  return (
    <section className="review-slider">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        loop={true}
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
          const url = item?.category.replace(/\s+/g, "-").toLowerCase();
          return (
            <SwiperSlide key={index}>
              <Link href={`/${url}/${item?.permalink}`}>
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
                          item.rating >= 7.5
                            ? "#093673"
                            : item.rating >= 5 && item.rating < 7.5
                            ? "#437ECE"
                            : "#85B2F1",
                      }}
                    >
                      {item?.overall_score}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {favSlider?.length > 6 && (
        <>
          <span className="swiper-prev">
            <i className="ri-arrow-left-s-line"></i>
          </span>
          <span className="swiper-next">
            <i className="ri-arrow-right-s-line"></i>
          </span>
        </>
      )}
    </section>
  );
}
