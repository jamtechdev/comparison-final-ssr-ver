"use client";
import React, { useState } from "react";
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

const TechnicalAccordion = React.memo(
  ({ product, overallScoreColor, initialDisplay }) => {
    // This funcation doing when attributeValues yes or no change the color by is is_worse_than and is_better_than
    const getColorAttr = (attributeValues) => {
      if (
        attributeValues.attribute_value == "yes" ||
        attributeValues.attribute_value == "no"
      ) {
        if (attributeValues?.is_worse_than.toFixed(1) >= 0.6) {
          return "red";
        } else if (attributeValues?.is_better_than.toFixed(1) >= 0.6) {
          return "#0066b2";
        } else {
          return "#000";
        }
      } else {
        return "#000";
      }
    };

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
            <Accordion.Header as="div">
              <div className="table-accordion-header">OVERALL</div>
              <span className="count" style={{ background: overallScoreColor }}>
                {product?.overall_score}
              </span>
              <div className="show-btn">
                Show All <i className="ri-arrow-down-s-line"></i>
              </div>
              <div className="hide-btn">
                Hide All <i className="ri-arrow-up-s-line"></i>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="spec-section">
                <div className="spec-item">
                  <div className="spec-col">
                    <div className="query ranking-tooltip-title">
                      Technical Score
                      <div className="question_hover_container question-marker-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </div>
                      <div className="tooltip-display-content">
                        {product?.technical_score_descriptions.description && (
                          <p className="mb-2">
                            <b>What it is: </b>
                            {product?.technical_score_descriptions?.description}
                          </p>
                        )}
                        {product?.technical_score_descriptions.when_matters && (
                          <p className="mb-2">
                            <b>When it matters: </b>
                            {
                              product?.technical_score_descriptions
                                ?.when_matters
                            }
                          </p>
                        )}
                        <p>
                          <b>Score components:</b>
                        </p>
                        {product?.technical_score_descriptions
                          .score_components &&
                          product?.technical_score_descriptions.score_components?.map(
                            (data, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <div className="scroe_section" key={index}>
                                    <p className="text-end">
                                      {`${parseFloat(data?.importance).toFixed(
                                        1
                                      )}%`}
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
                                      {`${parseFloat(
                                        data?.attribute_evaluation
                                      ).toFixed(1)}`}
                                    </div>
                                    <p>{data?.attribute_category}</p>
                                  </div>
                                </React.Fragment>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="spec-col">
                    <span
                      className="tooltip-title"
                      style={{
                        color:
                          product.technical_score_is_better_than * 100 >= 70
                            ? "#437ece"
                            : product.technical_score_is_worse_than * 100 > 70
                            ? "#ce434b"
                            : "#27304e",
                        fontSize: "15px",
                        textDecoration: "underline",
                        textDecorationStyle: "dotted",
                        textDecorationThickness: "1.5px",
                        textDecorationColor:
                          product.technical_score_is_better_than * 100 >= 70
                            ? "#437ece"
                            : product.technical_score_is_worse_than * 100 > 70
                            ? "#ce434b"
                            : "#27304e",
                        textUnderlineOffset: "5px",
                      }}
                    >
                      {product.technical_score}
                      <ProsConsToolTip
                        hover_phrase={product.technical_score_phase}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="spec-section">
                <div className="spec-item">
                  <div className="spec-col">
                    <div className="query ranking-tooltip-title">
                      User&rsquo;s Rating
                      <div className="question_hover_container question-marker-icon" style={{boxShadow:"none"}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                        </svg>
                      </div>
                      <div className="tooltip-display-content">
                        {product?.users_rating_descriptions.description && (
                          <p className="mb-2">
                            <b>What it is: </b>
                            {product?.users_rating_descriptions?.description}
                          </p>
                        )}
                        {product?.users_rating_descriptions.when_matters && (
                          <p className="mb-2">
                            <b>When it matters: </b>
                            {product?.users_rating_descriptions?.when_matters}
                          </p>
                        )}
                        <p>
                          <b>Score components:</b>
                        </p>
                        {product?.users_rating_descriptions.score_components &&
                          product?.users_rating_descriptions.score_components?.map(
                            (data, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <div className="scroe_section" key={index}>
                                    <p className="text-end">
                                      {`${parseFloat(data?.importance).toFixed(
                                        1
                                      )}%`}
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
                                      {`${parseFloat(
                                        data?.attribute_evaluation
                                      ).toFixed(1)}`}
                                    </div>
                                    <p>{data?.attribute_category}</p>
                                  </div>
                                </React.Fragment>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="spec-col">
                    <span
                      className="tooltip-title"
                      style={{
                        color:
                          product.reviews_is_better_than * 100 >= 70
                            ? "#437ece"
                            : product.reviews_is_worse_than * 100 > 70
                            ? "#ce434b"
                            : "#27304e",
                        fontSize: "15px",
                        textDecoration: "underline",
                        textDecorationStyle: "dotted",
                        textDecorationThickness: "1.5px",
                        textDecorationColor:
                          product.reviews_is_better_than * 100 >= 70
                            ? "#437ece"
                            : product.reviews_is_worse_than * 100 > 70
                            ? "#ce434b"
                            : "#27304e",
                        textUnderlineOffset: "5px",
                      }}
                    >
                      {product.reviews}
                      <ProsConsToolTip hover_phrase={product.reviews_phase} />
                    </span>
                  </div>
                </div>
              </div>
              {product.expert_reviews_rating > 0 && (
                <div className="spec-section">
                  <div className="spec-item">
                    <div className="spec-col">
                      <div className="query text-ellipse ranking-tooltip-title">
                        Expert reviews
                        <QuestionIcon
                          attributes={product?.expert_reviews_descriptions}
                        />
                      </div>
                    </div>
                    <div className="spec-col">
                      <div
                        className="tooltip-title"
                        style={{
                          color:
                            product.expert_reviews_is_better_than * 100 >= 70
                              ? "#437ece"
                              : product.expert_reviews_is_worse_than * 100 > 70
                              ? "#ce434b"
                              : "#27304e",
                          fontSize: "15px",
                          textDecoration: "underline",
                          textDecorationStyle: "dotted",
                          textDecorationThickness: "1.5px",
                          textDecorationColor:
                            product.expert_reviews_is_better_than * 100 >= 70
                              ? "#437ece"
                              : product.expert_reviews_is_worse_than * 100 > 70
                              ? "#ce434b"
                              : "#27304e",
                          textUnderlineOffset: "5px",
                        }}
                      >
                        {product.expert_reviews_rating}
                        <ProsConsToolTip
                          hover_phrase={product.expert_reviews_rating_phase}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="spec-section">
                <div className="spec-item">
                  <div className="spec-col">
                    <div className="query">
                      Ratio Quality-Price
                      <QuestionIcon
                        attributes={product?.ratio_qulitiy_points_descriptions}
                      />
                    </div>
                  </div>
                  <div className="spec-col ">
                    <div
                      className="tooltip-title"
                      style={{
                        color:
                          product.ratio_quality_price_points_better_then *
                            100 >=
                          70
                            ? "#437ece"
                            : product.ratio_quality_price_points_worse_then *
                                100 >
                              70
                            ? "#ce434b"
                            : "#27304e",
                        fontSize: "15px",
                        textDecoration: "underline",
                        textDecorationStyle: "dotted",
                        textDecorationThickness: "1.5px",
                        textDecorationColor:
                          product.ratio_quality_price_points_better_then *
                            100 >=
                          70
                            ? "#437ece"
                            : product.ratio_quality_price_points_worse_then *
                                100 >
                              70
                            ? "#ce434b"
                            : "#27304e",
                        textUnderlineOffset: "5px",
                      }}
                    >
                      {product.ratio_quality_price_points}
                      <ProsConsToolTip
                        hover_phrase={product.ratio_quality_price_points_phase}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="spec-section">
                <div className="spec-item">
                  <div className="spec-col">
                    <div className="query text-ellipse">
                      Popularity
                      <QuestionIcon
                        attributes={product?.popularity_descriptions}
                      />
                    </div>
                  </div>
                  <div className="spec-col">
                    <div
                      className="tooltip-title"
                      style={{
                        color:
                          product.popularity_points_better_then * 100 >= 70
                            ? "#437ece"
                            : product.popularity_points_worse_then * 100 > 70
                            ? "#ce434b"
                            : "#27304e",
                        fontSize: "15px",
                        textDecoration: "underline",
                        textDecorationStyle: "dotted",
                        textDecorationThickness: "1.5px",
                        textDecorationColor:
                          product.popularity_points_better_then * 100 >= 70
                            ? "#437ece"
                            : product.popularity_points_worse_then * 100 > 70
                            ? "#ce434b"
                            : "#27304e",
                        textUnderlineOffset: "5px",
                      }}
                    >
                      {product.popularity_points}
                      <ProsConsToolTip
                        hover_phrase={product.popularity_points_phase}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
                          <Questiontool
                            attributes={
                              product.attributes[attribute][0]
                                ?.attribute_category
                            }
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
                          product.attributes[attribute]
                            .slice(
                              0,
                              displayedAttributesCount[product.name] &&
                                displayedAttributesCount[product.name][
                                  attribute
                                ]
                                ? displayedAttributesCount[product.name][
                                    attribute
                                  ]
                                : initialDisplay
                            )
                            .map((attributeValues, valueIndex) => (
                              <React.Fragment key={valueIndex}>
                                <div className="spec-section" key={valueIndex}>
                                  <div className="spec-item">
                                    <div className="spec-col">
                                      <div className="query">
                                        {attributeValues.attribute}
                                        <QuestionIcon
                                          attributes={
                                            attributeValues && attributeValues
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="spec-col">
                                      <div className="spec-col">
                                        {attributeValues.attribute_value !=
                                          "yes" &&
                                          attributeValues.attribute_value !=
                                            "no" && (
                                            <div
                                              className="tooltip-title"
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
                                                textDecoration: "underline",
                                                textDecorationStyle: "dotted",
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

                                              <ProsConsToolTip
                                                hover_phrase={
                                                  attributeValues &&
                                                  attributeValues.hover_phase
                                                }
                                              />
                                            </div>
                                          )}

                                        {/* newww */}
                                        {(attributeValues.attribute_value ==
                                          "yes" ||
                                          attributeValues.attribute_value ==
                                            "no") && (
                                          <div
                                            className="tooltip-title"
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
                                              textDecoration: "underline",
                                              textDecorationStyle: "dotted",
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
                            ))
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
                                : initialDisplay) && (
                              <span
                                className="show_more"
                                onClick={() => {
                                  setloading(true),
                                    handleDisplayedAttributesCount(
                                      product.name,
                                      attribute
                                    );
                                  setTimeout(() => {
                                    setloading(false);
                                  }, 600);
                                }}
                              >
                                {"SHOW MORE "}
                                <i
                                  className={`ri-${
                                    initialDisplay <
                                    product.attributes[attribute].length
                                      ? "add"
                                      : "subtract"
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
                        {product.attributes[attribute][0]
                          .attribute_evaluation != null
                          ? parseInt(
                              product.attributes[attribute][0]
                                .attribute_evaluation
                            ).toFixed(1)
                          : "0.0"}
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
                        product.attributes[attribute]
                          .slice(
                            0,
                            displayedAttributesCount[product.name] &&
                              displayedAttributesCount[product.name][attribute]
                              ? displayedAttributesCount[product.name][
                                  attribute
                                ]
                              : initialDisplay
                          )
                          .map((attributeValues, valueIndex) => (
                            <React.Fragment key={valueIndex}>
                              <div className="spec-section" key={valueIndex}>
                                <div className="spec-item">
                                  <div className="spec-col">
                                    <div className="query">
                                      {attributeValues.attribute}
                                      <QuestionIcon
                                        attributes={
                                          attributeValues && attributeValues
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="spec-col">
                                    <div className="spec-col">
                                      {attributeValues.attribute_value !=
                                        "yes" &&
                                        attributeValues.attribute_value !=
                                          "no" && (
                                          <div
                                            className="tooltip-title"
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
                                              textDecoration: "underline",
                                              textDecorationStyle: "dotted",
                                              textDecorationThickness: "1.5px",
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

                                            <ProsConsToolTip
                                              hover_phrase={
                                                attributeValues &&
                                                attributeValues.hover_phase
                                              }
                                            />
                                          </div>
                                        )}

                                      {/* newww */}
                                      {(attributeValues.attribute_value ==
                                        "yes" ||
                                        attributeValues.attribute_value ==
                                          "no") && (
                                        <div
                                          className="tooltip-title"
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
                                            textDecoration: "underline",
                                            textDecorationStyle: "dotted",
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
                          ))
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
                              : initialDisplay) && (
                            <span
                              className="show_more"
                              onClick={() => {
                                setloading(true),
                                  handleDisplayedAttributesCount(
                                    product.name,
                                    attribute
                                  );
                                setTimeout(() => {
                                  setloading(false);
                                }, 600);
                              }}
                            >
                              {"SHOW MORE "}
                              <i
                                className={`ri-${
                                  initialDisplay <
                                  product.attributes[attribute].length
                                    ? "add"
                                    : "subtract"
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
