import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import { Navigation } from "swiper";
import Modal from "../../Modal/Modal";
import CompareModal from "../../Modal/Modal";

export default function MobileCompareTable() {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);
  return (
    <>
    <div className="comparison-tool mobile-comparison-tool">
      <Swiper
        modules={[Navigation, Pagination]}
        // spaceBetween={30}
        // loop={true}
        onSwiper={setSwiperRef}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 80,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 80,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 80,
          },
        }}
      >
        <SwiperSlide>
          <div className="comparison-wrapper">
            <div className="comparison-tag">Winner</div>
            <div className="comparison-card">
              <Image
                src="/images/compare.png"
                width={0}
                height={0}
                alt=""
                sizes="100%"
              />
              <div className="comparison-card-footer">
                <p>Samsung Galaxy S23 Ultra </p>
              </div>
              <span className="count">8.5</span>
              <span className="mobile-close_icon"><i className="ri-close-line"></i> Remove</span>
            </div>
            <div className="comparison-product-spec">
              <div className="comparison-product-item">
                <Image
                  src="/images/amazon.png"
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
                <span>155.87 €</span>
              </div>
              <div className="comparison-product-item">
                <Image
                  src="/images/amazon.png"
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
                <span>155.87 €</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="comparison-wrapper">
            <div className="comparison-card">
              <Image
                src="/images/compare.png"
                width={0}
                height={0}
                alt=""
                sizes="100%"
              />
              <div className="comparison-card-footer">
                <p>Samsung Galaxy S23 Ultra </p>
              </div>
              <span className="count">8.5</span>
              <span className="mobile-close_icon"><i className="ri-close-line"></i> Remove</span>
            </div>
            <div className="comparison-product-spec">
              <div className="comparison-product-item">
                <Image
                  src="/images/amazon.png"
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
                <span>155.87 €</span>
              </div>
              <div className="comparison-product-item">
                <Image
                  src="/images/amazon.png"
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
                <span>155.87 €</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="comparison-wrapper">
            <div className="comparison-card">
              <Image
                src="/images/compare.png"
                width={0}
                height={0}
                alt=""
                sizes="100%"
              />
              <div className="comparison-card-footer">
                <p>Samsung Galaxy S23 Ultra </p>
              </div>
              <span className="count">8.5</span>
              <span className="mobile-close_icon"><i className="ri-close-line"></i> Remove</span>
            </div>
            <div className="comparison-product-spec">
              <div className="comparison-product-item">
                <Image
                  src="/images/amazon.png"
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
                <span>155.87 €</span>
              </div>
              <div className="comparison-product-item">
                <Image
                  src="/images/amazon.png"
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
                <span>155.87 €</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <span className="swiper-prev" onClick={handlePrevious}>
        <i className="ri-arrow-left-s-line"></i>
      </span>
      <span className="swiper-next" onClick={handleNext}>
        <i className="ri-arrow-right-s-line"></i>
      </span>
    </div>
     <Row>
     <Col md={12} className="text-center mb-3">
         <Button className="site_main_btn" onClick={() => setIsOpen(true)}>Add Product</Button>
     </Col>
   </Row>
   {isOpen && <CompareModal setIsOpen={setIsOpen} />}
   </>
  );
}
