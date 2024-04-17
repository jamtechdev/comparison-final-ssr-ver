"use client";
import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  Fragment,
} from "react";
import Image from "next/image";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import formatValue from "@/_helpers/formatValue";
import ProsConsToolTip from "@/components/Svg/ProsConsToolTip";
export default function MobileCompareTable({
  products,
  categoryAttributes,
  slug,
  productPhaseData,
}) {
  const [swiperRef, setSwiperRef] = useState();
  const [winPos, setWinPos] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // For table no of category show
  let initialNoOfCategories = 5;
  const [pagination, setPagination] = useState({});
  const defaultNo = 5;

  const [fullTable, setFullTable] = useState(2);

  if (typeof window !== "undefined") {
    // Access the window object here
    window.onscroll = function () {
      var testDiv = document.getElementById("mobile-compare-tabler");
      testDiv?.getBoundingClientRect().top < 100
        ? setWinPos(true)
        : setWinPos(false);
      testDiv?.getBoundingClientRect().top, "top";

      var tbodyDiv = document.getElementById("mobile-compare-tablerBody");
      tbodyDiv?.getBoundingClientRect().top > 100
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
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    swiperRef?.slidePrev();
  }, [swiperRef]);


  const handleNext = useCallback(() => {
    setTabData(true);
    if (currentIndex < chunkedData.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
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
      // console.log(observerSettings);
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

    // const chunkArrayOfObjects = chunk(arrayOfObjects, 2);
    // Adjust this function according to your context as I don't have the complete code
    // It would be good to ensure that you have the required variables (finalProducts) in scope.
    const value__data = [];
    function chunkArray(array, chunkSize) {
      const chunks = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    }
    const chunkArrayOfObjects = chunkArray(arrayOfObjects, 2);
    // console.log(chunkArrayOfObjects, "chunk");
    return chunkArrayOfObjects;
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

  // console.log(finalProducts, "neet");
  // Make chunks Array
  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const chunkedData = chunkArray(finalProducts, 2);

  // make categoryAttribute chunk Array

  function categoryChunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  const categoryChunkedData = categoryChunkArray(
    removeLastObjectFromCategory,
    2
  );

  // console.log(categoryChunkedData, "neetxy");
  // let storeSwiperIndex = 0; // Declare a variable outside the map function
  // console.log(storeSwiperIndex,"neetxy")

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
    console.log(currentIndex, "ckeking current index");
  };

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
            {chunkedData
              ?.slice(currentIndex, currentIndex + 1)
              .map((product, index) => {
                // console.log(index, "sticky index");
                // const productIndex=index+1
                // console.log(productIndex,"checking product index for images")
                // return product?.slice( currentIndex).map((data,tIndex) => {
                return product?.map((data, tIndex) => {
                  // console.log(currentIndex, "check currentIndex");
                  // console.log(product, "check products");
                  return (
                    <th key={tIndex}>
                      <p className="device-name">
                        {/* <span>{productIndex}</span> */}
                        <span>
                          {currentIndex * product.length + tIndex + 1}
                        </span>
                        <b>{data?.name}</b>
                        <img
                          className="compare_image"
                          src={
                            data?.main_image
                              ? data?.main_image
                              : "/images/nofound.png"
                          }
                          width={0}
                          height={0}
                          alt={`${data?.permalink}`}
                          sizes="100%"
                        />
                      </p>
                      {data.price_websites &&
                        data?.price_websites?.every(
                          (data) => data.price !== null
                        ) && (
                          <>
                            {" "}
                            <>
                              <ul className="best-list-item">
                                {" "}
                                {data.price_websites &&
                                  data?.price_websites?.every(
                                    (data) => data.price === null
                                  ) && (
                                    <div className="not-availabel n-lable p-1">
                                      {/* <span className="txt">NOT AVAILABLE</span> */}
                                      <i>N/A</i>
                                      <span className="price">
                                        ~ {data?.price} €
                                      </span>
                                    </div>
                                  )}
                                {data.price_websites &&
                                  data.price_websites
                                    .slice(0, 1)
                                    ?.map((price_data, dIndex) => {
                                      return (
                                        <div key={dIndex}>
                                          {price_data.price !== null && (
                                            <li>
                                              <>
                                                <a
                                                  rel="noopener noreferrer"
                                                  target="_blank"
                                                  href={`/link?p=${btoa(
                                                    price_data.url
                                                  )}`}
                                                >
                                                  <img
                                                    src={price_data?.logo}
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    alt={price_data?.alt}
                                                  />
                                                </a>
                                                <span>
                                                  <a
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    href={`/link?p=${btoa(
                                                      price_data.url
                                                    )}`}
                                                  >
                                                    {price_data?.price} €
                                                  </a>
                                                </span>
                                              </>
                                            </li>
                                          )}
                                        </div>
                                      );
                                    })}
                              </ul>
                            </>
                          </>
                        )}
                    </th>
                  );
                });
              })}
          </tr>
        </thead>
      </Table>

      {/* / copying below table */}

      {/* ending below table */}

      {/* <Row className="mt-3 align-items-center">
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
      </Row> */}
      <div className="compare-container-wrapper">
        <div
          className={
            winPos == true
              ? "slider-controls table__arrow arrow__fixed"
              : "slider-controls table__arrow"
          }
        >
        
          <span className="swiper-prev" onClick={handlePrevious}>
            <i className="ri-arrow-left-s-line"></i>
          </span>
          <span className="swiper-next" onClick={handleNext}>
            <i className="ri-arrow-right-s-line"></i>
          </span>
        </div>
        <div
          className="slider-controls table__image__arrow"
        >
           {currentIndex === 0? (
        <span className="swiper-next" onClick={handleNext} style={{marginLeft:"88vw"}}>
          <i className="ri-arrow-right-s-line" ></i>
        </span>
      ) : (
        <span className="swiper-prev" onClick={handlePrevious}>
          <i className="ri-arrow-left-s-line"></i>
        </span>
      )}
        </div>

       
        {/* <Swiper onSlideChange={(swiper) => setTableIndex(swiper.activeIndex)} */}
        <Swiper
          onSlideChange={handleSlideChange}
          id="mobile-compare-table"
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          // loop={true}
          onSwiper={setSwiperRef}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          className="product-slider"
        >
          {chunkedData?.map((slider_data, swiperIndex) => {
            console.log(swiperIndex, "check swiper index");
            return (
              <SwiperSlide key={swiperIndex}>
                <Table className="compare-container">
                  <thead data-sticky-header-offset-y ref={ref}>
                    <tr>
                      {slider_data?.map((data, dIndex) => {
                        console.log(dIndex, "table index");
                        return (
                          <th key={dIndex}>
                            <p className="device-name">
                              <span>
                                {currentIndex * slider_data.length + dIndex + 1}
                              </span>
                              {data?.name}
                            </p>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody id="mobile-compare-tablerBody">
                    <tr>
                      {slider_data?.map((data, dIndex) => {
                        return (
                          <td>
                            <Image
                              className="compare_image"
                              src={
                                data?.main_image
                                  ? data?.main_image
                                  : "/images/nofound.png"
                              }
                              width={0}
                              height={0}
                              alt={`${data?.permalink}`}
                              sizes="100%"
                            />
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      {slider_data?.map((data, dIndex) => {
                        return (
                          <td>
                            <div className="best-price-section">
                              {data?.price_websites &&
                                data?.price_websites?.every(
                                  (data) => data.price === null
                                ) && (
                                  <div className="not-availabel">
                                    {/* <span className="txt">NOT AVAILABLE</span> */}
                                    <i>N/A</i>
                                    <span className="price">
                                      ~ {data?.price} €
                                    </span>
                                  </div>
                                )}
                              {data?.price_websites &&
                                data?.price_websites?.every(
                                  (data) => data.price !== null
                                ) && (
                                  <ul className="best-list-item">
                                    {data?.price_websites?.map(
                                      (priceData, dIndex) => {
                                        return (
                                          <li>
                                            <>
                                              <a
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                href={`/link?p=${btoa(
                                                  priceData.url
                                                )}`}
                                              >
                                                <img
                                                  src={priceData?.logo}
                                                  width={0}
                                                  height={0}
                                                  sizes="100vw"
                                                  alt={priceData?.alt}
                                                />
                                              </a>
                                              <span>
                                                <a
                                                  rel="noopener noreferrer"
                                                  target="_blank"
                                                  href={`/link?p=${btoa(
                                                    priceData.url
                                                  )}`}
                                                >
                                                  {priceData?.price} €
                                                </a>
                                              </span>
                                            </>
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="tr-bg-color">
                      <td colSpan="2">
                        <div className="table-main-heading">
                          Overall Score{" "}
                          {/* {products &&
                              products.length > 0 &&
                              products[0]?.overall_score_descriptions && (
                                <div className="tooltip-display-content">
                                  {products[0]?.overall_score_descriptions
                                    ?.description && (
                                    <p className="mb-2">
                                      <b>What it is: </b>{" "}
                                      {
                                        products[0]?.overall_score_descriptions
                                          ?.description
                                      }
                                    </p>
                                  )}
                                  {products[0]?.overall_score_descriptions
                                    ?.when_matters && (
                                    <p className="mb-2">
                                      <b>When it matters: </b>{" "}
                                      {
                                        products[0]?.overall_score_descriptions
                                          ?.when_matters
                                      }
                                    </p>
                                  )}
                                </div>
                              )} */}
                          <span className="question-marker-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="tr-bg-color">
                      {slider_data.map((product, overAllIndex) => {
                        return (
                          <td key={overAllIndex}>
                            <span
                              className="count dark-color"
                              style={{
                                background:
                                  product.overall_score >= 7.5
                                    ? "#093673"
                                    : product.overall_score >= 5 &&
                                      product.overall_score < 7.5
                                    ? "#437ECE"
                                    : " #85B2F1",
                              }}
                            >
                              {formatValue(product?.overall_score)}
                            </span>
                          </td>
                        );
                      })}

                      {/* <td>
                          <span className="count dark-color">8.5</span>
                        </td>
                        <td>
                          <span className="count dark-color">8.5</span>
                        </td> */}
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
                      {slider_data.map((product, technicalIndex) => {
                        const values = slider_data.map(
                          (p) => p.technical_score
                        );
                        return (
                          <td key={technicalIndex}>
                            {
                              addStarOnTable(
                                defaultNo,
                                "technical_score",
                                values,
                                product?.technical_score_star_phrase
                              )[technicalIndex]
                            }
                          </td>
                        );
                      })}
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
                      {slider_data.map((product, userIndex) => {
                        const values = slider_data.map((p) => p.reviews);
                        return (
                          <td key={userIndex}>
                            {
                              addStarOnTable(
                                defaultNo,
                                "user_rating",
                                values,
                                product?.reviews_star_phase
                              )[userIndex]
                            }
                          </td>
                        );
                      })}
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
                      {slider_data.map((product, ratioIndex) => {
                        const values = slider_data.map(
                          (p) => p.ratio_quality_price_points
                        );
                        return (
                          <td key={ratioIndex}>
                            {/* {console.log(values, "neetxy")} */}
                            {
                              addStarOnTable(
                                defaultNo,
                                "ratio",
                                values,
                                product?.ratio_quality_price_points_star_phase
                              )[ratioIndex]
                            }
                          </td>
                        );
                      })}
                    </tr>
                    {products[0]?.area_evaluation?.map((data, index) => {
                      const maxValues = slider_data.map(
                        (product) =>
                          product?.area_evaluation?.[index]?.value ?? null
                      );
                      const max = Math.max(
                        ...maxValues.filter((value) => value !== null)
                      );

                      // Count occurrences of each value
                      const valueCounts = slider_data.reduce((acc, product) => {
                        const value = product?.area_evaluation?.[index]?.value;
                        if (value !== null) {
                          acc[value] = (acc[value] || 0) + 1;
                        }
                        return acc;
                      }, {});

                      return (
                        <>
                          <tr>
                            <td colSpan="2">
                              <p className="table-inner-heading">
                                {data?.title}
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

                          <tr className="" key={index}>
                            {" "}
                            {/* Ensure to set a unique key for each <tr> */}
                            {slider_data.map((product, idx) => {
                              const value =
                                product?.area_evaluation?.[index]?.value ??
                                null;
                              return (
                                <td key={idx}>
                                  {formatValue(value)}
                                  {value === max && valueCounts[value] <= 1 && (
                                    <span
                                      key={value}
                                      className="tooltip-title-2"
                                    >
                                      <img
                                        style={{
                                          float: "right",
                                          paddingRight: "5px",
                                        }}
                                        src="/icons/star.png"
                                        alt="star"
                                      />
                                      <ProsConsToolTip
                                        hover_phrase={data?.star_text}
                                      />
                                    </span>
                                  )}
                                  {/* Add star if the value is the maximum for this index and count is less than or equal to 2 */}
                                </td>
                              );
                            })}
                          </tr>
                        </>
                      );
                    })}
                    {categoryChunkedData
                      ?.slice(0, fullTable || 2)
                      .map((category, categoryIndex) => {
                        return category.map((product, ratioIndex) => {
                          return (
                            <>
                              <tr className="tr-bg-color">
                                <td colSpan="2">
                                  <p className="table-main-heading">
                                    {product?.name}
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
                                {slider_data.map((data, Sliderindex) => {
                                  return (
                                    <td key={Sliderindex}>
                                      <span className="count">
                                        {" "}
                                        {data.attributes[
                                          product.name
                                        ]?.[0].final_points?.toFixed(1)}{" "}
                                      </span>
                                    </td>
                                  );
                                })}
                              </tr>

                              {product?.attributes
                                ?.slice(
                                  0,
                                  pagination[product.name] ||
                                    initialNoOfCategories
                                )
                                .map((data, index) => {
                                  return (
                                    <>
                                      <tr key={index}>
                                        <td colSpan="2">
                                          <p className="table-inner-heading">
                                            {data.name}
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
                                        {addAsterisksToTopValue(
                                          defaultNo,
                                          product,
                                          data
                                        )
                                          ?.slice(0, defaultNo)
                                          ?.map((chunk, chunkIndex) => {
                                            return chunk
                                              ?.slice(
                                                swiperIndex,
                                                swiperIndex + 1
                                              )
                                              .map((item, attrIndex) => {
                                                return (
                                                  <td key={attrIndex}>
                                                    {item?.attribute_value.includes(
                                                      "⭐"
                                                    ) ? (
                                                      <>
                                                        <div>
                                                          {
                                                            item?.attribute_value.split(
                                                              "⭐"
                                                            )[0]
                                                          }{" "}
                                                          {item?.unit?.split(
                                                            "-"
                                                          )[0] &&
                                                            item?.unit?.split(
                                                              "-"
                                                            )[0]}
                                                          <span className="tooltip-title-2">
                                                            <img
                                                              style={{
                                                                float: "right",
                                                                paddingRight:
                                                                  "5px",
                                                              }}
                                                              src="/icons/star.png"
                                                              alt="star"
                                                            />
                                                            <ProsConsToolTip
                                                              hover_phrase={
                                                                item.start_phase
                                                              }
                                                            />
                                                          </span>
                                                        </div>
                                                      </>
                                                    ) : (
                                                      <>
                                                        {item?.attribute_value ===
                                                          "-" ||
                                                        item?.attribute_value ===
                                                          null ||
                                                        item?.attribute_value ===
                                                          "?" ? (
                                                          "-"
                                                        ) : (
                                                          <>
                                                            {item?.attribute_value ===
                                                              "-" ||
                                                            item?.attribute_value ===
                                                              null ||
                                                            item?.attribute_value ===
                                                              "?" ? (
                                                              item?.attribute_value
                                                            ) : (
                                                              <>
                                                                {" "}
                                                                {
                                                                  item?.attribute_value
                                                                }{" "}
                                                                {item?.unit
                                                                  ? item?.unit
                                                                  : ""}
                                                              </>
                                                            )}
                                                          </>
                                                        )}
                                                      </>
                                                    )}
                                                  </td>
                                                );
                                              });
                                          })}
                                      </tr>

                                      {/* <tr>
                                        {addAsterisksToTopValue(
                                          defaultNo,
                                          product,
                                          data
                                        )}
                                      </tr> */}
                                    </>
                                  );
                                })}
                            </>
                          );
                        });
                      })}
                  </tbody>
                </Table>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {fullTable == 2 && (
          <div className="text-center">
            <Button className="see_all_btn_outline" onClick={handleTableShow}>
              {/* {console.log(productPhaseData)} */}
              See Full Table
              <i className="ri-arrow-down-s-line"></i>
            </Button>
          </div>
        )}
        {/* <div className="text-center">
            <Button className="see_all_btn_outline">
              See Full Table <i className="ri-arrow-down-s-line"></i>
            </Button>
          </div> */}
      </div>
    </section>
  );
}
