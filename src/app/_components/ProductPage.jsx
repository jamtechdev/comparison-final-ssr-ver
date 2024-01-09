import { GetCompareId } from "@/components/Product/GetCompareId.jsx";
import React, { Fragment } from "react";
import {
  Row,
  Breadcrumb,
  Button,
  Col,
  Container,
  Form,
  Nav,
  Tab,
  Tabs,
} from "react-bootstrap";
import Link from "next/link";

// import ThumbSlider from "../../components/Common/ThumbSlider/ThumbSlider";
// import Compare from "../../components/Common/Compare/Compare";
import ReviewSlider from "../../components/Common/ReviewSlider/reviewSlider";
// import ComparisonsSlider from "../../components/Common/ComparisonsSlider/comparisonsSlider";
// import BreadCrumb from "../../components/Common/BreadCrumb/breadcrum";
import MobileAccordion from "../../components/Common/MobileAccordion/mobileAccordion";
// import ProductSlider from "../../components/Common/ProductSlider/productSlider";
// import ProductCompareTable from "../../components/Common/CompareTable/ProductCompareTable";
import {
  capitalize,
  getAttributeHalf,
  removeDecimalAboveNine,
} from "../../_helpers";
import Skeleton from "react-loading-skeleton";
import ThumbSlider from "@/components/Common/ThumbSlider/ThumbSlider";
import Image from "next/image";
import QuestionIcon from "@/components/Svg/QuestionIcon";
import ProductReviewTab from "@/components/Product/ProductReviewTab";
import WhyAccordionTab from "@/components/Product/WhyAccordionTab";
import TechnicalAccordion from "../../components/Product/TechnicalAccordion";
import CompareDropDown from "@/components/Product/CompareDropDown";
// import Link from "next/link";

function ProductPage({ productData }) {
  let initialDisplay = 5;
  // const [product, setProduct] = useState(null);
  // const [showFullPrice, setShowFullPrice] = useState(false);
  // const [showFullRanking, setShowFullRanking] = useState(false);
  // const [displayedAttributesCount, setDisplayedAttributesCount] = useState({});
  // const [loading, setloading] = useState(false);
  // const [tabvalue, setTabValue] = useState({ pros: "total", cons: "total" });
  // const [storeValue, setStoreValue] = useState("");
  // const [attributes, setAttributes] = useState([]);
  // const [getDataByCompareId, setCompareId] = useState(null);
  // const [categoryAttribute, setCategoryAttributes] = useState(null);

  const productsWithAttributeGroup = {};

  const productCopy = productData[0].data;

  const productAttributes = {};
  productData[0].data?.attributes?.forEach((attribute) => {
    // Extract the category name for the attribute
    const categoryName = attribute?.attribute_category?.name;
    // Check if the category name exists in the productAttributes object

    if (!productAttributes[categoryName]) {
      // If not, create an empty array for the category
      productAttributes[categoryName] = [];
    }
    // Push the current attribute to the array corresponding to its category
    productAttributes[categoryName]?.push(attribute);
  });

  productCopy["attributes"] = productAttributes;
  // Store the product copy with grouped attributes in the productsWithAttributeGroup object
  productsWithAttributeGroup[productData[0]?.data?.name] = productCopy;
  const finalProducts = Object?.values(productsWithAttributeGroup);
  let product = finalProducts[0];

  //  const compareByCatID = await productService?.getCompareProductByCatID(
  //    finalProducts[0]?.category_id
  //  );

  //  const categoryAttributes = await productService?.getCategoryAttributesById(
  //    finalProducts[0]?.category_id
  //  );

  //  setCategoryAttributes(categoryAttributes);
  //  setCompareId(compareByCatID);
  //  setProduct(finalProducts[0]);
  //  setStoreValue(data?.data?.data?.attributes[0].description);
  //  setAttributes(data?.data?.data?.attributes);

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
  let storeValue = "";
  let attributes = [];
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

  return (
    <>
      <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <Breadcrumb
                firstPageName="Electronics"
                secondPageName={product?.name}
              />
            </Col>
            <Col md={12} lg={12} xl={9}>
              <h1 className="site-main-heading">{product?.name}</h1>
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
                We’ve analyzed 24 784 user’s reviews and 45 technical data to
                find out if the Samsung New VR Headset Oculus 2.0 is worth
                buying. Let’s check the results!
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
              <div className="score-detail">
                <p>
                  Overall Score
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                    </svg>
                  </span>
                </p>
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
                    {resultOverallScore} (better than <i>58%</i>)
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
                <p>
                  Technical Score
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                    </svg>
                  </span>
                </p>
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
                  {resultTechnicalScoreColor} (better than <i>94%</i>)
                </small>
              </div>
            </div>
            <div className="score-section color-change score-section-2">
              <span className="count" style={{ backgroundColor: RatingColor }}>
                {product?.reviews}
              </span>
              <div className="score-detail">
                <p>
                  User’s Rating{" "}
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                    </svg>
                  </span>
                </p>
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
                  {resultUsersRatingColor} (better than <i>84%</i>)
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
                            <Image
                              // src="/images/amazon.png"
                              src={item?.logo}
                              width={0}
                              height={0}
                              sizes="100%"
                              alt=""
                            />
                            <span>{item?.price} €</span>
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
                          <li key={index}>
                            <p>
                              <img
                                src="/images/double-arrow.png"
                                width={0}
                                height={0}
                                sizes="100%"
                                alt=""
                              />
                              N.{item.position} in{" "}
                              <Link href={`/${item?.permalink}`}>
                                <small>{item.guide_name}</small>
                              </Link>
                            </p>
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
        </Container>
      </section>
      <section className="my-4">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Technical Specifications</h2>
            </Col>
            <Col md={12} xs={12}>
              <Row className="m-0">
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
          <WhyAccordionTab product={product} />
        </Container>
      </section>
      <CompareDropDown
        attributeDropDown={productCopy?.attributes}
        product={product?.name}
      />

      {/* <section className="ptb-80 bg-color">
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
                <ul className="cross">
                  {product &&
                    product?.should_not_buy?.map((item, index) => {
                      return (
                        <>
                          <li
                            key={index}
                            tyle={{ color: "rgba(39, 48, 78, 0.7)" }}
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
      </section> */}
      {/* {product?.text_part && (
        <section className="ptb-80">
          <Container>
            <Row>
              <Col md={12}>
                <h2 className="site-main-heading">Review of {product?.name}</h2>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={4} lg={2}>
                <div className="outline-section">
                  <p>Outline</p>
                  <ol>
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
                  </ol>
                </div>
              </Col>
              <Col md={8} lg={8}>
                <p className="review-content">
                  <br />
                  {product?.text_part}
                  <br />
                </p>
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
                                  <img
                                    // src="/images/amazon.png"
                                    src={item?.logo}
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    alt=""
                                  />
                                  <span>{item?.price} €</span>
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
                                  <p>
                                    <img
                                      src="/images/double-arrow.png"
                                      width={0}
                                      height={0}
                                      sizes="100%"
                                      alt=""
                                    />
                                    N.{item.position} in{" "}
                                    <Link href={`/${item?.permalink}`}>
                                      <small>{item.guide_name}</small>
                                    </Link>
                                  </p>
                                </li>
                              );
                            })}
                      </ul>
                      <Button className="see_all_btn">
                        See All <i className="ri-arrow-down-s-line"></i>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={2}>
                <div className="ranking-section">
                  <div className="site-main-heading">In Rankings</div>
                  <div className="product-card card-mobile">
                    <Image
                      src="/images/p1.png"
                      width={0}
                      height={0}
                      sizes="100%"
                      alt="F"
                    />
                    <span>Best Monitors</span>
                  </div>
                  <ProductSlider className="slider-show" />
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={6}>
                <div className="pros-corns-section pros light-background">
                  <h3 className="pros-header">Pros</h3>
                  <ul>
                    {product &&
                      product?.top_pros?.map((data, key) => {
                        return (
                          <>
                            <li key={key}>
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
                            <li key={key}>
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
      )} */}
      {/* Baad me Karna Hai */}
      {/* <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">3rd Party Reviews</h2>
            </Col>
            <Col md={12} className="site_tabs_hide">
              <ProductReviewTab />
            </Col>
            <Col md={12} className="">
              <MobileAccordion />
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* <section className="mt-3">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Best Alternatives</h2>
              <ReviewSlider />
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* <GetCompareId finalProducts={finalProducts} /> */}
    </>
  );
}

export default ProductPage;
