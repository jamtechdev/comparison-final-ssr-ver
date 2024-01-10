"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductSlider({ favSlider,slug }) {
  return (
    <>
      <div className="product-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          loop={true}
          navigation={{
            nextEl: ".product-slider .swiper-next",
            prevEl: ".product-slider .swiper-prev",
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
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          className="product-slider"
        >
          {favSlider?.length > 0 &&
            favSlider?.map((section, index) => {
              return (
                <React.Fragment key={section?.short_name + index}>
                    <SwiperSlide key={section?.short_name}>
                      <Link
                        href={`/${section?.category ? section?.category : slug}/${section?.permalink}`}
                        style={{ color: "#27304e" }}
                      >
                        {" "}
                        <div className="product-card">
                          <Image
                            src={
                              section.bannerImage === null
                                ? section?.bannerImage
                                : `/images/nofound.png`
                            }
                            width={0}
                            height={0}
                            sizes="100%"
                            alt="Not found"
                          />

                          <div className="product-name-wrapper"><span>{section?.short_name}</span></div>
                        </div>
                      </Link>
                    </SwiperSlide>
               
                </React.Fragment>
              );
            })}
        </Swiper>
        {favSlider?.length > 6 ? (
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
      </div>
    </>
  );
}
