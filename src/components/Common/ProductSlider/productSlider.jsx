"use client";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductSlider({ favSlider, slug, indexSlider }) {
  const prevButtonClass = `prev-${indexSlider}`;
  const nextButtonClass = `next-${indexSlider}`;
  return (
    <>
      <div className="product-slider m-0">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          loop={true}
          rewind={true}
          navigation={{
            nextEl: `.${nextButtonClass}`,
            prevEl: `.${prevButtonClass}`,
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
          className="product-slider mt-2"
        >
          {favSlider?.length > 0 &&
            favSlider?.map((section, index) => {
              return (
                <React.Fragment key={section?.short_name + index}>
                  <SwiperSlide key={section?.short_name}>
                    <Link
                      href={`/${
                        section?.category_url ? section?.category_url : slug
                      }/${section?.permalink}`}
                      style={{ color: "#27304e" }}
                    >
                      {" "}
                      <div className="product-card">
                        <Image
                          src={
                            section.bannerImage == null
                              ? `/images/nofound.png`
                              : section?.bannerImage
                          }
                          width={0}
                          height={0}
                          sizes="100%"
                          alt="Not found"
                        />

                        <div className="product-name-wrapper">
                          <span>
                            {section?.short_name || section?.guide_name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </React.Fragment>
              );
            })}
        </Swiper>
        {favSlider?.length > 6 ? (
          <>
            <span className={`swiper-prev prev-${indexSlider}`}>
              <i className="ri-arrow-left-s-line"></i>
            </span>
            <span className={`swiper-next next-${indexSlider}`}>
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

// FOR PUSHING PURPOSE
