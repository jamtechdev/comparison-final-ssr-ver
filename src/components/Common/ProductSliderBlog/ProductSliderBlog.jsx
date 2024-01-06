import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
export default function ProductSlider({ favSlider }) {
  const [showFullData, setShowFullData] = useState(false);

  const toggleShowFullData = () => {
    setShowFullData(!showFullData);
  };
  const product = [
    {
      image: "/images/p1.png",
      productName: "Best Monitors",
    },
    {
      image: "/images/p2.png",
      productName: "Best Washing Machines",
    },
    {
      image: "/images/p3.png",
      productName: "Best Robot Vacuum Cleaners",
    },
    {
      image: "/images/p4.png",
      productName: "Best Drones",
    },
    {
      image: "/images/p5.png",
      productName: "Best Kitchen Robots",
    },
    {
      image: "/images/p6.png",
      productName: "Best Electric Scooters",
    },
    {
      image: "/images/p1.png",
      productName: "Best Monitors",
    },
    {
      image: "/images/p2.png",
      productName: "Best Washing Machines",
    },
    {
      image: "/images/p3.png",
      productName: "Best Robot Vacuum Cleaners",
    },
  ];
  return (
    <section className="product-slider single-blog">
      {/* <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        loop={true}
        navigation={{ nextEl: ".product-slider .swiper-next", prevEl: ".product-slider .swiper-prev" }}
        pagination={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
        className="product-slider"
      > */}
      {favSlider &&
        favSlider
          ?.slice(0, showFullData ? favSlider?.length : 3)
          .map(function (item, index) {
            return (
              // <SwiperSlide key={index}>
              <div className="product-card mb-3" key={index}>
                <Image
                  src={
                    item.bannerImage === null
                      ? item?.bannerImage
                      : `/images/nofound.png`
                  }
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
                <span>
                  {" "}
                  <Link
                    href={`/${item?.permalink}`}
                    style={{ color: "#27304e" }}
                  >
                    {item?.short_name}
                  </Link>
                </span>
              </div>
              // </SwiperSlide>
            );
          })}
      {/* <div className="text-center">
      <Button className="hide-show-btn" onClick={toggleShowFullData}>
        <i
          className={
            showFullData ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
          }
        ></i>
      </Button>
      </div> */}
      {/* </Swiper> */}
      {/* <span className="swiper-prev"><i className="ri-arrow-left-s-line"></i></span>
      <span className="swiper-next"><i className="ri-arrow-right-s-line"></i></span> */}
    </section>
  );
}
