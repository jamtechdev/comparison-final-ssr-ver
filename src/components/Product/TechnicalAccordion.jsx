"use client";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import QuestionIcon from "@/components/Svg/QuestionIcon";
import {
  capitalize,
  getAttributeProductHalf,
  removeDecimalAboveNine,
} from "../../_helpers";

const TechnicalAccordion = React.memo(
  ({ product, overallScoreColor, initialDisplay }) => {
    const [loading, setloading] = useState(false);
    const [displayedAttributesCount, setDisplayedAttributesCount] = useState(
      {}
    );
    const handleDisplayedAttributesCount = (productName, attrName) => {
      let obj = { ...displayedAttributesCount };
      if (!obj[productName]) {
        obj[productName] = {};
      }
      if (!obj[productName][attrName]) {
        obj[productName][attrName] = 5;
      }
      let updatedPage =
        obj[productName][attrName] + initialDisplay || initialDisplay * 2;

      setDisplayedAttributesCount({
        [productName]: { [attrName]: updatedPage },
      });
    };

    return (
      <>
        <Accordion className="table-accordion w-50 p-0 left-accordion">
          <Accordion.Item eventKey="4">
            <Accordion.Body>
              {product?.technical_score ? (
                <div className="spec-section">
                  {
                    <div className="spec-item">
                      <>
                        <div className="spec-col">
                          <div className="query">
                            Technical Score
                            <QuestionIcon />
                          </div>
                        </div>
                        <div className="spec-col">
                          <span className="success-text">
                            <b>{product?.technical_score}</b>
                          </span>
                        </div>
                      </>
                    </div>
                  }
                </div>
              ) : (
                ""
              )}

              <div className="spec-section">
                {product?.reviews && (
                  <div className="spec-item">
                    <div className="spec-col">
                      <div className="query">
                        User&rsquo;s Rating
                        <QuestionIcon />
                      </div>
                    </div>
                    <div className="spec-col ">
                      <span>{product?.reviews}</span>
                    </div>
                  </div>
                )}
              </div>
              {product?.expert_reviews_rating > 0 ? (
                <div className="spec-section">
                  <div className="spec-item">
                    <div className="spec-col">
                      <div className="query text-ellipse">
                        Expert reviews
                        <QuestionIcon />
                      </div>
                    </div>
                    <div className="spec-col">
                      <span>
                        <b>{product?.expert_reviews_rating}</b>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {product?.ratio_quality_price_points && (
                <div className="spec-section">
                  <div className="spec-item">
                    <div className="spec-col">
                      <div className="query">
                        Ratio Quality-Price
                        <QuestionIcon />
                      </div>
                    </div>
                    <div className="spec-col ">
                      <span>{product?.ratio_quality_price_points}</span>
                    </div>
                  </div>
                </div>
              )}

              {product?.popularity_points && (
                <div className="spec-section">
                  <div className="spec-item">
                    <div className="spec-col">
                      <div className="query text-ellipse">
                        Popularity
                        <QuestionIcon />
                      </div>
                    </div>
                    <div className="spec-col">
                      <span>{product?.popularity_points}</span>
                    </div>
                  </div>
                </div>
              )}

              {product?.moreData && product?.moreData.length >= 5 && (
                <span className="show_more">
                  SHOW MORE <i className="ri-add-line"></i>
                </span>
              )}
            </Accordion.Body>
          </Accordion.Item>
          {product &&
            getAttributeProductHalf(product, "first") &&
            Object.keys(getAttributeProductHalf(product, "first")).map(
              (attribute, index) => {
                return (
                  <div key={index}>
                    <Accordion.Item eventKey={index} key={index}>
                      <Accordion.Header as="div">
                        <div className="table-accordion-header">
                          {attribute}
                        </div>
                        <span
                          className="count dark-color"
                          style={{
                            background:
                              product?.attributes[attribute][0]
                                .attribute_evaluation >= 7.5
                                ? "#093673"
                                : product?.attributes[attribute][0]
                                    .attribute_evaluation >= 5 &&
                                  product?.attributes[attribute][0]
                                    .attribute_evaluation < 7.5
                                ? "#437ECE"
                                : "#85B2F1",
                          }}
                        >
                          {parseInt(
                            product?.attributes[attribute][0]
                              .attribute_evaluation
                          ).toFixed(1)}
                        </span>
                        <div className="show-btn" onClick={() => {}}>
                          Show All <i className="ri-arrow-down-s-line"></i>
                        </div>
                        <div className="hide-btn" onClick={() => {}}>
                          Hide All <i className="ri-arrow-up-s-line"></i>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        {loading == false ? (
                          product?.attributes[attribute]
                            .slice(
                              0,
                              displayedAttributesCount[product?.name] &&
                                displayedAttributesCount[product?.name][
                                  attribute
                                ]
                                ? displayedAttributesCount[product?.name][
                                    attribute
                                  ]
                                : initialDisplay
                            )
                            .map((attributeValues, valueIndex) => {
                              return (
                                <div key={valueIndex}>
                                  <div
                                    className="spec-section"
                                    key={valueIndex}
                                  >
                                    <div className="spec-item">
                                      <div className="spec-col">
                                        <div className="query">
                                          {attributeValues.attribute}
                                          <QuestionIcon />
                                        </div>
                                      </div>
                                      <div className="spec-col">
                                        <span className="success-text">
                                          <b>
                                            {capitalize(
                                              attributeValues.attribute_value
                                            )}
                                          </b>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                        ) : (
                          <Skeleton
                            height={35}
                            count={
                              displayedAttributesCount[product?.name] &&
                              displayedAttributesCount[product?.name][attribute]
                                ? displayedAttributesCount[product?.name][
                                    attribute
                                  ]
                                : initialDisplay
                            }
                          />
                        )}

                        {loading == false
                          ? product?.attributes[attribute].length >
                              (displayedAttributesCount[product?.name] &&
                              displayedAttributesCount[product?.name][attribute]
                                ? displayedAttributesCount[product?.name][
                                    attribute
                                  ]
                                : initialDisplay) && (
                              <div
                                className="text-center"
                                style={{ cursor: "pointer" }}
                              >
                                <span
                                  className="show_more"
                                  onClick={() => {
                                    // setloading(true),
                                    // setattrname(attribute + Math.random())
                                    handleDisplayedAttributesCount(
                                      product?.name,
                                      attribute
                                    );
                                    // setIndex(index)
                                    setTimeout(() => {
                                      setloading(false);
                                    }, 600);
                                  }}
                                >
                                  {"SHOW MORE "}
                                  <i
                                    className={`ri-${
                                      initialDisplay <
                                      product?.attributes[attribute].length
                                        ? "add"
                                        : "subtract"
                                    }-line`}
                                  ></i>
                                </span>
                              </div>
                            )
                          : ""}
                      </Accordion.Body>
                    </Accordion.Item>
                  </div>
                );
              }
            )}
        </Accordion>

        <Accordion className="table-accordion w-50 p-0 right-accordion">
          {product &&
            getAttributeProductHalf(product, "second") &&
            Object.keys(getAttributeProductHalf(product, "second")).map(
              (attribute, index) => {
                return (
                  <div key={index}>
                    <Accordion.Item eventKey={index} key={index}>
                      <Accordion.Header as="div">
                        <div className="table-accordion-header">
                          {attribute && attribute}
                        </div>

                        <span
                          className="count"
                          style={{
                            background:
                              product?.attributes[attribute][0]
                                .attribute_evaluation >= 7.5
                                ? "#093673"
                                : product?.attributes[attribute][0]
                                    .attribute_evaluation >= 5 &&
                                  product?.attributes[attribute][0]
                                    .attribute_evaluation < 7.5
                                ? "#437ECE"
                                : "#85B2F1",
                          }}
                        >
                          {parseInt(
                            product?.attributes[attribute][0]
                              .attribute_evaluation
                          ).toFixed(1)}
                        </span>
                        <div className="show-btn">
                          Show All <i className="ri-arrow-down-s-line"></i>
                        </div>
                        <div className="hide-btn">
                          Hide All <i className="ri-arrow-up-s-line"></i>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        {loading == false ? (
                          product?.attributes[attribute]
                            .slice(
                              0,
                              displayedAttributesCount[product?.name] &&
                                displayedAttributesCount[product?.name][
                                  attribute
                                ]
                                ? displayedAttributesCount[product?.name][
                                    attribute
                                  ]
                                : initialDisplay
                            )
                            .map((attributeValues, valueIndex) => (
                              <div key={valueIndex}>
                                <div className="spec-section" key={valueIndex}>
                                  <div className="spec-item">
                                    <div className="spec-col">
                                      <div className="query">
                                        {attributeValues.attribute}
                                        <QuestionIcon />
                                      </div>
                                    </div>
                                    <div className="spec-col">
                                      <span className="success-text">
                                        {" "}
                                        <b>
                                          {capitalize(
                                            attributeValues.attribute_value
                                          )}
                                        </b>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : (
                          <Skeleton
                            height={35}
                            count={
                              displayedAttributesCount[product?.name] &&
                              displayedAttributesCount[product?.name][attribute]
                                ? displayedAttributesCount[product?.name][
                                    attribute
                                  ]
                                : initialDisplay
                            }
                          />
                        )}
                        {loading == false
                          ? product?.attributes[attribute].length >
                              (displayedAttributesCount[product?.name] &&
                              displayedAttributesCount[product?.name][attribute]
                                ? displayedAttributesCount[product?.name][
                                    attribute
                                  ]
                                : initialDisplay) && (
                              <div
                                className="text-center"
                                style={{ cursor: "pointer" }}
                              >
                                <span
                                  className="show_more"
                                  onClick={() => {
                                    // setloading(true),
                                    // setattrname(attribute + Math.random())
                                    handleDisplayedAttributesCount(
                                      product?.name,
                                      attribute
                                    );
                                    // setIndex(index)
                                    setTimeout(() => {
                                      setloading(false);
                                    }, 600);
                                  }}
                                >
                                  {"SHOW MORE "}
                                  <i
                                    className={`ri-${
                                      initialDisplay <
                                      product?.attributes[attribute].length
                                        ? "add"
                                        : "subtract"
                                    }-line`}
                                  ></i>
                                </span>
                              </div>
                            )
                          : ""}
                      </Accordion.Body>
                    </Accordion.Item>
                  </div>
                );
              }
            )}
        </Accordion>
      </>
    );
  }
);

export default TechnicalAccordion;
