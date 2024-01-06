/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { Button, Table } from "react-bootstrap";
import QuestionIcon from "../../Svg/QuestionIcon";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const ProductCompareTable = React.memo(({ products, categoryAttributes }) => {
  console.log(products, "params");
  
  const [winPos, setWinPos] = useState(false);
  let initialNoOfCategories = 5;
  const [pagination, setPagination] = useState({});
  const defaultNo = 5;

  const [fullTable, setFullTable] = useState(2);
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

  // if (typeof window !== "undefined") {
  //   // Access the window object here
  //   window.onscroll = function () {
  //     var testDiv = document.getElementById("testone");
  //     testDiv?.getBoundingClientRect().top < 2
  //       ? setWinPos(true)
  //       : setWinPos(false);
  //     // console.log( testDiv.getBoundingClientRect().top);

  //     var tbodyDiv = document.getElementById("tbody");
  //     tbodyDiv.getBoundingClientRect().top > 2
  //       ? setWinPos(false)
  //       : setWinPos(true);
  //   };
  // }

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

  const [isSticky, ref] = useDetectSticky();
  return (
    <div
      className={
        fullTable == 2
          ? "compare-container-wrapper"
          : "compare-container-wrapper no-before"
      }
      ref={ref}
    >
      <Table className="compare-container-2">
        <thead
          id="testone"
          className={winPos ? "isSticky" : "nonSticky"}
          ref={ref}
        >
          <tr>
            <th></th>
            {finalProducts.slice(0, defaultNo).map((product, index) => {
              return (
                <th key={index}>
                  {/* <span className="best-tag-product">Best From All</span> */}
                  <p className="device-name">
                    {/* <span>{index + 1}</span> */}
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
                      alt=""
                      sizes="100%"
                    />
                  </p>
                  <ul className="best-list-item d-none">
                    <li>
                      <img
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
        <tbody id="tbody">
          <tr>
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
          <tr>
            <th>
              <p>Price</p>
            </th>
            {finalProducts.slice(0, defaultNo).map((product, priceIndex) => {
              return (
                <td key={priceIndex}>
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
                                  <>
                                    {data.price !== null && (
                                      <li key={dIndex}>
                                        <>
                                          <img
                                            src={data?.logo}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            alt=""
                                          />
                                          <span>{data?.price} €</span>
                                        </>
                                      </li>
                                    )}
                                  </>
                                );
                              })}
                          </ul>
                        </>
                      )}
                    {/* <ul className="best-list-item">
                      {product?.price_websites?.map((data, index) => {
                        return (
                          <>
                            <li>
                              <img
                                src={data?.logo}
                                width={0}
                                height={0}
                                sizes="100%"
                                alt=""
                              />
                              <span>{data?.price} €</span>
                            </li>
                          </>
                        );
                      })}
                    </ul> */}
                  </div>
                </td>
              );
            })}
          </tr>
          <tr className="tr-bg-color">
            <th>
              <p>Overall Score</p>
            </th>
            {finalProducts.slice(0, defaultNo).map((product, overAllIndex) => {
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
                          : "#85B2F1",
                    }}
                  >
                    {product.overall_score}
                  </span>
                </td>
              );
            })}
          </tr>
          <tr>
            <th className="sub-inner-padding">
              <p className="tooltip-title">
                Technical Score
                {products[0].technical_score_descriptions && (
                  <div className="tooltip-display-content">
                    {products[0].technical_score_descriptions?.importance && (
                      <p class="mb-2">
                        <b>Importance: </b>
                        {products[0].technical_score_descriptions?.importance}
                      </p>
                    )}
                    {products[0].technical_score_descriptions?.description && (
                      <p class="mb-2">
                        <b>What it is: </b>{" "}
                        {products[0].technical_score_descriptions?.description}
                      </p>
                    )}
                    {products[0].technical_score_descriptions?.when_matters && (
                      <p class="mb-2">
                        <b>When it matters: </b>{" "}
                        {products[0].technical_score_descriptions?.when_matters}
                      </p>
                    )}
                  </div>
                )}
              </p>
            </th>
            {finalProducts
              .slice(0, defaultNo)
              .map((product, technicalIndex) => {
                return <td key={technicalIndex}>{product.technical_score}</td>;
              })}
          </tr>
          <tr>
            <th className="sub-inner-padding">
              <p className="tooltip-title">
                User’s Ratings
                {products[0].users_rating_descriptions && (
                  <div className="tooltip-display-content">
                    {products[0].users_rating_descriptions?.importance && (
                      <p class="mb-2">
                        <b>Importance: </b>
                        {products[0].users_rating_descriptions?.importance}
                      </p>
                    )}
                    {products[0].users_rating_descriptions?.description && (
                      <p class="mb-2">
                        <b>What it is: </b>{" "}
                        {products[0].users_rating_descriptions?.description}
                      </p>
                    )}
                    {products[0].technical_score_descriptions
                      ?.when_it_matters && (
                      <p class="mb-2">
                        <b>When it matters: </b>{" "}
                        {
                          products[0].technical_score_descriptions
                            ?.when_it_matters
                        }
                      </p>
                    )}
                  </div>
                )}
              </p>
            </th>
            {finalProducts.slice(0, defaultNo).map((product, userIndex) => {
              return <td key={userIndex}>{product.reviews}</td>;
            })}
          </tr>
          <tr>
            <th className="sub-inner-padding">
              <p className="tooltip-title">
                Ratio Qlt/Price
                {products[0].ratio_qulitiy_points_descriptions && (
                  <div className="tooltip-display-content">
                    {products[0].ratio_qulitiy_points_descriptions
                      ?.importance && (
                      <p class="mb-2">
                        <b>Importance: </b>
                        {
                          products[0].ratio_qulitiy_points_descriptions
                            ?.importance
                        }
                      </p>
                    )}
                    {products[0].ratio_qulitiy_points_descriptions
                      ?.description && (
                      <p class="mb-2">
                        <b>What it is: </b>{" "}
                        {
                          products[0].ratio_qulitiy_points_descriptions
                            ?.description
                        }
                      </p>
                    )}
                    {products[0].technical_score_descriptions
                      ?.when_it_matters && (
                      <p class="mb-2">
                        <b>When it matters: </b>{" "}
                        {
                          products[0].technical_score_descriptions
                            ?.when_it_matters
                        }
                      </p>
                    )}
                  </div>
                )}
              </p>
            </th>
            {finalProducts.slice(0, defaultNo).map((product, ratioIndex) => {
              return (
                <td key={ratioIndex}>{product.ratio_quality_price_points}</td>
              );
            })}
          </tr>
          {categoryAttributes
            ?.slice(0, fullTable || 2)
            .map((category, categoryIndex) => {
              return (
                <Fragment key={categoryIndex}>
                  <tr className="tr-bg-color">
                    <th>
                      <p>
                        {category.name}

                        <QuestionIcon />
                      </p>
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
                                    category.name
                                  ][0].final_points?.toFixed(1) >= 7.5
                                    ? "#093673"
                                    : product.attributes[
                                        category.name
                                      ][0].final_points?.toFixed(1) >= 5 &&
                                      product.attributes[
                                        category.name
                                      ][0].final_points?.toFixed(1) < 7.5
                                    ? "#437ECE"
                                    : "#85B2F1",
                              }}
                            >
                              {product.attributes[
                                category.name
                              ][0].final_points?.toFixed(1)}
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
                        <tr key={catAttributeIndex}>
                          <th className="sub-inner-padding">
                            <p className="tooltip-title">
                              {catAttribute.name}
                              <div className="tooltip-display-content">
                                {catAttribute?.importance && (
                                  <p
                                    class="mb-2"
                                    style={{ color: "rgb(133, 178, 241)" }}
                                  >
                                    <b style={{ color: "rgb(39 48 78 / 70%)" }}>
                                      Importance:{" "}
                                    </b>
                                    {catAttribute?.importance}
                                  </p>
                                )}

                                {catAttribute?.description && (
                                  <p class="mb-2">
                                    <b>What it is: </b>
                                    {catAttribute?.description}
                                  </p>
                                )}

                                {catAttribute?.when_matters && (
                                  <p class="mb-2">
                                    <b>When it matters: </b>{" "}
                                    {catAttribute?.when_matters}
                                  </p>
                                )}
                              </div>
                            </p>
                          </th>
                          {finalProducts
                            .slice(0, defaultNo)
                            .map((product, attrindex) => {
                              return (
                                <td key={attrindex}>
                                  {getValue(
                                    product.attributes[category.name],
                                    catAttribute.name
                                  )}
                                </td>
                              );
                            })}
                        </tr>
                      );
                    })}
                  {category.attributes.length >
                    (pagination[category.name] || initialNoOfCategories) && (
                    <tr>
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
});

ProductCompareTable.displayName = "CompareTable";
export default ProductCompareTable;
