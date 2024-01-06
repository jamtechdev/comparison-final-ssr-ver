import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
import Image from "next/image";

export default function ComparisonsSlider() {
  const product = [
    {
      firstImage: "/images/review-image.png",
      secondImage: "/images/review-image2.png",
      firstReviewName: "Klarstein 22X",
      secondReviewName: "DJI Mini 3 Po",
      reviewContent: "Kitchen Robots",
      rating: "8.0",
    },
    {
      firstImage: "/images/review-image.png",
      secondImage: "/images/review-image2.png",
      firstReviewName: "Klarstein 22X",
      secondReviewName: "DJI Mini 3 Po",
      reviewContent: "Kitchen Robots",
      rating: "8.0",
    },
    {
      firstImage: "/images/review-image.png",
      secondImage: "/images/review-image2.png",
      firstReviewName: "Klarstein 22X",
      secondReviewName: "DJI Mini 3 Po",
      reviewContent: "Kitchen Robots",
      rating: "8.0",
    },
    {
      firstImage: "/images/review-image.png",
      secondImage: "/images/review-image2.png",
      firstReviewName: "Klarstein 22X",
      secondReviewName: "DJI Mini 3 Po",
      reviewContent: "Kitchen Robots",
      rating: "8.0",
    },
    {
      firstImage: "/images/review-image.png",
      secondImage: "/images/review-image2.png",
      firstReviewName: "Klarstein 22X",
      secondReviewName: "DJI Mini 3 Po",
      reviewContent: "Kitchen Robots",
      rating: "8.0",
    },
    {
      firstImage: "/images/review-image.png",
      secondImage: "/images/review-image2.png",
      firstReviewName: "Klarstein 22X",
      secondReviewName: "DJI Mini 3 Po",
      reviewContent: "Kitchen Robots",
      rating: "8.0",
    },
  ];
  return (
    <section className="comparisons-slider">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        loop={true}
        navigation={{
          nextEl: ".comparisons-slider .swiper-next",
          prevEl: ".comparisons-slider .swiper-prev",
        }}
        pagination={true}
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
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="product-slider"
      >
        {product.map(function (item, index) {
          return (
            <SwiperSlide key={index}>
              <div className="comparisons-wrapper">
                <div className="comparisons-container">
                  <div className="comparisons-card">
                    <Image
                      src={item.firstImage}
                      width={0}
                      height={0}
                      sizes="100%"
                      alt=""
                    />
                    <div className="footer_content">
                      <span>{item.firstReviewName}</span>
                    </div>
                    <span className="rating_count">{item.rating}</span>
                  </div>
                  <div className="vs-divider">
                    <span>VS</span>
                  </div>
                  <div className="comparisons-card">
                    <Image
                      src={item.secondImage}
                      width={0}
                      height={0}
                      sizes="100%"
                      alt=""
                    />
                    <div className="footer_content">
                      <span>{item.secondReviewName}</span>
                    </div>
                    <span className="rating_count">{item.rating}</span>
                  </div>
                  <div className="comparisons-footer">{item.reviewContent}</div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <span className="swiper-prev">
        <i className="ri-arrow-left-s-line"></i>
      </span>
      <span className="swiper-next">
        <i className="ri-arrow-right-s-line"></i>
      </span>
    </section>
  );
}
