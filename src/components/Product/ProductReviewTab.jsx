"use client";
import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Rating from "../Common/Rating/Rating";

function ProductReviewTab({ productReview }) {
  //   console.log(productReview);
  return (
    <>
      {" "}
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
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {productReview &&
          productReview?.map((data, index) => {
            return (
              <>
                <SwiperSlide key={index}>
                  <a
                    href={`/link?p=${btoa(data.url)}`}
                    className="user__rating-card"
                  >
                    <img
                      src={data?.logo ? data?.logo : "/images/nofound.png"}
                    />
                    <div className="rating__count">
                      <span>{data?.rating}</span>
                      <Rating value={data?.rating} />
                    </div>
                    <small className="rating__review">
                      {data?.reviews} Reviews
                    </small>
                  </a>
                </SwiperSlide>
              </>
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
      {productReview?.length >= 8 ? (
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
    </>
  );
}

export default ProductReviewTab;
