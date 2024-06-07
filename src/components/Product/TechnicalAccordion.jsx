"use client";
import React, { useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import QuestionIcon from "@/components/Svg/QuestionIcon";
import {
  capitalize,
  getAttributeProductHalf,
  removeDecimalAboveNine,
} from "../../_helpers";
import Questiontool from "../Svg/Questiontool";
import ProsConsToolTip from "../Svg/ProsConsToolTip";
import Skeleton from "react-loading-skeleton";
import Rating from "../Common/Rating/Rating";
import formatValue from "@/_helpers/formatValue";
import useScreenSize from "@/_helpers/useScreenSize";

const TechnicalAccordion = React.memo(
  ({ productPhaseData, product, overallScoreColor, initialDisplay }) => {
    // ... existing functions ...

    const { isMobile } = useScreenSize();

    const [loading, setloading] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({
      top: 0,
      left: 0,
    });
    const tooltipRef = useRef(null);
    const [displayedAttributesCount, setDisplayedAttributesCount] = useState(
      {}
    );
    const [expandedAttributes, setExpandedAttributes] = useState({}); // State to manage expanded attributes

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

    // Function to adjust the position of the tooltip to ensure it stays within the screen boundaries and is horizontally centered
    function adjustTooltipPosition() {
      const tooltip = tooltipRef.current;
      if (!tooltip) return;

      const tooltipRect = tooltip.getBoundingClientRect();

      const viewportWidth = document.documentElement.clientWidth;

      const tooltipWidth = tooltipRect.width;
      // (viewportWidth - tooltipWidth / 2 - tooltipWidth);

      // Calculate ideal left position for centered alignment
      const idealLeft = (viewportWidth - tooltipWidth) / 2;

      // Calculate the final left position to ensure the tooltip stays within the screen boundaries
      const left = Math.min(
        Math.max(0, idealLeft),
        viewportWidth - tooltipWidth / 2 - tooltipWidth
      );

      setTooltipPosition({ ...tooltipPosition, left });
    }

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

    const extractDomainName = (url) => {
      const domain = url
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .split(/[/?#]/)[0];
      return domain;
    };

    const [showFullData, setShowFullData] = useState(false);
    const toggleShowFullData = () => {
      setShowFullData(!showFullData);
    };

    const handleShowMore = (attribute) => {
      setExpandedAttributes((prev) => ({
        ...prev,
        [attribute]: !prev[attribute],
      }));
    };

    return (
      <>
        <Accordion className="table-accordion w-50 p-0 left-accordion">
          <Accordion.Item eventKey="4">
            <Accordion.Header as="div">
              <div className="table-accordion-header">
                {productPhaseData && productPhaseData?.overall}
              </div>
              <span className="count" style={{ background: overallScoreColor }}>
                {formatValue(product?.overall_score)}
              </span>
              <div className="show-btn">
                {productPhaseData && productPhaseData?.show_all}{" "}
                <i className="ri-arrow-down-s-line"></i>
              </div>
              <div className="hide-btn">
                {productPhaseData && productPhaseData?.hide_all}{" "}
                <i className="ri-arrow-up-s-line"></i>
              </div>
            </Accordion.Header>
            <Accordion.Body>{/* Existing content */}</Accordion.Body>
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
                          <Questiontool
                            attributes={
                              product.attributes[attribute][0]
                                ?.attribute_category
                            }
                            productPhaseData={productPhaseData}
                          />
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
                          {product?.attributes[attribute][0]
                            .attribute_evaluation === 10
                            ? 10
                            : product?.attributes[
                                attribute
                              ][0].attribute_evaluation.toFixed(1)}
                        </span>
                        <div className="show-btn" onClick={() => {}}>
                          {productPhaseData && productPhaseData?.show_all}{" "}
                          <i className="ri-arrow-down-s-line"></i>
                        </div>
                        <div className="hide-btn" onClick={() => {}}>
                          {productPhaseData && productPhaseData?.hide_all}{" "}
                          <i className="ri-arrow-up-s-line"></i>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        {loading == false ? (
                          product.attributes[attribute].map(
                            (attributeValues, valueIndex) => (
                              <React.Fragment key={valueIndex}>
                                <div
                                  className="spec-section"
                                  style={{
                                    display:
                                      expandedAttributes[attribute] ||
                                      valueIndex < 5
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <div className="spec-item">
                                    <div className="spec-col">
                                      <div className="query">
                                        {attributeValues?.attribute}
                                        <QuestionIcon
                                          attributes={
                                            attributeValues && attributeValues
                                          }
                                          productPhaseData={productPhaseData}
                                        />
                                      </div>
                                    </div>
                                    <div className="spec-col">
                                      <div className="spec-col d-flex gap-1">
                                        {attributeValues.attribute_value !=
                                          "yes" &&
                                          attributeValues.attribute_value !=
                                            "no" && (
                                            <>
                                              <div
                                                className={`${
                                                  attributeValues?.hover_phase !==
                                                  ""
                                                    ? "tooltip-title"
                                                    : ""
                                                }`}
                                                style={{
                                                  color:
                                                    attributeValues.is_better_than *
                                                      100 >=
                                                    70
                                                      ? "#437ece"
                                                      : attributeValues.is_worse_than *
                                                          100 >
                                                        70
                                                      ? "#ce434b"
                                                      : "#27304e",
                                                  fontSize: "15px",
                                                  textDecoration:
                                                    attributeValues?.hover_phase !==
                                                    ""
                                                      ? "underline"
                                                      : "",
                                                  textDecorationStyle:
                                                    attributeValues?.hover_phase !==
                                                    ""
                                                      ? "dotted"
                                                      : "",
                                                  textDecorationThickness:
                                                    "1.5px",
                                                  textDecorationColor:
                                                    attributeValues.is_better_than *
                                                      100 >=
                                                    70
                                                      ? "#437ece"
                                                      : attributeValues.is_worse_than *
                                                          100 >
                                                        70
                                                      ? "#ce434b"
                                                      : "#27304e",
                                                  textUnderlineOffset: "5px",
                                                }}
                                              >
                                                {
                                                  <span
                                                    style={{
                                                      color:
                                                        attributeValues.is_better_than *
                                                          100 >=
                                                        70
                                                          ? "#437ece"
                                                          : attributeValues.is_worse_than *
                                                              100 >
                                                            70
                                                          ? "#ce434b"
                                                          : "#27304e",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {(attributeValues.attribute_value !=
                                                    null
                                                      ? attributeValues.attribute_value
                                                      : "") +
                                                      " " +
                                                      (attributeValues.attribute_value ===
                                                        "?" ||
                                                      attributeValues.attribute_value ===
                                                        "-"
                                                        ? ""
                                                        : attributeValues.unit !=
                                                          null
                                                        ? attributeValues.unit
                                                        : "")}
                                                  </span>
                                                }

                                                {attributeValues.attribute_value !==
                                                  "?" && (
                                                  <ProsConsToolTip
                                                    comment={
                                                      attributeValues?.commnet
                                                    }
                                                    hover_phrase={
                                                      attributeValues &&
                                                      attributeValues.hover_phase
                                                    }
                                                  />
                                                )}
                                              </div>{" "}
                                              {attributeValues?.info_not_verified && (
                                                <div
                                                  className="tooltip-title"
                                                  style={{
                                                    textDecoration: "none",
                                                    textDecorationLine: "none",
                                                    textDecorationStyle: "none",
                                                  }}
                                                >
                                                  {" "}
                                                  <i style={{ opacity: "70%" }}>
                                                    {" "}
                                                    (?){" "}
                                                  </i>
                                                  <div className="tooltip-display-content">
                                                    Information is not verified.
                                                    If you believe this is a
                                                    mistake, please, contact our
                                                    team
                                                  </div>
                                                </div>
                                              )}
                                            </>
                                          )}

                                        {/* newww */}
                                        {(attributeValues.attribute_value ==
                                          "yes" ||
                                          attributeValues.attribute_value ==
                                            "no") && (
                                          <div
                                            className={`${
                                              attributeValues?.hover_phase !==
                                              ""
                                                ? "tooltip-title"
                                                : ""
                                            }`}
                                            style={{
                                              color:
                                                attributeValues.attribute_value ==
                                                  "yes" &&
                                                attributeValues.attribute_is_same_as *
                                                  100 <
                                                  40
                                                  ? "#0066b2"
                                                  : attributeValues.attribute_value ==
                                                      "no" &&
                                                    attributeValues.attribute_is_worse_than *
                                                      100 >
                                                      60
                                                  ? "red"
                                                  : "#27304e",
                                              fontSize: "15px",
                                              textDecoration:
                                                attributeValues?.hover_phase !==
                                                ""
                                                  ? "underline"
                                                  : "",
                                              textDecorationStyle:
                                                attributeValues?.hover_phase !==
                                                ""
                                                  ? "dotted"
                                                  : "",
                                              textDecorationThickness: "1.5px",
                                              textDecorationColor:
                                                attributeValues.attribute_value ==
                                                  "yes" &&
                                                // here I change attribute_is_better_than to attribute_is_same_as
                                                attributeValues.attribute_is_same_as *
                                                  100 <
                                                  40
                                                  ? "#0066b2"
                                                  : attributeValues.attribute_value ==
                                                      "no" &&
                                                    attributeValues.attribute_is_worse_than *
                                                      100 >
                                                      60
                                                  ? "red"
                                                  : "#27304e",
                                              textUnderlineOffset: "5px",
                                            }}
                                          >
                                            {/* here we use attribute_is_same_as and attribute_is_worse_than  */}
                                            {
                                              <span
                                                style={{
                                                  color:
                                                    attributeValues.attribute_value ==
                                                      "yes" &&
                                                    attributeValues.attribute_is_same_as *
                                                      100 <
                                                      40
                                                      ? "#0066b2"
                                                      : attributeValues.attribute_value ==
                                                          "no" &&
                                                        attributeValues.attribute_is_worse_than *
                                                          100 >
                                                          60
                                                      ? "red"
                                                      : "#27304e",
                                                }}
                                              >
                                                {(attributeValues.attribute_value !=
                                                null
                                                  ? attributeValues.attribute_value
                                                  : "") +
                                                  " " +
                                                  (attributeValues.attribute_value ===
                                                    "?" ||
                                                  attributeValues.attribute_value ===
                                                    "-"
                                                    ? ""
                                                    : attributeValues.unit !=
                                                      null
                                                    ? attributeValues.unit
                                                    : "")}
                                              </span>
                                            }
                                            {/* here we use attributeValues.is_better_than and  attributeValues.is_worse_than  */}
                                            <ProsConsToolTip
                                              hover_phrase={
                                                attributeValues &&
                                                attributeValues.hover_phase
                                              }
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </React.Fragment>
                            )
                          )
                        ) : (
                          <Skeleton
                            height={35}
                            count={
                              displayedAttributesCount[product.name] &&
                              displayedAttributesCount[product.name][attribute]
                                ? displayedAttributesCount[product.name][
                                    attribute
                                  ]
                                : initialDisplay
                            }
                          />
                        )}
                        {loading == false
                          ? product.attributes[attribute].length >
                              (displayedAttributesCount[product.name] &&
                              displayedAttributesCount[product.name][attribute]
                                ? displayedAttributesCount[product.name][
                                    attribute
                                  ]
                                : initialDisplay) &&
                            !expandedAttributes[attribute] && (
                              <span
                                className="show_more"
                                onClick={() => handleShowMore(attribute)}
                              >
                                {productPhaseData && productPhaseData?.show_all}
                                <i
                                  className={`ri-${
                                    expandedAttributes[attribute]
                                      ? "subtract"
                                      : "add"
                                  }-line`}
                                ></i>
                              </span>
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
          {Object.keys(getAttributeProductHalf(product, "second")).map(
            (attribute, index) => {
              return (
                <React.Fragment key={index}>
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header as="div">
                      <div className="table-accordion-header">
                        {attribute}
                        <Questiontool
                          attributes={
                            product.attributes[attribute][0]?.attribute_category
                          }
                          productPhaseData={productPhaseData}
                        />
                      </div>
                      <span
                        className="count"
                        style={{
                          background:
                            product.attributes[attribute][0]
                              .attribute_evaluation >= 7.5
                              ? "#093673"
                              : product.attributes[attribute][0]
                                  .attribute_evaluation >= 5 &&
                                product.attributes[attribute][0]
                                  .attribute_evaluation < 7.5
                              ? "#437ECE"
                              : "#85B2F1",
                        }}
                      >
                        {product?.attributes[attribute][0]
                          .attribute_evaluation === 10
                          ? 10
                          : product?.attributes[
                              attribute
                            ][0].attribute_evaluation.toFixed(1)}
                      </span>
                      <div className="show-btn">
                        {productPhaseData && productPhaseData?.show_all}{" "}
                        <i className="ri-arrow-down-s-line"></i>
                      </div>
                      <div className="hide-btn">
                        {productPhaseData && productPhaseData?.hide_all}{" "}
                        <i className="ri-arrow-up-s-line"></i>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      {loading == false ? (
                        product.attributes[attribute].map(
                          (attributeValues, valueIndex) => (
                            <React.Fragment key={valueIndex}>
                              <div
                                className="spec-section"
                                key={valueIndex}
                                style={{
                                  display:
                                    expandedAttributes[attribute] ||
                                    valueIndex < 5
                                      ? "block"
                                      : "none",
                                }}
                              >
                                <div className="spec-item">
                                  <div className="spec-col">
                                    <div className="query">
                                      {attributeValues?.attribute}

                                      <QuestionIcon
                                        attributes={
                                          attributeValues && attributeValues
                                        }
                                        productPhaseData={productPhaseData}
                                      />
                                    </div>
                                  </div>
                                  <div className="spec-col ">
                                    <div className="spec-col">
                                      {attributeValues.attribute_value !=
                                        "yes" &&
                                        attributeValues.attribute_value !=
                                          "no" && (
                                          <>
                                            <div
                                              className={`${
                                                attributeValues.attribute_value !==
                                                  "?" &&
                                                !attributeValues.attribute_value.includes(
                                                  "-"
                                                ) &&
                                                attributeValues.hover_phase !==
                                                  "" &&
                                                "tooltip-title"
                                              }`}
                                              style={{
                                                color:
                                                  attributeValues.is_better_than *
                                                    100 >=
                                                  70
                                                    ? "#437ece"
                                                    : attributeValues.is_worse_than *
                                                        100 >
                                                      70
                                                    ? "#ce434b"
                                                    : "#27304e",
                                                fontSize: "15px",
                                                textDecoration:
                                                  attributeValues.attribute_value !==
                                                    "?" &&
                                                  attributeValues?.hover_phase !==
                                                    ""
                                                    ? "underline"
                                                    : "",
                                                textDecorationStyle:
                                                  attributeValues.attribute_value !==
                                                    "?" &&
                                                  attributeValues?.hover_phase !==
                                                    ""
                                                    ? "dotted"
                                                    : "",
                                                textDecorationThickness:
                                                  "1.5px",
                                                textDecorationColor:
                                                  attributeValues.is_better_than *
                                                    100 >=
                                                  70
                                                    ? "#437ece"
                                                    : attributeValues.is_worse_than *
                                                        100 >
                                                      70
                                                    ? "#ce434b"
                                                    : "#27304e",
                                                textUnderlineOffset: "5px",
                                              }}
                                            >
                                              {
                                                <span
                                                  style={{
                                                    color:
                                                      attributeValues.is_better_than *
                                                        100 >=
                                                      70
                                                        ? "#437ece"
                                                        : attributeValues.is_worse_than *
                                                            100 >
                                                          70
                                                        ? "#ce434b"
                                                        : "#27304e",
                                                    fontSize: "15px",
                                                  }}
                                                >
                                                  {(attributeValues.attribute_value !=
                                                  null
                                                    ? attributeValues.attribute_value
                                                    : "") +
                                                    " " +
                                                    (attributeValues.attribute_value ===
                                                      "?" ||
                                                    attributeValues.attribute_value ===
                                                      "-"
                                                      ? ""
                                                      : attributeValues.unit !=
                                                        null
                                                      ? attributeValues.unit
                                                      : "")}
                                                </span>
                                              }

                                              {attributeValues.attribute_value !==
                                                "?" && (
                                                <ProsConsToolTip
                                                  comment={
                                                    attributeValues?.comment
                                                  }
                                                  hover_phrase={
                                                    attributeValues &&
                                                    attributeValues.hover_phase
                                                  }
                                                  info_not_verified={
                                                    attributeValues &&
                                                    attributeValues?.info_not_verified
                                                  }
                                                  info_not_verified_text={
                                                    attributeValues &&
                                                    attributeValues?.info_not_verified_text
                                                  }
                                                />
                                              )}
                                            </div>{" "}
                                            {attributeValues?.info_not_verified && (
                                              <div
                                                className="tooltip-title"
                                                style={{
                                                  textDecoration: "none",
                                                  textDecorationLine: "none",
                                                  textDecorationStyle: "none",
                                                }}
                                              >
                                                {" "}
                                                <i style={{ opacity: "70%" }}>
                                                  {" "}
                                                  (?){" "}
                                                </i>
                                                <div
                                                  className="tooltip-display-content"
                                                  style={{
                                                    left: isMobile ? "50%" : 0,
                                                    transform: isMobile
                                                      ? "translateX(-20%)"
                                                      : "translateX(-10%)",
                                                    width: isMobile
                                                      ? "200px"
                                                      : "250px",
                                                    opacity: "100%",
                                                  }}
                                                >
                                                  {
                                                    attributeValues?.info_not_verified_text
                                                  }
                                                  {
                                                    attributeValues?.info_not_verified_text
                                                  }
                                                </div>
                                              </div>
                                            )}
                                          </>
                                        )}

                                      {/* newww */}
                                      {(attributeValues.attribute_value ==
                                        "yes" ||
                                        attributeValues.attribute_value ==
                                          "no") && (
                                        <div
                                          className={`${
                                            attributeValues?.hover_phase !== ""
                                              ? "tooltip-title"
                                              : ""
                                          }`}
                                          style={{
                                            color:
                                              attributeValues.attribute_value ==
                                                "yes" &&
                                              attributeValues.attribute_is_same_as *
                                                100 <
                                                40
                                                ? "#0066b2"
                                                : attributeValues.attribute_value ==
                                                    "no" &&
                                                  attributeValues.attribute_is_worse_than *
                                                    100 >
                                                    60
                                                ? "red"
                                                : "#27304e",
                                            fontSize: "15px",
                                            textDecoration:
                                              attributeValues?.hover_phase !==
                                              ""
                                                ? "underline"
                                                : "",
                                            textDecorationStyle:
                                              attributeValues?.hover_phase !==
                                              ""
                                                ? "dotted"
                                                : "",
                                            textDecorationThickness: "1.5px",
                                            textDecorationColor:
                                              attributeValues.attribute_value ==
                                                "yes" &&
                                              // here I change attribute_is_better_than to attribute_is_same_as
                                              attributeValues.attribute_is_same_as *
                                                100 <
                                                40
                                                ? "#0066b2"
                                                : attributeValues.attribute_value ==
                                                    "no" &&
                                                  attributeValues.attribute_is_worse_than *
                                                    100 >
                                                    60
                                                ? "red"
                                                : "#27304e",
                                            textUnderlineOffset: "5px",
                                          }}
                                        >
                                          {/* here we use attribute_is_same_as and attribute_is_worse_than  */}
                                          {
                                            <span
                                              style={{
                                                color:
                                                  attributeValues.attribute_value ==
                                                    "yes" &&
                                                  attributeValues.attribute_is_same_as *
                                                    100 <
                                                    40
                                                    ? "#0066b2"
                                                    : attributeValues.attribute_value ==
                                                        "no" &&
                                                      attributeValues.attribute_is_worse_than *
                                                        100 >
                                                        60
                                                    ? "red"
                                                    : "#27304e",
                                              }}
                                            >
                                              {(attributeValues.attribute_value !=
                                              null
                                                ? attributeValues.attribute_value
                                                : "") +
                                                " " +
                                                (attributeValues.attribute_value ===
                                                  "?" ||
                                                attributeValues.attribute_value ===
                                                  "-"
                                                  ? ""
                                                  : attributeValues.unit != null
                                                  ? attributeValues.unit
                                                  : "")}
                                            </span>
                                          }
                                          {/* here we use attributeValues.is_better_than and  attributeValues.is_worse_than  */}
                                          <ProsConsToolTip
                                            hover_phrase={
                                              attributeValues &&
                                              attributeValues.hover_phase
                                            }
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          )
                        )
                      ) : (
                        <Skeleton
                          height={35}
                          count={
                            displayedAttributesCount[product.name] &&
                            displayedAttributesCount[product.name][attribute]
                              ? displayedAttributesCount[product.name][
                                  attribute
                                ]
                              : initialDisplay
                          }
                        />
                      )}
                      {loading == false
                        ? product.attributes[attribute].length >
                            (displayedAttributesCount[product.name] &&
                            displayedAttributesCount[product.name][attribute]
                              ? displayedAttributesCount[product.name][
                                  attribute
                                ]
                              : initialDisplay) &&
                          !expandedAttributes[attribute] && (
                            <span
                              className="show_more"
                              onClick={() => handleShowMore(attribute)}
                            >
                              {productPhaseData && productPhaseData?.show_all}
                              <i
                                className={`ri-${
                                  expandedAttributes[attribute]
                                    ? "subtract"
                                    : "add"
                                }-line`}
                              ></i>
                            </span>
                          )
                        : ""}
                    </Accordion.Body>
                  </Accordion.Item>
                </React.Fragment>
              );
            }
          )}
        </Accordion>
      </>
    );
  }
);

export default TechnicalAccordion;
