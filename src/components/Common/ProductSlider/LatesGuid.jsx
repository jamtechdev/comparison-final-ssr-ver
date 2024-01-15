import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";
import Link from "next/link";
export default function LatesGuid({ favSlider }) {
  return (
    <>
      <div className="product-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          loop={true}
          rewind={true}
          navigation={{
            nextEl: ".product-slider .swiper-next",
            prevEl: ".product-slider .swiper-prev",
          }}
          pagination={true}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1200: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {favSlider?.length > 0 &&
            favSlider?.map((section, index) => (
              <SwiperSlide key={Math.random(1, 999)} className="product-card">
                <Link
                  href={`${section?.category_url}/${section?.permalink}`}
                  style={{ color: "#27304e" }}
                >
                  <Image
                    src={
                      section.bannerImage === null
                        ? `/images/nofound.png`
                        : section?.bannerImage
                    }
                    width={0}
                    height={0}
                    sizes="100%"
                    alt=""
                  />
                  <div className="product-name-wrapper">
                    <span>{section?.short_name}</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
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
      </div>
    </>
  );
}
