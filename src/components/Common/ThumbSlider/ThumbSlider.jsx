"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function ThumbSlider({ productData }) {
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

  const setSwiperRef = (swiper) => {
    setSwiper(swiper);
  };

  const handleThumbClick = (index) => {
    if (swiper) {
      swiper.slideTo(index); // Navigate to the clicked thumbnail's corresponding slide
    }
  };

  const handlePrevious = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNext = () => {
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
          {productData?.main_image.map((item, index) => (
            <li
              key={index}
              onClick={() => handleThumbClick(index)}
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
      )}

      <section className="thumb-slider">
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
                  <Image
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
            {productData?.main_image((item, index) => (
              <SwiperSlide key={index}>
                <Image
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

        <span className="swiper-prev" onClick={handlePrevious}>
          <i className="ri-arrow-left-s-line"></i>
        </span>
        <span className="swiper-next" onClick={handleNext}>
          <i className="ri-arrow-right-s-line"></i>
        </span>
      </section>
    </section>
  );
}
