"use client";
import { GetCompareId } from "@/components/Product/GetCompareId.jsx";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Row,
  Button,
  Col,
  Container,
  Form,
  Nav,
  Tab,
  Tabs,
} from "react-bootstrap";
import Link from "next/link";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import ThumbSlider from "@/components/Common/ThumbSlider/ThumbSlider";
import Image from "next/image";
import WhyAccordionTab from "@/components/Product/WhyAccordionTab";
import TechnicalAccordion from "../../components/Product/TechnicalAccordion";
import CompareDropDown from "@/components/Product/CompareDropDown";
import ProductSlider from "@/components/Common/ProductSlider/productSlider";
import ProductTabs from "@/components/Product/ProductTabs";
import ProductCompareTable from "@/components/Common/CompareTable/ProductCompareTable";
import ComparisonsSlider from "@/components/Common/ComparisonsSlider/comparisonsSlider";
import OutlineGenerator from "@/components/Common/OutlineGenerator/OutlineGenerator";
import CompareForm from "@/components/Common/Comparison/CompareForm";
import ReviewSlider from "@/components/Common/ReviewSlider/reviewSlider";
import { searchForPatternAndReplace } from "@/hooks/useChart";

// import Link from "next/link";

function ProductPage({
  productData,
  productCatAttributes,
  compareByCatID,
  slug,
  categorySlug,
}) {
  const [activeOutlineId, setActiveOutlineId] = useState("");
  const contentRef = useRef(null);

  let initialDisplay = 5;
  const productsWithAttributeGroup = {};
  const productCopy = { ...productData[0].data }; // Create a shallow copy to avoid modifying the original data
  const productAttributes = {};
  productData[0].data?.attributes?.forEach((attribute) => {
    const categoryName = attribute?.attribute_category?.name;
    if (!productAttributes[categoryName]) {
      productAttributes[categoryName] = [];
    }
    productAttributes[categoryName]?.push({ ...attribute }); // Create a shallow copy of the attribute
  });

  productCopy["attributes"] = productAttributes;
  productsWithAttributeGroup[productData[0]?.data?.name] = { ...productCopy }; // Create a shallow copy of productCopy
  const finalProducts = Object.values(productsWithAttributeGroup);

  let product = finalProducts[0];
  let loading = false;
  let displayedAttributesCount = {};
  const getColorBasedOnScore = (score) => {
    if (score >= 7.5) {
      return "#093673";
    } else if (score >= 5 && score < 7.5) {
      return "#437ECE";
    } else {
      return "#85B2F1";
    }
  };
  // rating texr
  const getEvaluation = (score) => {
    if (score >= 9) {
      return "Outstanding";
    } else if (score >= 8) {
      return "Excellent";
    } else if (score >= 7) {
      return "Very good";
    } else if (score >= 5) {
      return "Good";
    } else if (score >= 3) {
      return "Fair";
    } else if (score >= 1) {
      return "Poor";
    }
    return "Poor"; // Handle other cases as needed
  };

  let showFullPrice = false;
  let showFullRanking = false;
  const resultOverallScore = getEvaluation(finalProducts[0]?.overall_score);
  const resultTechnicalScoreColor = getEvaluation(
    finalProducts[0]?.technical_score
  );
  const resultUsersRatingColor = getEvaluation(finalProducts[0]?.reviews);
  const overallScoreColor = getColorBasedOnScore(
    finalProducts[0]?.overall_score
  );
  const technicalScoreColor = getColorBasedOnScore(
    finalProducts[0]?.technical_score
  );
  const RatingColor = getColorBasedOnScore(finalProducts[0]?.reviews);

  // filter a value which numeric or string
  const renderValue = (item) => {
    const numericValue = parseFloat(item?.value);

    if (!isNaN(numericValue)) {
      return `(${numericValue} ${item.unit ? item.unit : ""})`;
    } else {
      return item?.value === undefined ||
        item?.value === "" ||
        item?.value === null
        ? ""
        : `(${item?.value})`;
    }
    // return ""; // Return null for strings
  };

  const setShowFullPrice = () => {
    showFullPrice = !setShowFullPrice;
  };

  // available version
  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  // This code for text part and outline
  useEffect(() => {
    const handleScroll = () => {
      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );

      let closestHeading = null;
      let closestDistance = Number.MAX_VALUE;

      headings.forEach((heading) => {
        const bounding = heading.getBoundingClientRect();
        const distanceToTop = bounding.top;

        if (distanceToTop >= 0 && distanceToTop < closestDistance) {
          closestHeading = heading;
          closestDistance = distanceToTop;
        }
      });

      if (closestHeading) {
        setActiveOutlineId(closestHeading.id);
      }

      const shortCodeText = document.getElementById("shortCodeText");
      if (shortCodeText) {
        const shortCodeTextBounding = shortCodeText.getBoundingClientRect();
        if (
          shortCodeTextBounding.top >= 0 &&
          shortCodeTextBounding.bottom <= window.innerHeight
        ) {
          setActiveOutlineId("shortCodeText");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const addIdsToHeadings = (content) => {
    const headings = content.match(/<h[2-6][^>]*>.*?<\/h[2-6]>/g) || [];

    headings.forEach((heading) => {
      const id = heading
        .replace(/<\/?[^>]+(>|$)/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      const newHeading = heading.replace(">", ` id="${id}">`);
      content = content.replace(heading, newHeading);
    });

    return content;
  };
  const contentWithIds = addIdsToHeadings(product?.text_part);

  return (
    <>
      {/* {console.log(product)} */}
      <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <BreadCrumb
                firstPageName={categorySlug}
                secondPageName={product}
              />
            </Col>
            <Col md={12} lg={12} xl={9}>
              <h1 className="site-main-heading">{product?.heading_title}</h1>
            </Col>

            <Col md={12} lg={12} xl={3}>
              <div className="user-info-section">
                {product?.author && (
                  <div className="user-section">
                    {product?.author?.image && (
                      <img
                        src={
                          product?.author?.image
                            ? product?.author?.image
                            : "/images/user.png"
                        }
                        width={0}
                        height={0}
                        sizes="100%"
                        alt=""
                      />
                    )}
                    <div className="user-detail">
                      <p>
                        <Link href={`/author/${product?.author?.id}`}>
                          {product?.author?.name}
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
                <span>
                  updated:
                  <i>{product?.updated_at}</i>
                </span>
              </div>
            </Col>

            <Col md={12}>
              <p className="product-inner-content">
                {product?.meta_description}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="product-score-section">
        <Container>
          <div className="product-score-container">
            <div className="score-section score-section-2">
              <span
                className="count"
                style={{ backgroundColor: overallScoreColor }}
              >
                {product?.overall_score}
              </span>
              <div className="score-detail ">
                <div className="tooltip-title removeUnderlineFrom">
                  <p>
                    Overall Score
                    <span className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                      </svg>
                    </span>
                  </p>
                  <div className="tooltip-display-content bottom-tooltip-display">
                    {product?.overall_score_descriptions.description && (
                      <p className="mb-2">
                        <b>What it is: </b>
                        {product?.overall_score_descriptions?.description}
                      </p>
                    )}
                    {product?.overall_score_descriptions.when_matters && (
                      <p className="mb-2">
                        <b>When it matters: </b>
                        {product?.overall_score_descriptions?.when_matters}
                      </p>
                    )}
                    <p>
                      <b>Score components:</b>
                    </p>
                    {product.overall_score_descriptions.score_components &&
                      product.overall_score_descriptions.score_components?.map(
                        (data, index) => {
                          return (
                            <div className="scroe_section" key={index}>
                              <p className="text-end">
                                {`${parseFloat(data?.importance).toFixed(1)}%`}
                              </p>
                              <div
                                className="score-count"
                                style={{
                                  background:
                                    data?.attribute_evaluation >= 7.5
                                      ? "#093673"
                                      : data?.attribute_evaluation >= 5 &&
                                        data?.attribute_evaluation < 7.5
                                      ? "#437ECE"
                                      : "#85B2F1",
                                }}
                              >
                                {data?.attribute_evaluation != null
                                  ? data?.attribute_evaluation >= 10
                                    ? Math.trunc(data?.attribute_evaluation)
                                    : data?.attribute_evaluation.toFixed(1)
                                  : "0.0"}
                              </div>
                              <p>{data?.attribute_category}</p>
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
                <div className="score-bar">
                  <span
                    className="fill-bar"
                    style={{
                      background: overallScoreColor,
                      width: `${parseFloat(product?.overall_score) * 10}%`,
                    }}
                  ></span>
                </div>
                {resultOverallScore && (
                  <small>
                    {resultOverallScore}{" "}
                    {/* <i>{`${product?.overall_score_better_then * 100}`}</i> */}
                  </small>
                )}
              </div>
            </div>
            <div className="score-section color-change score-section-2">
              <span
                className="count"
                style={{ backgroundColor: technicalScoreColor }}
              >
                {product?.technical_score}
              </span>
              <div className="score-detail">
                <div className="tooltip-title removeUnderlineFrom ">
                  <p>
                    Technical Score
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                      </svg>
                    </span>
                  </p>
                  <div className="tooltip-display-content bottom-tooltip-display">
                    {product?.technical_score_descriptions.description && (
                      <p className="mb-2">
                        <b>What it is: </b>
                        {product?.technical_score_descriptions?.description}
                      </p>
                    )}
                    {product?.technical_score_descriptions.when_matters && (
                      <p className="mb-2">
                        <b>When it matters: </b>
                        {product?.technical_score_descriptions?.when_matters}
                      </p>
                    )}
                    <p>
                      <b>Score components:</b>
                    </p>
                    {product.technical_score_descriptions.score_components &&
                      product.technical_score_descriptions.score_components?.map(
                        (data, index) => {
                          return (
                            <div className="scroe_section" key={index}>
                              <p className="text-end">
                                {`${parseFloat(data?.importance).toFixed(1)}%`}
                              </p>
                              <div
                                className="score-count"
                                style={{
                                  background:
                                    data?.attribute_evaluation >= 7.5
                                      ? "#093673"
                                      : data?.attribute_evaluation >= 5 &&
                                        data?.attribute_evaluation < 7.5
                                      ? "#437ECE"
                                      : "#85B2F1",
                                }}
                              >
                                {data?.attribute_evaluation != null
                                  ? data?.attribute_evaluation >= 10
                                    ? Math.trunc(data?.attribute_evaluation)
                                    : data?.attribute_evaluation.toFixed(1)
                                  : "0.0"}
                              </div>
                              <p>{data?.attribute_category}</p>
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>

                <div className="score-bar">
                  <span
                    className="fill-bar"
                    style={{
                      background: technicalScoreColor,
                      width: `${parseFloat(product?.technical_score) * 10}%`,
                    }}
                  ></span>
                </div>
                <small>
                  {resultTechnicalScoreColor}{" "}
                  {/* <i>{`${product?.technical_score_is_better_than * 100}`}</i> */}
                </small>
              </div>
            </div>
            <div className="score-section color-change score-section-2">
              <span className="count" style={{ backgroundColor: RatingColor }}>
                {product?.reviews}
              </span>
              <div className="score-detail">
                <div className="tooltip-title removeUnderlineFrom">
                  <p>
                    User’s Rating{" "}
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                      </svg>
                    </span>
                  </p>
                  <div className="tooltip-display-content bottom-tooltip-display">
                    {product?.users_rating_descriptions.description && (
                      <p className="mb-2">
                        <b>What it is: </b>
                        {product?.users_rating_descriptions?.description}
                      </p>
                    )}
                    {product?.technical_score_descriptions.when_matters && (
                      <p className="mb-2">
                        <b>When it matters: </b>
                        {product?.users_rating_descriptions?.when_matters}
                      </p>
                    )}
                    <p>
                      <b>Score components:</b>
                    </p>
                    {product.users_rating_descriptions.score_components &&
                      product.users_rating_descriptions.score_components?.map(
                        (data, index) => {
                          return (
                            <div className="scroe_section" key={index}>
                              <p className="text-end">
                                {`${parseFloat(data?.importance).toFixed(1)}%`}
                              </p>
                              <div
                                className="score-count"
                                style={{
                                  background:
                                    data?.attribute_evaluation >= 7.5
                                      ? "#093673"
                                      : data?.attribute_evaluation >= 5 &&
                                        data?.attribute_evaluation < 7.5
                                      ? "#437ECE"
                                      : "#85B2F1",
                                }}
                              >
                                {data?.attribute_evaluation != null
                                  ? data?.attribute_evaluation >= 10
                                    ? Math.trunc(data?.attribute_evaluation)
                                    : data?.attribute_evaluation.toFixed(1)
                                  : "0.0"}
                              </div>
                              <p>{data?.attribute_category}</p>
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>

                <div className="score-bar">
                  <span
                    className="fill-bar"
                    style={{
                      background: RatingColor,
                      width: `${parseFloat(product?.reviews) * 10}%`,
                    }}
                  ></span>
                </div>
                <small>
                  {resultUsersRatingColor}{" "}
                  {/* <i>{`${product?.reviews_is_better_than * 100}`}</i> */}
                </small>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="mb-3">
        <Container>
          <Row>
            <Col md={12} lg={12} xl={4}>
              <ThumbSlider productData={product} />
            </Col>
            <Col lg={6} md={6} xl={4}>
              <div className="best-price-section">
                <h2 className="site-main-heading">Best Prices</h2>
                <ul className="best-list-item">
                  {product &&
                    product?.price_websites
                      .slice(0, showFullPrice ? 8 : 4)
                      .map((item, index) => {
                        return (
                          <li key={index}>
                            <Link
                              rel="noopener noreferrer"
                              target="_blank"
                              href={`/link?p=${btoa(item.url)}`}
                            >
                              <Image
                                src={item?.logo}
                                width={0}
                                height={0}
                                sizes="100%"
                                alt="price"
                              />
                            </Link>
                            <span>
                              <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href={`/link?p=${btoa(item.url)}`}
                              >
                                {item?.price} €
                              </a>
                            </span>
                          </li>
                        );
                      })}
                </ul>
                {product?.price_websites.length > 5 && (
                  <Button className="see_all_btn">
                    See All <i className="ri-arrow-down-s-line"></i>
                  </Button>
                )}
              </div>
            </Col>
            <Col lg={6} md={6} xl={4}>
              <div className="best-price-section ranking">
                <h2 className="site-main-heading">Best Rankings</h2>
                <ul className="best-list-item">
                  {product &&
                    product?.guide_ratings
                      .slice(0, showFullRanking ? 8 : 4)
                      .map((item, index) => {
                        return (
                          <li key={index} className="d-flex align-items-start">
                            <div className="d-flex align-items-start gap-1">
                              <img
                                src="/images/double-arrow.png"
                                width={0}
                                height={0}
                                sizes="100%"
                                alt=""
                              />
                              <p>
                                N.{item.position} in{" "}
                                <Link
                                  href={`/${item?.category_url}/${item?.permalink}`}
                                >
                                  <small>{item.guide_name}</small>
                                </Link>
                              </p>
                            </div>
                          </li>
                        );
                      })}
                </ul>
                {product?.guide_ratings.length > 5 && (
                  <Button
                    className="see_all_btn"
                    // onClick={() => {
                    //   showFullRanking = !showFullRanking;
                    // }}
                  >
                    See All <i className="ri-arrow-down-s-line"></i>
                  </Button>
                )}
              </div>
            </Col>

            {product?.available_colors?.length !== 0 && (
              <Col lg={12} md={12} xl={12}>
                <div className="alternatives mt-4">
                  <span>Colors available:</span>
                  <Form className="color-section">
                    {product?.available_colors?.map((data, key) => {
                      return (
                        <>
                          <div className="color-item" key={key}>
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
              </Col>
            )}
            {/* {console.log(product,"neet")} */}
            {/* {console.log(product?.available_versions, "hllo")} */}

            {product?.available_versions &&
              product?.available_versions?.length !== 0 && (
                <Col lg={12} md={12} xl={12}>
                  <div className="alternatives mt-2">
                    <span>Available versions:</span>
                    <di className="color-section">
                      {product?.available_versions?.map((data, key) => {
                        const isCurrentVersion = data.permalink === slug;
                        return (
                          <>
                            <div className="color-item" key={key}>
                              {isCurrentVersion ? (
                                <li
                                  style={{
                                    listStyleType: "none",
                                    width: "auto",
                                    padding: "0px 5px",

                                    border: isCurrentVersion
                                      ? "1px solid #437ece"
                                      : "none",
                                    cursor: isCurrentVersion
                                      ? "default"
                                      : "pointer",
                                  }}
                                  className={`color-item ${
                                    selectedItem === key ? "selected" : ""
                                  }`}
                                  key={key}
                                  onClick={() =>
                                    !isCurrentVersion && handleItemClick(key)
                                  }
                                >
                                  {" "}
                                  {data.short_name}
                                </li>
                              ) : (
                                <li
                                  style={{
                                    listStyleType: "none",
                                    width: "auto",
                                    padding: "0px 5px",

                                    border: isCurrentVersion
                                      ? "1px solid red"
                                      : "none",
                                    cursor: isCurrentVersion
                                      ? "default"
                                      : "pointer",
                                  }}
                                >
                                  <Link
                                    href={`/${data?.category_url}/${data?.permalink}`}
                                    style={{
                                      color: "#437ed0",
                                      padding: "0px 5px",
                                      cursor: "pointer",
                                    }}
                                    className={`color-item ${
                                      selectedItem === key ? "selected" : ""
                                    }`}
                                    onClick={(e) => handleItemClick(key)}
                                  >
                                    {data.short_name}
                                  </Link>
                                </li>
                              )}

                              {/* <Form.Check
                                inline
                                label={data?.short_name}
                                name="color"
                                type="radio"
                                defaultChecked={key === 0}
                                id={`inline-${data?.color}-${key}`}
                              /> */}
                            </div>
                          </>
                        );
                      })}
                    </di>
                  </div>
                </Col>
              )}
          </Row>
        </Container>
      </section>
      <section className="my-4">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Technical Specifications</h2>
            </Col>
            <Col md={12} xs={12}>
              <Row className="m-0 technical-specifications">
                {product && (
                  <TechnicalAccordion
                    product={product}
                    overallScoreColor={overallScoreColor}
                    initialDisplay={initialDisplay}
                  />
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">{product?.name}</h2>
            </Col>
          </Row>
          <WhyAccordionTab product={product} slug={slug} />
        </Container>
      </section>
      <CompareDropDown
        attributeDropDown={[...productCatAttributes?.data].reverse()}
        pageType="product"
        product={product}
        slug={slug}
      />

      <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Who is it For</h2>
            </Col>
            <Col md={6}>
              <div className="pros-corns-section pros">
                <div className="pros-header">
                  Who SHOULD BUY {product?.name}?
                </div>
                {product?.should_buy.length === 0 && (
                  <h3 className="no-data text-center mt-2">No data Found</h3>
                )}
                {/* {console.log(product?.should_not_buy)} */}
                <ul>
                  {product &&
                    product?.should_buy?.map((item, index) => {
                      return (
                        <>
                          <li
                            key={index}
                            style={{ color: "rgba(39, 48, 78, 0.7)" }}
                          >
                            {item}
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="pros-corns-section corns">
                <div className="pros-header">
                  Who SHOULD NOT BUY {product?.name}?
                </div>
                {product?.should_not_buy.length === 0 && (
                  <h3 className="no-data text-center mt-2">No data Found</h3>
                )}
                <ul className="cross">
                  {product &&
                    product?.should_not_buy?.map((item, index) => {
                      return (
                        <>
                          <li
                            key={index}
                            style={{ color: "rgba(39, 48, 78, 0.7)" }}
                          >
                            {item}
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* {console.log(product?.text_part !== "")} */}

      <section className="ptb-80">
        <Container>
          {product?.text_part !== "" && (
            <>
              {" "}
              <Row>
                <Col md={12}>
                  <h2 className="site-main-heading">
                    Review of {product?.name}
                  </h2>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={4} lg={2}>
                  <div className="outline-section">
                    <p>Outline</p>
                    <OutlineGenerator
                      blogData={product?.text_part}
                      currentIndexId={activeOutlineId}
                    />
                    {/* <ol>
                  <li>Overall</li>
                  <li>Technical</li>
                  <li>VS Average</li>
                  <li className="outline-active">
                    Review
                    <ol>
                      <li>Subtile</li>
                      <li>Subtile</li>
                    </ol>
                  </li>
                  <li>Pros/Cons</li>
                </ol> */}
                  </div>
                </Col>
                <Col md={8} lg={8}>
                  <div
                    id="shortCodeText"
                    ref={contentRef}
                    className="review-content"
                    dangerouslySetInnerHTML={{
                      __html: searchForPatternAndReplace(contentWithIds),
                    }}
                  />
                  <Row className="mt-3">
                    <Col md={12} lg={6}>
                      <div className="best-price-section mobile-best-price-section">
                        <h3 className="site-main-heading">Best Prices</h3>
                        <ul className="best-list-item">
                          {product &&
                            product?.price_websites
                              .slice(0, showFullPrice ? 8 : 4)
                              .map((item, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      rel="noopener noreferrer"
                                      target="_blank"
                                      href={`/link?p=${btoa(item.url)}`}
                                    >
                                      <img
                                        src={item?.logo}
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        alt=""
                                      />
                                    </Link>
                                    <span>
                                      <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href={`/link?p=${btoa(item.url)}`}
                                      >
                                        {item?.price} €
                                      </a>
                                    </span>
                                  </li>
                                );
                              })}
                        </ul>
                        {product?.price_websites.length > 5 && (
                          <Button className="see_all_btn">
                            See All <i className="ri-arrow-down-s-line"></i>
                          </Button>
                        )}
                      </div>
                    </Col>
                    <Col md={12} lg={6}>
                      <div className="best-price-section mobile-best-price-section ranking">
                        <h3 className="site-main-heading">Best Rankings</h3>
                        <ul className="best-list-item">
                          {product &&
                            product?.guide_ratings
                              .slice(0, showFullRanking ? 8 : 4)
                              .map((item, index) => {
                                return (
                                  <li key={index}>
                                    <div className="d-flex align-items-start gap-1">
                                      <img
                                        src="/images/double-arrow.png"
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        alt=""
                                      />
                                      {/* {console.log(item)} */}
                                      <p>
                                        N.{item.position} in{" "}
                                        <Link
                                          href={`/${item?.category_url}/${item?.permalink}`}
                                        >
                                          <small>{item.guide_name}</small>
                                        </Link>
                                      </p>
                                    </div>
                                  </li>
                                );
                              })}
                        </ul>
                        {product?.guide_ratings.length > 5 && (
                          <Button
                            className="see_all_btn"
                            // onClick={() => {
                            //   showFullRanking = !showFullRanking;
                            // }}
                          >
                            See All <i className="ri-arrow-down-s-line"></i>
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={12} lg={2}>
                  <div className="ranking-section">
                    <div className="site-main-heading">In Rankings</div>

                    {product &&
                      product?.guide_ratings.slice(0, 2).map((data, index) => {
                        return (
                          <div className="product-card card-mobile" key={index}>
                            <Link
                              className="product-link-cover"
                              href={`/${data?.category_url}/${data?.permalink}`}
                              style={{ color: "#326ebf" }}
                            ></Link>
                            <img
                              src={
                                data?.bannerImage === null
                                  ? "/images/nofound.png"
                                  : data?.bannerImage
                              }
                              width={0}
                              height={0}
                              sizes="100%"
                              alt=""
                            />
                            <span>{data?.guide_name}</span>
                          </div>
                        );
                      })}
                    {/* <Image
                        src="/images/p1.png"
                        width={0}
                        height={0}
                        sizes="100%"
                        alt="F"
                      />
                      <span>Best Monitors</span> */}

                    <ProductSlider className="slider-show" />
                  </div>
                </Col>
              </Row>
            </>
          )}

          <Row className="mt-5">
            <Col md={6}>
              <div className="pros-corns-section pros light-background">
                <h3 className="pros-header">Pros</h3>
                <ul>
                  {product &&
                    product?.top_pros?.map((data, key) => {
                      return (
                        <>
                          <li
                            key={key}
                            style={{ color: "rgba(39, 48, 78, 0.80)" }}
                          >
                            {data?.name} {renderValue(data)}
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="pros-corns-section corns light-background">
                <h3 className="pros-header">Cons</h3>
                <ul className="cross">
                  {product &&
                    product?.top_cons?.map((data, key) => {
                      return (
                        <>
                          <li
                            key={key}
                            style={{ color: "rgba(39, 48, 78, 0.80)" }}
                          >
                            {data?.name} {renderValue(data)}
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <ProductTabs />
      {/* <section className="ptb-80">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Reviews of Our Users</h2>
              <p className="no-review">No reviews yet.</p>
            </Col>
          </Row>
        </Container>
      </section> */}

      <section className="mt-3">
        <Container>
          <Row>
            <Col md={12}>
              {/* <h2 className="site-main-heading">Best Alternatives</h2> */}
              {/* <p>No Data Found</p> */}
              {product?.alternative_products?.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <h2 className="site-main-heading">{data?.heading}</h2>
                    {data?.alternative_products.length != 0 ? (
                      <ReviewSlider favSlider={data?.alternative_products} />
                    ) : (
                      <span className="text-center m-2">
                        No Alternative Products Found
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="table-section-mobile">
            <Col md={12}>
              <h2 className="site-main-heading pt-5">
                Comparing Samsung New VR Headset Oculus 2.0 with best robot
                vacuum cleaners
              </h2>
              <ProductCompareTable
                products={compareByCatID?.data}
                categoryAttributes={productCatAttributes?.data}
                slug={slug}
              />
            </Col>
            <Col md={12}></Col>
          </Row>
        </Container>
      </section>
      <section className="mt-3 ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Compare With Other Products</h2>
              <CompareForm
                location="ON_PRODUCT_PAGE"
                product_name={product}
                handelCloseCompareModel={() => {
                  // Add your close model logic here
                  console.log("Closing compare model");
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* {console.log(product?.alternative_comparisons)} */}
      {product?.alternative_comparisons?.length > 0 && (
        <section className="mt-3 mobile-popular-comparison">
          <Container>
            <Row>
              <Col md={12}>
                <h2 className="site-main-heading">Popular comparisons</h2>
                <ComparisonsSlider
                  products={product&&product?.alternative_comparisons}
                />
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}

export default ProductPage;
