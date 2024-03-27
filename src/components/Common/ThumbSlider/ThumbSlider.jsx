"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useCallback, useState } from "react";
import Tested from "../Tested/Tested";

export default function ThumbSlider({ productData, is_tested }) {
  const product = [
    {
      image: "/images/nofound.png",
    },
    {
      image: "/images/nofound.png",
    },
    {
      image: "/images/nofound.png",
    },
    {
      image: "/images/nofound.png",
    },
  ];
  const [swiper, setSwiper] = useState(null);
  const [activeThumb, setActiveThumb] = useState(0);

  const setSwiperRef = (swiper) => {
    setSwiper(swiper);
  };
  // console.log(activeThumb);
  const handleThumbClick = (index) => {
    if (index === productData?.all_images.length - 1) {
      setActiveThumb(0); // Reset activeThumb to 0
    } else {
      setActiveThumb(index);
    }
    if (swiper) {
      swiper.slideTo(index); // Navigate to the clicked thumbnail's corresponding slide
    }
  };

  const handlePrevious = () => {
    if (swiper) {
      swiper.slidePrev();
      setActiveThumb(activeThumb - 1);
    }
  };

  const handleNext = () => {
    // console.log(activeThumb);
    if (activeThumb === productData?.all_images.length - 1) {
      setActiveThumb(0); // Reset activeThumb to 0
    } else {
      setActiveThumb(activeThumb + 1);
    }
    if (swiper) {
      swiper.slideNext();
    }
  };
  return (
    <section className="thumb-section-container">
      {productData?.main_image === null ? (
        <>
          <ul className="thumb-images">
            {product.slice(0, 1).map((item, index) => (
              <li
                key={index}
                onClick={() => handleThumbClick(index)}
                className={index === activeThumb ? "active" : ""}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={item.image}
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul className="thumb-images">
          {productData &&
            productData?.all_images?.map((item, index) => (
              <li
                key={index}
                onClick={() => handleThumbClick(index)}
                className={index === activeThumb ? "active" : ""}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={item.image}
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
              </li>
            ))}
        </ul>
      )}

      <section className="thumb-slider">
        {is_tested && (
          <div className="product-page-tested">
            <Tested />
          </div>
        )}

        {productData?.main_image === null ? (
          <>
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              loop={true}
              onSwiper={setSwiperRef}
              breakpoints={{
                640: {
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
              }}
            >
              {product.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={item.image}
                    width={0}
                    height={0}
                    sizes="100%"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            loop={true}
            onSwiper={setSwiperRef}
            breakpoints={{
              640: {
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
            }}
          >
            {productData?.all_images.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={item.image}
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <span
          className="swiper-prev"
          onClick={() => handlePrevious(activeThumb)}
        >
          <i className="ri-arrow-left-s-line"></i>
        </span>
        <span className="swiper-next" onClick={() => handleNext(activeThumb)}>
          <i className="ri-arrow-right-s-line"></i>
        </span>
      </section>
    </section>
  );
}
