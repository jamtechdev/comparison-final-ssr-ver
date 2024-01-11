"use client";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Accordion,
  Tab,
  Nav,
  Form,
  Button,
  Tabs,
} from "react-bootstrap";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import Image from "next/image";
import CompareModal from "@/components/Common/Comparison/CompareModal";
import ComparisonTable from "../CompareTable/ComparisonTable";
import WhyAccordionTab from "@/components/Product/WhyAccordionTab";
import CompareForm from "../Comparison/CompareForm";
// import ComparisonTable from "../CompareTable/ComparisonTable";

function CompareDiv({ comparisonData, categroyAttributes }) {
  const [compareProDataFirst, setCompareProDataFirst] = useState(
    comparisonData[0]?.data || ""
  );
  const [compareProDataSec, setCompareProDataSec] = useState(
    comparisonData[1]?.data || ""
  );
  const [compareProDataThird, setCompareProDataThird] = useState(
    comparisonData[3]?.data || ""
  );
  const handleRemoveClick = (id) => {
    if (id == 3) {
      setCompareProDataThird([]);
    } else if (id == 2) {
      setCompareProDataSec(compareProDataThird);
      setCompareProDataThird([]);
    } else {
      setCompareProDataFirst(compareProDataSec);
      setCompareProDataSec(compareProDataThird);
      setCompareProDataThird([]);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);
  const combinedArray = [
    compareProDataFirst,
    compareProDataSec,
    compareProDataThird,
  ];
  return (
    <>
      <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <BreadCrumb
                firstPageName="Iteck’s Store"
                secondPageName={`${compareProDataFirst?.name || ""} vs ${compareProDataSec?.name || ""
                  } ${compareProDataThird?.name
                    ? `vs ${compareProDataThird?.name}`
                    : ""
                  }`}
              />
            </Col>
            <Col md={12}>
              <h1 className="site-main-heading">
                {compareProDataFirst?.name} vs {compareProDataSec?.name}{" "}
                {compareProDataThird?.name && `vs ${compareProDataThird?.name}`}
              </h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col md={12} className="table-section-mobile">
              <div className="comparison-tool">
                <div className="comparison-wrapper">
                  {compareProDataFirst &&
                    compareProDataSec &&
                    compareProDataThird &&
                    compareProDataFirst.overall_score >
                    compareProDataSec.overall_score &&
                    compareProDataFirst.overall_score >
                    compareProDataThird?.overall_score && (
                      <div className="comparison-tag">Winner</div>
                    )}
                  {compareProDataFirst &&
                    compareProDataSec &&
                    compareProDataFirst.overall_score >
                    compareProDataSec.overall_score && (
                      <div className="comparison-tag">Winner</div>
                    )}
                  <div className="comparison-card">
                    <Image
                      src={
                        compareProDataFirst?.main_image
                          ? compareProDataFirst?.main_image
                          : "/images/nofound.png"
                      }
                      width={0}
                      height={0}
                      alt=""
                      sizes="100%"
                    />
                    <div className="comparison-card-footer">
                      <h2 className="product-title">
                        {compareProDataFirst?.name}
                      </h2>
                    </div>
                    <span
                      className="count"
                      style={{
                        background:
                          compareProDataFirst.overall_score >= 7.5
                            ? "#093673"
                            : compareProDataFirst.overall_score >= 5 &&
                              compareProDataFirst.overall_score < 7.5
                              ? "#437ECE"
                              : "#85B2F1",
                      }}
                    >
                      {compareProDataFirst?.overall_score}
                    </span>
                    <i
                      className="ri-close-circle-line close_icon"
                      onClick={() => handleRemoveClick(1)}
                    ></i>
                  </div>
                  <div className="comparison-product-spec">
                    {compareProDataFirst?.price_websites?.length > 0 ? (
                      <>
                        {compareProDataFirst?.price_websites?.map(
                          (item, index) => {
                            return item.price === 0 ? (
                              <></>
                            ) : (

                              <div
                                className="comparison-product-item"
                                key={index}
                              >
                                <Image
                                  src={item.logo}
                                  width={0}
                                  height={0}
                                  sizes="100%"
                                  alt=""
                                />
                                <span>{item.price} €</span>
                              </div>

                            );
                          }
                        )}
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="not-availabel">
                          <span className="txt">NOT AVAILABLE</span>
                          <span className="price">
                            ~ {compareProDataFirst?.price} €
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="comparison-vs-img">
                  <Image src="/images/vs.svg" width={118} height={40} alt="" />
                </div>
                {Object.keys(compareProDataSec).length === 0 ? (
                  <div className="comparison-wrapper">
                    <div
                      className="add-product"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    >
                      <div className="add-product-inner-content">
                        <Image
                          src="/images/add_icon.svg"
                          width={50}
                          height={50}
                          alt=""
                        />
                        <p>add a product to compare</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="comparison-wrapper">
                    {compareProDataFirst &&
                      compareProDataSec &&
                      compareProDataThird &&
                      compareProDataSec.overall_score >
                      compareProDataFirst.overall_score &&
                      compareProDataSec.overall_score >
                      compareProDataThird.overall_score && (
                        <div className="comparison-tag">Winner</div>
                      )}
                    {compareProDataFirst &&
                      compareProDataSec &&
                      compareProDataSec.overall_score >
                      compareProDataFirst.overall_score && (
                        <div className="comparison-tag">Winner</div>
                      )}
                    <div className="comparison-card">
                      <Image
                        src={
                          compareProDataSec?.main_image
                            ? compareProDataSec?.main_image
                            : "/images/nofound.png"
                        }
                        width={0}
                        height={0}
                        alt=""
                        sizes="100%"
                      />
                      <div className="comparison-card-footer">
                        <h2 className="product-title">
                          {compareProDataSec.name}
                        </h2>
                      </div>
                      <span
                        className="count"
                        style={{
                          background:
                            compareProDataSec.overall_score >= 7.5
                              ? "#093673"
                              : compareProDataSec.overall_score >= 5 &&
                                compareProDataSec.overall_score < 7.5
                                ? "#437ECE"
                                : "#85B2F1",
                        }}
                      >
                        {compareProDataSec?.overall_score}
                      </span>
                      <i
                        className="ri-close-circle-line close_icon"
                        onClick={() => handleRemoveClick(2)}
                      ></i>
                    </div>
                    <div className="comparison-product-spec">
                      {compareProDataSec?.price_websites?.length > 0 ? (
                        <>
                          {compareProDataSec?.price_websites?.map(
                            (item, index) => {
                              return item.price === 0 ? (
                                <></>
                              ) : (
                                <div
                                  className="comparison-product-item"
                                  key={index}
                                >
                                  <Image
                                    src={item.logo}
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    alt=""
                                  />
                                  <span>{item.price} €</span>
                                </div>
                              );
                            }
                          )}
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className="not-availabel">
                            <span className="txt">NOT AVAILABLE</span>
                            <span className="price">
                              ~ {compareProDataSec?.price} €
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="comparison-vs-img">
                  <Image src="/images/vs.svg" width={118} height={40} alt="" />
                </div>

                {Object.keys(compareProDataThird).length > 0 && (
                  <div className="comparison-wrapper">
                    {compareProDataFirst &&
                      compareProDataSec &&
                      compareProDataThird &&
                      compareProDataThird?.overall_score >
                      compareProDataSec?.overall_score &&
                      compareProDataThird?.overall_score >
                      compareProDataFirst?.overall_score && (
                        <div className="comparison-tag">Winner</div>
                      )}{" "}
                    <div className="comparison-card">
                      <Image
                        src={
                          compareProDataThird?.main_image
                            ? compareProDataThird?.main_image
                            : "/images/nofound.png"
                        }
                        width={0}
                        height={0}
                        alt=""
                        sizes="100%"
                      />
                      <div className="comparison-card-footer">
                        <h2 className="product-title">
                          {/* Samsung Galaxy S23 Ultra{" "} */}
                          {compareProDataThird?.name}
                        </h2>
                      </div>
                      <span
                        className="count"
                        style={{
                          background:
                            compareProDataThird.overall_score >= 7.5
                              ? "#093673"
                              : compareProDataThird.overall_score >= 5 &&
                                compareProDataThird.overall_score < 7.5
                                ? "#437ECE"
                                : "#85B2F1",
                        }}
                      >
                        {compareProDataThird.overall_score}
                      </span>
                      <i
                        className="ri-close-circle-line close_icon"
                        onClick={() => handleRemoveClick(3)}
                      ></i>
                    </div>
                    <div className="comparison-product-spec">
                      {compareProDataThird?.price_websites?.length > 0 ? (
                        <>
                          {compareProDataThird?.price_websites?.map(
                            (item, index) => {
                              return item.price === 0 ? (
                                <></>
                              ) : (
                                <div
                                  className="comparison-product-item"
                                  key={index}
                                >
                                  <Image
                                    src={item.logo}
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    alt=""
                                  />
                                  <span>{item.price} €</span>
                                </div>
                              );
                            }
                          )}
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className="not-availabel">
                            <span className="txt">NOT AVAILABLE</span>
                            <span className="price">
                              ~ {compareProDataThird?.price} €
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {Object.keys(compareProDataThird).length === 0 && (
                  <div className="comparison-wrapper">
                    <div
                      className="add-product"
                      onClick={() => {
                        setIsOpen(true)
                      }}
                    >
                      <div className="add-product-inner-content">
                        <Image
                          src="/images/add_icon.svg"
                          width={50}
                          height={50}
                          alt=""
                        />
                        <p>add a product to compare</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col md={12} className="table-section-desktop">
              {/* <MobileComparisonTool /> */}
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">
                {compareProDataFirst?.name} vs {compareProDataSec?.name}{" "}
              </h2>
            </Col>
          </Row>
          <WhyAccordionTab product={product} />
        </Container>
      </section> */}
      <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Graph Comparison</h2>
            </Col>
          </Row>
          <WhyAccordionTab
            product1={compareProDataFirst?.name}
            product2={compareProDataSec?.name}
            product={comparisonData[2]?.data}
            pageType={"comparison"}
          />
        </Container>
      </section>
      <section className="ptb-80">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Table Comparison</h2>
            </Col>
            <Col md={12} className="table-section-mobile">
              <ComparisonTable
                products={combinedArray}
                categoryAttributes={categroyAttributes}
              />
            </Col>
            {/* <Col md={12} className="table-section-desktop">
              isko baad me krna h hai
              <MobileCompareTable />
            </Col> */}
          </Row>
        </Container>
      </section>
      <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Compare Other Products</h2>
              <CompareForm />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="ptb-80">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">
                Comparison With All Other Vaccuum Cleaners
              </h2>
            </Col>
            <Col md={12}>
              <div className="filtered-data-select justify-content-start">
                <span>Compare:</span>
                <Form.Select aria-label="Default select example">
                  <option>Power</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4} lg={3}>
              <p className="text-end para_content_text">
                Power is since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. ever
                galley of type and scrambled it to make a type specimen book.
              </p>
            </Col>
            <Col md={8} lg={9}>
              <Image
                className="graph-bar"
                src="/images/graph-bar.png"
                width={0}
                height={0}
                alt=""
                sizes="100%"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {isOpen && (
        <CompareModal
          setIsOpen={setIsOpen}
          compareProDataFirst={{
            name: compareProDataFirst?.name,
            permalink: compareProDataFirst?.permalink,
            category_id: compareProDataFirst.category_id,
            category_url: compareProDataFirst.category_url,
          }}
          compareProDataSec={{
            name: compareProDataSec?.name,
            permalink: compareProDataSec?.permalink,
            category_id: compareProDataSec.category_url,
            category_url: compareProDataSec.category_url,
          }}
        />
      )}
    </>
  );
}

export default CompareDiv;
