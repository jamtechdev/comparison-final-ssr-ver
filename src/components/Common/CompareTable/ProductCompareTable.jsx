/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { Button, Table } from "react-bootstrap";
import QuestionIcon from "../../Svg/QuestionIcon";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ProsConsToolTip from "../../Svg/ProsConsToolTip";
import { useRouter } from "next/navigation";
import Link from "next/link";
import formatValue from "@/_helpers/formatValue";
const ProductCompareTable = React.memo(
  ({ products, categoryAttributes, slug }) => {
    const router = useRouter();
    let initialNoOfCategories = 5;
    const [pagination, setPagination] = useState({});
    const defaultNo = 5;

    const [fullTable, setFullTable] = useState(2);

    // this for function for Table product sticky (Start)
    const [winPos, setWinPos] = useState(false);
    const useDetectSticky = (ref, observerSettings = { threshold: [1] }) => {
      const [isSticky, setIsSticky] = useState(false);
      const newRef = useRef();
      ref ||= newRef;

      // mount
      useEffect(() => {
        const cachedRef = ref.current,
          observer = new IntersectionObserver(
            ([e]) => setIsSticky(e.intersectionRatio < 1),
            observerSettings
          );
        observer.observe(cachedRef);
        return () => {
          observer.unobserve(cachedRef);
        };
      }, []);

      return [isSticky, ref, setIsSticky];
    };

      if (typeof window !== "undefined") {
        // Access the window object here
        window.onscroll = function () {
          var testDiv = document.getElementById("testone");
          testDiv?.getBoundingClientRect().top < 2
            ? setWinPos(true)
            : setWinPos(false);
          // console.log( testDiv.getBoundingClientRect().top);

          var tbodyDiv = document.getElementById("tbody");
          tbodyDiv?.getBoundingClientRect().top > 2
            ? setWinPos(false)
            : setWinPos(true);
        };
      }

    const [isSticky, ref] = useDetectSticky();
    // this for function for Table product sticky (End)

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

    const getValue = (arr, attribute) => {
      const foundElement = arr.find((obj) => obj.attribute === attribute);
      if (foundElement) {
        return foundElement.attribute_value;
      }
      return null;
    };

    const handlePagination = (categoryName) => {
      let updatedPage =
        pagination[categoryName] + initialNoOfCategories ||
        initialNoOfCategories * 2;
      setPagination({ ...pagination, [categoryName]: updatedPage });
    };

    const handleTableShow = () => {
      setFullTable(categoryAttributes?.length);
    };

    // These funcation for add  Star on table value which was better than other
    // **start**

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
          const targetString = stringArray[0] === "yes" ? "yes" : "no";
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
          if (
            numericValue === topValue &&
            !obj.attribute_value?.includes("⭐")
          ) {
            obj.attribute_value += "⭐";
          }
        });
      }

      // Adjust this function according to your context as I don't have the complete code
      // It would be good to ensure that you have the required variables (finalProducts) in scope.

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
    const addStarOnTable = (defaultNo, type, values) => {
      // console.log(type);
      if (
        type === "overall_score" ||
        type === "reviews" ||
        type === "technical_score" ||
        type === "user_rating" ||
        type === "ratio"
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
              </span>
            </div>
          ) : (
            value
          )
        );
      }
      return values;
    };
    // **End**

    return (
      <div
        className={
          fullTable == 2
            ? "compare-container-wrapper"
            : "compare-container-wrapper no-before"
        }
        ref={ref}
      >
        <Table className="compare-container">
          <thead
            id="testone"
            className={winPos ? "isSticky" : "nonSticky"}
            ref={ref}
          >
            <tr className="">
              <th></th>
              {finalProducts.slice(0, defaultNo).map((product, index) => {
                return (
                  <th key={index}>
                    {/* <span className="best-tag-product">Best From All</span> */}
                    <p className="device-name">
                      {/* <a href="">/product/${product?.permalik</a> */}
                      <a
                        href={`/${product?.category_url}/${product?.permalink}`}
                      >
                        {product?.name}
                      </a>

                      <img
                        className="compare_image"
                        src={
                          product?.main_image
                            ? product?.main_image
                            : "/images/nofound.png"
                        }
                        width={0}
                        height={0}
                        alt=""
                        sizes="100%"
                      />
                    </p>

                    {product.price_websites &&
                      product?.price_websites?.every(
                        (data) => data.price !== null
                      ) && (
                        <>
                          {" "}
                          <>
                            <ul className="best-list-item d-none">
                              {" "}
                              {product.price_websites &&
                                product?.price_websites?.every(
                                  (data) => data.price === null
                                ) && (
                                  <div className="not-availabel p-3">
                                    <span className="txt">NOT AVAILABLE</span>
                                    <span className="price">
                                      ~ {product?.price} €
                                    </span>
                                  </div>
                                )}
                              {product.price_websites &&
                                product.price_websites.map((data, dIndex) => {
                                  return (
                                    <React.Fragment key={dIndex}>
                                      {data.price !== null && (
                                        <li>
                                          <>
                                            <Link
                                              rel="noopener noreferrer"
                                              target="_blank"
                                              href={`/link?p=${btoa(data.url)}`}
                                            >
                                              <img
                                                src={data?.logo}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                alt="price"
                                              />
                                            </Link>
                                            <span>
                                              <a
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                href={`/link?p=${btoa(
                                                  data.url
                                                )}`}
                                              >
                                                {data?.price} €
                                              </a>
                                            </span>
                                          </>
                                        </li>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                            </ul>
                          </>
                        </>
                      )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody id="tbody">
            <tr className="">
              <th>
                <p>Image</p>
              </th>
              {finalProducts.slice(0, defaultNo).map((product, imageIndex) => {
                return (
                  <td key={imageIndex}>
                    <img
                      className="compare_image"
                      src={
                        product?.main_image
                          ? product?.main_image
                          : "/images/nofound.png"
                      }
                      width={0}
                      height={0}
                      alt=""
                      sizes="100%"
                    />
                  </td>
                );
              })}
            </tr>
            <tr className="">
              <th>
                <p>Price</p>
              </th>
              {finalProducts.slice(0, defaultNo).map((product, priceIndex) => {
                return (
                  <td key={priceIndex} className={`${priceIndex}-class`}>
                    <div className="best-price-section">
                      {product.price_websites &&
                        product?.price_websites?.every(
                          (data) => data.price === null
                        ) && (
                          <div className="not-availabel">
                            <span className="txt">NOT AVAILABLE</span>
                            <span className="price">~ {product?.price} €</span>
                          </div>
                        )}
                      {product.price_websites &&
                        product?.price_websites?.every(
                          (data) => data.price !== null
                        ) && (
                          <>
                            <ul className="best-list-item">
                              {product.price_websites &&
                                product.price_websites.map((data, dIndex) => {
                                  return (
                                    <React.Fragment key={dIndex}>
                                      {data.price !== null && (
                                        <li>
                                          <>
                                            <Link
                                              rel="noopener noreferrer"
                                              target="_blank"
                                              href={`/link?p=${btoa(data.url)}`}
                                            >
                                              <img
                                                src={data?.logo}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                alt="price"
                                              />
                                            </Link>
                                            <span>
                                              <a
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                href={`/link?p=${btoa(
                                                  data.url
                                                )}`}
                                              >
                                                {data?.price} €
                                              </a>
                                            </span>
                                          </>
                                        </li>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                            </ul>
                          </>
                        )}
                    </div>
                  </td>
                );
              })}
            </tr>

            <tr className="tr-bg-color">
              <th className="sub-inner-padding">
                <div className="tooltip-title">
                  Overall Score
                  {products[0]?.overall_score_descriptions && (
                    <div className="tooltip-display-content">
                      {products[0]?.overall_score_descriptions?.description && (
                        <p className="mb-2">
                          <b>What it is: </b>{" "}
                          {products[0]?.overall_score_descriptions?.description}
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
                  )}
                </div>
              </th>
              {finalProducts
                .slice(0, defaultNo)
                .map((product, overAllIndex) => {
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
                        {formatValue(product.overall_score)}
                      </span>
                    </td>
                  );
                })}
            </tr>
            <tr className="">
              <th className="sub-inner-padding">
                <div className="tooltip-title">
                  Technical Score
                  {products[0]?.technical_score_descriptions && (
                    <div className="tooltip-display-content">
                      {products[0]?.technical_score_descriptions
                        ?.description && (
                        <p className="mb-2">
                          <b>What it is: </b>{" "}
                          {
                            products[0]?.technical_score_descriptions
                              ?.description
                          }
                        </p>
                      )}
                      {products[0]?.technical_score_descriptions
                        ?.when_matters && (
                        <p className="mb-2">
                          <b>When it matters: </b>{" "}
                          {
                            products[0]?.technical_score_descriptions
                              ?.when_matters
                          }
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </th>
              {finalProducts
                .slice(0, defaultNo)
                .map((product, technicalIndex) => {
                  const values = finalProducts.map((p) => p.technical_score);
                  return (
                    <td key={technicalIndex}>
                      {
                        addStarOnTable(defaultNo, "technical_score", values)[
                          technicalIndex
                        ]
                      }
                    </td>
                  );
                })}
            </tr>
            <tr className="">
              <th className="sub-inner-padding">
                <div className="tooltip-title">
                  User’s Ratings
                  {products[0]?.users_rating_descriptions && (
                    <div className="tooltip-display-content">
                      {products[0]?.users_rating_descriptions?.description && (
                        <p className="mb-2">
                          <b>What it is: </b>
                          {products[0]?.users_rating_descriptions?.description}
                        </p>
                      )}
                      {products[0]?.users_rating_descriptions
                        ?.when_it_matters && (
                        <p className="mb-2">
                          <b>When it matters: </b>
                          {
                            products[0]?.technical_score_descriptions
                              ?.when_it_matters
                          }
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </th>
              {finalProducts.slice(0, defaultNo).map((product, userIndex) => {
                const values = finalProducts.map((p) => p.reviews);
                return (
                  <td key={userIndex}>
                    {
                      addStarOnTable(defaultNo, "user_rating", values)[
                        userIndex
                      ]
                    }
                  </td>
                );
              })}
            </tr>
            <tr className="">
              <th className="sub-inner-padding">
                <div className="tooltip-title">
                  Ratio Qlt/Price
                  {products[0]?.ratio_qulitiy_points_descriptions && (
                    <div className="tooltip-display-content">
                      {products[0]?.ratio_qulitiy_points_descriptions
                        ?.description && (
                        <p className="mb-2">
                          <b>What it is: </b>{" "}
                          {
                            products[0]?.ratio_qulitiy_points_descriptions
                              ?.description
                          }
                        </p>
                      )}
                      {products[0]?.technical_score_descriptions
                        ?.when_it_matters && (
                        <p className="mb-2">
                          <b>When it matters: </b>{" "}
                          {
                            products[0]?.technical_score_descriptions
                              ?.when_it_matters
                          }
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </th>
              {finalProducts.slice(0, defaultNo).map((product, ratioIndex) => {
                const values = finalProducts.map(
                  (p) => p.ratio_quality_price_points
                );
                return (
                  <td key={ratioIndex}>
                    {addStarOnTable(defaultNo, "ratio", values)[ratioIndex]}
                  </td>
                );
              })}
            </tr>
            {removeLastObjectFromCategory
              ?.slice(0, fullTable || 2)
              .map((category, categoryIndex) => {
                return (
                  <Fragment key={categoryIndex}>
                    <tr className="tr-bg-color">
                      <th>
                        <div className="tooltip-title">
                          {category.name}
                          {(category.description || category.when_matters) && (
                            <div className="tooltip-display-content">
                              {category?.description && (
                                <p className="mb-2">
                                  <b>What it is: </b>
                                  {category?.description}
                                </p>
                              )}

                              {category?.when_matters && (
                                <p className="mb-2">
                                  <b>When it matters: </b>{" "}
                                  {category?.when_matters}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </th>
                      {finalProducts
                        .slice(0, defaultNo)
                        .map((product, productIndex) => {
                          return (
                            <td key={productIndex}>
                              <span
                                className="count"
                                style={{
                                  background:
                                    product.attributes[
                                      category?.name
                                    ]?.[0]?.final_points?.toFixed(1) >= 7.5
                                      ? "#093673"
                                      : product.attributes[
                                          category?.name
                                        ]?.[0]?.final_points?.toFixed(1) >= 5 &&
                                        product.attributes[
                                          category?.name
                                        ]?.[0]?.final_points?.toFixed(1) < 7.5
                                      ? "#437ECE"
                                      : "#85B2F1",
                                }}
                              >
                                {/* {console.log(product.attributes[category.name].unit && product.attributes[category.name].unit )} */}
                                {product.attributes[
                                  category.name
                                ]?.[0].final_points?.toFixed(1)}{" "}
                              </span>
                            </td>
                          );
                        })}
                    </tr>
                    {category.attributes
                      .slice(
                        0,
                        pagination[category.name] || initialNoOfCategories
                      )
                      .map((catAttribute, catAttributeIndex) => {
                        return (
                          <tr key={catAttributeIndex} className="">
                            <th className="sub-inner-padding">
                              <div className="tooltip-title">
                                {catAttribute.name}
                                {(catAttribute.description ||
                                  catAttribute.when_matters) && (
                                  <div className="tooltip-display-content">
                                    {catAttribute?.description && (
                                      <p className="mb-2">
                                        <b>What it is: </b>
                                        {catAttribute?.description}
                                      </p>
                                    )}

                                    {catAttribute?.when_matters && (
                                      <p className="mb-2">
                                        <b>When it matters: </b>{" "}
                                        {catAttribute?.when_matters}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </th>
                            {addAsterisksToTopValue(
                              defaultNo,
                              category,
                              catAttribute
                            )}
                          </tr>
                        );
                      })}
                    {category.attributes.length >
                      (pagination[category.name] || initialNoOfCategories) && (
                      <tr className="text-center show_more_row">
                        <td colSpan="6">
                          <span
                            className="show_more"
                            onClick={() => handlePagination(category.name)}
                          >
                            SHOW MORE <i className="ri-add-line"></i>
                          </span>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
          </tbody>
        </Table>
        {fullTable == 2 && (
          <div className="text-center">
            <Button className="see_all_btn_outline" onClick={handleTableShow}>
              See Full Table <i className="ri-arrow-down-s-line"></i>
            </Button>
          </div>
        )}
      </div>
    );
  }
);
//check
ProductCompareTable.displayName = "CompareTable";
export default ProductCompareTable;
