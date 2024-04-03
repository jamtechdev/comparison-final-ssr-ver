"use client";
import { useCallback, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
export default function MobileCompareTable({
  products,
  categoryAttributes,
  slug,
  productPhaseData,
}) {
  const [swiperRef, setSwiperRef] = useState();
  const [winPos, setWinPos] = useState(false);

  // For table no of category show
  let initialNoOfCategories = 2;
  const [pagination, setPagination] = useState({});
  const defaultNo = 2;

  const [fullTable, setFullTable] = useState(2);

  if (typeof window !== "undefined") {
    // Access the window object here
    window.onscroll = function () {
      var testDiv = document.getElementById("mobile-compare-tabler");
      testDiv.getBoundingClientRect().top < 100
        ? setWinPos(true)
        : setWinPos(false);
      testDiv.getBoundingClientRect().top, "top";

      var tbodyDiv = document.getElementById("mobile-compare-tablerBody");
      tbodyDiv.getBoundingClientRect().top > 100
        ? setWinPos(false)
        : setWinPos(true);
    };
  }

  // here Products restructures them into an object with the category name as the key

  const productsWithAttributeGroup = {};
  products?.forEach((product) => {
    const productCopy = { ...product };
    const productAttributes = {};
    product?.attributes?.forEach((attribute) => {
      const categoryName = attribute.attribute_category.name;
      if (!productAttributes[categoryName]) {
        productAttributes[categoryName] = [];
      }
      productAttributes[categoryName].push(attribute);
    });
    productCopy.attributes = productAttributes;
    productsWithAttributeGroup[product.name] = productCopy;
  });
  const finalProducts = Object.values(productsWithAttributeGroup);
  const removeLastObjectFromCategory = [...categoryAttributes]; // Clone the finalProducts array
  removeLastObjectFromCategory.pop();

  // if (typeof window !== 'undefined') {
  //   // Access the window object here
  //   window.onscroll = function(){
  //     var testDiv = document.getElementById("mobile-compare-tabler-1");
  //     testDiv.getBoundingClientRect().top < 100  ? setWinPos(true)  : setWinPos(false)
  //     testDiv.getBoundingClientRect().top , 'top';
  //     console.log(testDiv.getBoundingClientRect().top);

  //   var tbodyDiv = document.getElementById("mobile-compare-tablerBody-1");
  //   tbodyDiv.getBoundingClientRect().top > 100  ? setWinPos(false)   : setWinPos(true)
  //   }
  // }
  const [tabData, setTabData] = useState(false);
  const handlePrevious = useCallback(() => {
    setTabData(false);
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    setTabData(true);
    swiperRef?.slideNext();
  }, [swiperRef]);

  const useDetectSticky = (ref, observerSettings = { threshold: [1] }) => {
    const [isSticky, setIsSticky] = useState(false);
    const newRef = useRef();
    ref ||= newRef;
    useEffect(() => {
      const cachedRef = ref.current,
        observer = new IntersectionObserver(
          ([e]) => setIsSticky(e.intersectionRatio < 1),
          observerSettings
        );
      observer.observe(cachedRef);
      console.log(observerSettings);
      return () => {
        observer.unobserve(cachedRef);
      };
    }, []);

    return [isSticky, ref, setIsSticky];
  };
  const [isSticky, ref] = useDetectSticky();

  const handlePagination = (categoryName) => {
    let updatedPage =
      pagination[categoryName] + initialNoOfCategories ||
      initialNoOfCategories * 2;
    setPagination({ ...pagination, [categoryName]: updatedPage });
  };

  const handleTableShow = () => {
    setFullTable(categoryAttributes?.length);
  };

  const addAsterisksToTopValue = (defaultNo, category, catAttribute) => {
    const copiedFinalProducts = JSON.parse(JSON.stringify(finalProducts));
    const filterData = copiedFinalProducts
      .slice(0, defaultNo)
      .flatMap((product) =>
        product.attributes[category.name]?.filter(
          (obj) => obj?.attribute === catAttribute.name
        )
      );

    const arrayOfObjects = [...filterData];
    let numericValues = [];

    numericValues = arrayOfObjects
      .map((obj) => {
        if (!isNaN(parseFloat(obj?.attribute_value))) {
          return parseFloat(obj?.attribute_value);
        } else {
          return obj?.attribute_value;
        }
      })
      .filter((value) => !isNaN(value));

    if (arrayOfObjects?.[0]?.algorithm === "highest_to_lowest") {
      numericValues.sort((a, b) => b - a);
    } else {
      numericValues.sort((a, b) => a - b);
    }

    // Adding logic for String case
    if (numericValues.length === 0) {
      const stringArray = arrayOfObjects.map((obj) => obj?.attribute_value);

      if (arrayOfObjects?.[0]?.algorithm === "absolute_value") {
        const targetString =
          stringArray[0] === "yes"
            ? "yes"
            : "no" || stringArray[0] === "no"
            ? "yes"
            : "yes";
        numericValues = stringArray.filter((value) => value === targetString);
      }
    }

    const topValue = numericValues[0];
    const occurrences = numericValues?.filter(
      (value) => value === topValue
    ).length;

    if (occurrences === 1) {
      arrayOfObjects.forEach((obj) => {
        const numericValue =
          typeof topValue === "string"
            ? obj.attribute_value
            : parseFloat(obj.attribute_value);
        if (numericValue === topValue && !obj.attribute_value?.includes("⭐")) {
          obj.attribute_value += "⭐";
        }
      });
    }

    // Adjust this function according to your context as I don't have the complete code
    // It would be good to ensure that you have the required variables (finalProducts) in scope.
    const value__data = [];
    return (
      <>
        {arrayOfObjects.map((item, attrIndex) => (
          <td key={attrIndex}>
            {item?.attribute_value.includes("⭐") ? (
              <>
                <div>
                  {item?.attribute_value.split("⭐")[0]}{" "}
                  {item?.unit?.split("-")[0] && item?.unit?.split("-")[0]}
                  <span className="tooltip-title-2">
                    <img
                      style={{ float: "right", paddingRight: "5px" }}
                      src="/icons/star.png"
                      alt="star"
                    />
                    <ProsConsToolTip hover_phrase={item.start_phase} />
                  </span>
                </div>
              </>
            ) : (
              <>
                {item?.attribute_value === "-" ||
                item?.attribute_value === null ||
                item?.attribute_value === "?" ? (
                  "-"
                ) : (
                  <>
                    {item?.attribute_value === "-" ||
                    item?.attribute_value === null ||
                    item?.attribute_value === "?" ? (
                      item?.attribute_value
                    ) : (
                      <>
                        {" "}
                        {item?.attribute_value} {item?.unit ? item?.unit : ""}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </td>
        ))}
      </>
    );
  };
  // add startONTable
  const addStarOnTable = (defaultNo, type, values, starPhase) => {
    if (
      type === "overall_score" ||
      type === "expert_reviews" ||
      type === "technical_score" ||
      type === "user_rating" ||
      type === "ratio" ||
      type === "popularity"
    ) {
      const uniqueValues = [...new Set(values)];
      const maxValue = Math.max(...uniqueValues);
      return values.map((value) =>
        value === maxValue &&
        values.indexOf(value) === values.lastIndexOf(value) ? (
          <div>
            {value}
            <span key={value} className="tooltip-title-2">
              <img
                style={{ float: "right", paddingRight: "5px" }}
                src="/icons/star.png"
                alt="star"
              />
              {/* {console.log(values, "neet")} */}
              <ProsConsToolTip hover_phrase={starPhase} />
            </span>
          </div>
        ) : value === 0 ? (
          "?"
        ) : (
          value
        )
      );
    }
    return values;
  };
  // **End**

  return (
    <section className="comparisons-slider">
      <Table
        id="mobile-compare-tabler"
        className={
          winPos == true
            ? "isSticky compare-container"
            : "nonSticky compare-container"
        }
      >
        <thead>
          <tr>
            {finalProducts.slice(0, defaultNo).map((product, index) => {
              return (
                <th>
                  <p className="device-name">
                    <span>{!tabData ? index + 1 : index + 3}</span>
                    {product?.name}
                    <img
                      className="compare_image"
                      src={
                        product?.main_image
                          ? product?.main_image
                          : "/images/nofound.png"
                      }
                      width={0}
                      height={0}
                      alt={`${product?.permalink}`}
                      sizes="100%"
                    />
                  </p>
                  <ul className="best-list-item ">
                    <li>
                      <Image
                        src="/images/amazon.png"
                        width={0}
                        height={0}
                        sizes="100%"
                        alt=""
                      />
                      <span>155.87 €</span>
                    </li>
                  </ul>
                </th>
              );
            })}
          </tr>
        </thead>
      </Table>
      <Row className="mt-3 align-items-center">
        <Col sm="6" xs="9" className="p-0">
          <p>
            Showing products: <b>1-2</b>
          </p>
        </Col>
        <Col sm="6" xs="3" className="p-0">
          <div className="slider-controls">
            <span className="swiper-prev" onClick={handlePrevious}>
              <i className="ri-arrow-left-s-line"></i>
            </span>
            <span className="swiper-next" onClick={handleNext}>
              <i className="ri-arrow-right-s-line"></i>
            </span>
          </div>
        </Col>
      </Row>
      <div className="compare-container-wrapper">
        <Swiper
          id="mobile-compare-table"
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          // loop={true}
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
          <SwiperSlide>
            <Table className="compare-container">
              <thead data-sticky-header-offset-y ref={ref}>
                <tr>
                  <th>
                    <p className="device-name">
                      <span>1</span>Samsung Galaxy S23 Ultra
                    </p>
                  </th>
                  <th>
                    <p className="device-name">
                      <span>2</span>Samsung Galaxy S23 Ultra
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody id="mobile-compare-tablerBody">
                <tr>
                  <td>
                    <Image
                      className="compare_image"
                      src="/images/compare.png"
                      width={0}
                      height={0}
                      alt=""
                      sizes="100%"
                    />
                  </td>
                  <td>
                    <Image
                      className="compare_image"
                      src="/images/compare.png"
                      width={0}
                      height={0}
                      alt=""
                      sizes="100%"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="best-price-section">
                      <ul className="best-list-item">
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div className="best-price-section">
                      <ul className="best-list-item">
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td colSpan="2">
                    <p className="table-main-heading">
                      Overall Score{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td>
                    <span className="count dark-color">8.5</span>
                  </td>
                  <td>
                    <span className="count dark-color">8.5</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      Technical Score{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>electric</td>
                  <td>electric</td>
                </tr>
                <tr className="tr-bg-color">
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      User’s Ratings{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td>9.7</td>
                  <td>9.7</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      Ratio Qlt/Price{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>electric</td>
                  <td>electric</td>
                </tr>
                <tr className="tr-bg-color">
                  <td colSpan="2">
                    <p className="table-main-heading">
                      General{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td>
                    <span className="count">8.5</span>
                  </td>
                  <td>
                    <span className="count">8.5</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      Power{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>electric</td>
                  <td>electric</td>
                </tr>
                <tr className="tr-bg-color">
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      Autonomy{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td>
                    <div className="hover_container">
                      <i className="ri-star-fill"></i>
                      <p className="display-content">
                        Samsung Galaxy S22 has the best power
                      </p>
                    </div>
                    9.7
                  </td>
                  <td>9.7</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="table-main-heading">
                      Technology{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>electric</td>
                  <td>electric</td>
                </tr>
              </tbody>
            </Table>
          </SwiperSlide>
          <SwiperSlide>
            {/* <Table className="compare-container">
            <thead   id='mobile-compare-tabler-1' className={winPos == true ? "isSticky" : "nonSticky"} ref={ref} >
            <tr>
                  <th>
                    <p className="device-name">
                      <span>3</span>Samsung Galaxy S23 Ultra
                    </p>
                  </th>
                  <th>
                    <p className="device-name">
                      <span>4</span>Samsung Galaxy S23 Ultra
                    </p>
                  </th>
                </tr>
              </thead>
            </Table> */}
            <Table className="compare-container">
              <thead ref={ref}>
                <tr>
                  <th>
                    <p className="device-name">
                      <span>3</span>Samsung Galaxy S23 Ultra
                    </p>
                  </th>
                  <th>
                    <p className="device-name">
                      <span>4</span>Samsung Galaxy S23 Ultra
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody id="mobile-compare-tablerBody-1">
                <tr>
                  <td>
                    <Image
                      className="compare_image"
                      src="/images/compare.png"
                      width={0}
                      height={0}
                      alt=""
                      sizes="100%"
                    />
                  </td>
                  <td>
                    <Image
                      className="compare_image"
                      src="/images/compare.png"
                      width={0}
                      height={0}
                      alt=""
                      sizes="100%"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="best-price-section">
                      <ul className="best-list-item">
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div className="best-price-section">
                      <ul className="best-list-item">
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                        <li>
                          <Image
                            src="/images/amazon.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />
                          <span>155.87 €</span>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td colSpan="2">
                    <p className="table-main-heading">
                      Overall Score{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td>
                    <span className="count dark-color">8.5</span>
                  </td>
                  <td>
                    <span className="count dark-color">8.5</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      Technical Score{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>electric</td>
                  <td>electric</td>
                </tr>
                <tr className="tr-bg-color">
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      User’s Ratings{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td>9.7</td>
                  <td>9.7</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      Ratio Qlt/Price{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>electric</td>
                  <td>electric</td>
                </tr>
                <tr className="tr-bg-color">
                  <td colSpan="2">
                    <p className="table-main-heading">
                      General{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td>
                    <span className="count">8.5</span>
                  </td>
                  <td>
                    <span className="count">8.5</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      Power{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>electric</td>
                  <td>electric</td>
                </tr>
                <tr className="tr-bg-color">
                  <td colSpan="2">
                    <p className="table-inner-heading">
                      Autonomy{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="tr-bg-color">
                  <td>
                    <div className="hover_container">
                      <i className="ri-star-fill"></i>
                      <p className="display-content">
                        Samsung Galaxy S22 has the best power
                      </p>
                    </div>
                    9.7
                  </td>
                  <td>9.7</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="table-main-heading">
                      Technology{" "}
                      <span className="question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>electric</td>
                  <td>electric</td>
                </tr>
              </tbody>
            </Table>
          </SwiperSlide>
        </Swiper>
        <div className="text-center">
          <Button className="see_all_btn_outline">
            See Full Table <i className="ri-arrow-down-s-line"></i>
          </Button>
        </div>
      </div>
    </section>
  );
}
