/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Form } from "react-bootstrap";

export default function ThumbSlider({ productData }) {
  const product = [
    {
      image: "/images/review-image.png",
    },
    {
      image: "/images/review-image2.png",
    },
    {
      image: "/images/review-image3.png",
    },
    {
      image: "/images/review-image.png",
    },
    {
      image: "/images/review-image.png",
    },
    {
      image: "/images/review-image2.png",
    },
    {
      image: "/images/review-image3.png",
    },
    {
      image: "/images/review-image.png",
    },
    {
      image: "/images/review-image2.png",
    },
  ];
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const swiperRefs = useRef(null);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    swiperRef.current.slideTo(index); // Move Swiper to the clicked thumbnail
  };

  const handleSwiperSlideChange = (swiper) => {
    setSelectedImageIndex(swiper.activeIndex);
  };
  return (
    <section className="thumb-section-container">
      <ul className="thumb-images">
        {product?.slice(0, 4)?.map((item, index) => (
          <li key={index} onClick={() => handleThumbnailClick(index)}>
            <img
              src={`${item?.image}`}
              width={50}
              height={50}
              alt={`Thumbnail ${index}`}
            />
          </li>
        ))}
      </ul>
      <section className="thumb-slider">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          onSlideChange={handleSwiperSlideChange}
          ref={swiperRefs}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 10 },
            1024: { slidesPerView: 1, spaceBetween: 20 },
          }}
        >
          {product?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${item?.image}`}
                width="100%"
                height="auto"
                alt={`Swiper Slide ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <span
          className="swiper-prev"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <i className="ri-arrow-left-s-line"></i>
        </span>
        <span
          className="swiper-next"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <i className="ri-arrow-right-s-line"></i>
        </span>
      </section>
      <div className="alternatives">
        <p>Similar Alternatives:</p>
        <ul>
          <li className="active">
            <span>9 kg</span>
          </li>
          <li>
            <span>10 kg</span>
          </li>
        </ul>
      </div>

      <div className="alternatives">
        <p className="version-availabel">Color available:</p>
        <Form className="color-section">
          {productData?.available_colors?.map((data, key) => {
            return (
              <>
                <div className="color-item">
                  <Form.Check
                    inline
                    label={data?.color}
                    name="color"
                    type="radio"
                    defaultChecked={key === 0}
                    id={`inline-${data?.color}-${key}`}
                  />
                </div>
              </>
            );
          })}
        </Form>
      </div>
    </section>
  );
}
