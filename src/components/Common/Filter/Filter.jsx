"use client";
/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from "react";
import { Accordion, Form } from "react-bootstrap";
import { getFilteredAttributeValues } from "../../../_helpers";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter({
  categoryAttributes,
  removedParam,
  searchParam,
  orderBy,
}) {
  // console.log(categoryAttributes);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sliderValues, setSliderValues] = useState({
    minVal: 0,
    maxVal: 0,
  });
  let price = categoryAttributes?.price;
  let brands = categoryAttributes?.brands;
  let productCount = categoryAttributes?.attributes;
  let attributeCategories = categoryAttributes?.attribute_categories;
  let initialNoOfCategories = 5;
  let updatedParams = {};
  const [pagination, setPagination] = useState({});
  const handlePagination = (categoryName) => {
    let updatedPage =
      pagination[categoryName] + initialNoOfCategories ||
      initialNoOfCategories * 2;
    setPagination({ ...pagination, [categoryName]: updatedPage });
  };

  const handelFilterActions = (filterName, key, value, isChecked = false) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const url = new URL(window.location.href);
    switch (filterName) {
      case "price":
        if (!isChecked) {
          deleteQueryFormURL(key, updatedParams, currentParams, url);
        } else {
          updatedParams.price = value;
        }
        break;
      case "variant":
        if (value) {
          updatedParams.variant = value;
        } else {
          deleteQueryFormURL(key, updatedParams, currentParams, url);
        }
        break;
      case "available":
        if (value) {
          updatedParams.available = value;
        } else {
          deleteQueryFormURL(key, updatedParams, currentParams, url);
        }

        break;
      case "variants":
        if (value) {
          updatedParams.variants = value;
        } else {
          deleteQueryFormURL(key, updatedParams, currentParams, url);
        }

        break;
      case "brand":
        if (isChecked) {
          if (Object.values(value).length > 0) {
            let existingValue = url.searchParams.get([key]);
            updatedParams[key] = existingValue
              ? `${existingValue},${Object.values(value).join()}`
              : Object.values(value).join();
          } else {
            deleteQueryFormURL(key, updatedParams, currentParams, url);
          }
        } else {
          let existingValue = url.searchParams.get([key]);
          let valuesArray = existingValue ? existingValue.split(",") : [];
          let valueToRemove = Object.values(value)[0];
          valuesArray = valuesArray.filter((v) => v != valueToRemove);
          const updatedValue = valuesArray.join(",");
          if (updatedValue) {
            updatedParams[key] = updatedValue;
          } else {
            deleteQueryFormURL(key, updatedParams, currentParams, url);
          }
        }
        break;
      case "radioSwitch":
        if (isChecked) {
          updatedParams[key] = value;
        } else {
          deleteQueryFormURL(key, updatedParams, currentParams, url);
        }
        break;
      case "range":
        if (!isChecked) {
          deleteQueryFormURL(key, updatedParams, currentParams, url);
        } else {
          updatedParams[key] = value;
        }
        break;
      case "sort":
        if (isChecked) {
          updatedParams.sort = value;
        } else {
          deleteQueryFormURL(key, updatedParams, currentParams, url); // yet to do
        }
        break;
      case "dropdown":
        if (isChecked) {
          if (Object.values(value).length > 0) {
            let existingValue = url.searchParams.get([key]);
            updatedParams[key] = existingValue
              ? `${existingValue},${Object.values(value).join()}`
              : Object.values(value).join();
          } else {
            deleteQueryFormURL(key, updatedParams, currentParams, url);
          }
        } else {
          let existingValue = url.searchParams.get([key]);
          let valuesArray = existingValue ? existingValue.split(",") : [];
          let valueToRemove = Object.values(value)[0];
          valuesArray = valuesArray.filter((v) => v != valueToRemove);
          const updatedValue = valuesArray.join(",");
          if (updatedValue) {
            updatedParams[key] = updatedValue;
          } else {
            deleteQueryFormURL(key, updatedParams, currentParams, url);
          }
        }
        break;
      default:
        return;
    }
    Object.entries(updatedParams).forEach(([paramKey, paramValue]) => {
      currentParams.set(paramKey, paramValue);
      url.searchParams.set(paramKey, paramValue);
    });
    // Update the URL without triggering a page reload (hack)
    window.history.pushState({}, "", url.toString());
    //call the next router for srr
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  const deleteQueryFormURL = (key, updatedParams, currentParams, url) => {
    delete updatedParams[key];
    currentParams.delete([key]);
    url.searchParams.delete([key]);
  };

  useEffect(() => {
    if (searchParam?.direct) {
      const filteredKeys = Object.keys(searchParam).filter(
        (key) => key !== "direct"
      );
      if (filteredKeys.includes("variant")) {
        document.getElementById("variant").checked = true;
      }
      // if (filteredKeys.includes("available")) {
      //   document.getElementById("available").checked = true;
      // }
      if (filteredKeys.includes("brand")) {
        Object.values(searchParam)[0]
          .split(",")
          .map((item) => {
            document.getElementById(`${item}`).checked = true;
          });
      }
      if (filteredKeys.includes("price")) {
        setSliderValues((pre) => {
          return {
            ...pre,
            maxVal: price[0]?.max_price,
            minVal: price[0]?.min_price,
          };
        });
      }
    }

    if (removedParam) {
      if (removedParam == "variant") {
        handelFilterActions("variant", "variant", false);
        document.getElementById("variant").checked = false;
      }
      //search param remove
      if (removedParam == "available") {
        handelFilterActions("available", "available", false);
        document.getElementById("available").checked = false;
      }
      if (removedParam == "brand") {
        Object.values(searchParam)[0]
          .split(",")
          .map((item) => {
            handelFilterActions("brand", "brand", { brand: item }, false);
            document.getElementById(`${item}`).checked = false;
          });
      }

      if (removedParam?.toLowerCase() == "price") {
        handelFilterActions(
          "price",
          "price",
          `${price[0]?.min_price},${price[0]?.max_price}`,
          false
        );
        setSliderValues((pre) => {
          return {
            ...pre,
            maxVal: price[0]?.max_price,
            minVal: price[0]?.min_price,
          };
        });
      }
      if (removedParam == "sort") {
        handelFilterActions("sort", "sort", ``, false);
      }
      if (
        removedParam !== "available" &&
        removedParam != "brand" &&
        removedParam.toLowerCase() != "price" &&
        removedParam.toLowerCase() != "sort"
      ) {
        let arrayToGetFilteredObject = [];
        attributeCategories.map((item, index) => {
          let filteredArray = item.attributes.filter(
            (attribute) => attribute.name === removedParam
          );
          if (filteredArray.length > 0) {
            filteredArray && arrayToGetFilteredObject.push(filteredArray);
            return filteredArray;
          }
        });
        let filteredArrayOfAttributeValues = getFilteredAttributeValues(
          arrayToGetFilteredObject[0][0]
        );
        let countAttribute = 1;
        if (filteredArrayOfAttributeValues?.type == "dropdown") {
          countAttribute++;
          // check if values contain only yes then Toggle Switch
          if (
            filteredArrayOfAttributeValues?.values?.length == 1 &&
            filteredArrayOfAttributeValues?.values[0] == "yes"
          ) {
            const value = filteredArrayOfAttributeValues?.values[0];
            handelFilterActions("radioSwitch", removedParam, "no", false);
            document.getElementById(`${removedParam}`).checked = false;
          } else {
            {
              filteredArrayOfAttributeValues?.values?.map((value, valIndex) => {
                handelFilterActions(
                  "dropdown",
                  removedParam,
                  { key: value },
                  false
                );

                document.getElementById(
                  `${removedParam}${value}`
                ).checked = false;
              });
            }
          }
        } else {
          let min =
            filteredArrayOfAttributeValues.maxValue -
              filteredArrayOfAttributeValues.minValue >=
            1
              ? filteredArrayOfAttributeValues.minValue
              : 0;

          let max =
            filteredArrayOfAttributeValues.maxValue -
              filteredArrayOfAttributeValues.minValue >=
            1
              ? filteredArrayOfAttributeValues.maxValue
              : 100;
          // alert(min)

          setSliderValues((prevVal) => {
            return {
              ...prevVal,
              minVal: min,
              maxVal: max,
            };
          });
          // thumb thumb--left ${classForSlider}

          handelFilterActions("range", removedParam, `${min},${max}`, false);
          document.getElementById(`thumb thumb--left ${removedParam}`).value =
            min;
          document.getElementById(`thumb thumb--right ${removedParam}`).value =
            max;
        }
      }

      if (removedParam.toLowerCase() == "sort") {
        delete searchParams.sort;
      }
    }
  }, [removedParam, searchParam]);

  useEffect(() => {
    // console.log(orderBy, "order");
    orderBy.ischecked == true
      ? handelFilterActions("sort", "sort", `${orderBy.value}`, true)
      : handelFilterActions("sort", "sort", `${orderBy.value}`, false);
  }, [orderBy]);
  return (
    <div className="filter-container">
      <div className="filter-section">
        <div className="tech-features-price">
          Price
          {price?.[0]?.min_price != null && (
            <MultiRangeSlider
              rangeVal={sliderValues}
              min={price[0]?.min_price}
              max={price[0]?.max_price}
              unit="€"
              onChange={({ min, max }) => {
                handelFilterActions("price", "price", `${min},${max}`, true);
              }}
            />
          )}
        </div>
      </div>
      <Accordion className="filter-accordion">
        <Accordion.Item eventKey="888880">
          <Accordion.Header as="div" className="accordion-header">
            {" "}
            Show all variants
            <Form.Check
              required
              className="custom-switch"
              type="switch"
              id={`variant`}
              onChange={(e) =>
                handelFilterActions("variant", "variant", e.target.checked)
              }
            />
          </Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="888888">
          <Accordion.Header as="div" className="accordion-header">
            {" "}
            Available
            <Form.Check
              required
              className="custom-switch"
              type="switch"
              id={`available`}
              onChange={(e) =>
                handelFilterActions("available", "available", e.target.checked)
              }
            />
          </Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="777777">
          <Accordion.Header as="div" className="accordion-header">
            Brand <i className="ri-arrow-down-s-fill"></i>
          </Accordion.Header>
          <Accordion.Body className="brand-list-section">
            {brands?.map((brand, brandIndex) => {
              return (
                <Form.Check
                  required
                  label={<span>{brand}</span>}
                  key={brandIndex}
                  id={brand}
                  onChange={(e) =>
                    handelFilterActions(
                      "brand",
                      "brand",
                      { brand: brand },
                      e.target.checked
                    )
                  }
                />
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* Dynaimc Value Accordians */}
      {attributeCategories?.map((category, index) => {
        let countAttribute = 1;
        return (
          <div className="filter-section" key={index}>
            <div className="tech-features">{category.name}</div>
            <Accordion className="filter-accordion">
              {category?.attributes?.map((attribute, attrIndex) => {
                if (
                  countAttribute <=
                  (pagination[category.name] || initialNoOfCategories)
                ) {
                  let filteredArrayOfAttributeValues =
                    getFilteredAttributeValues(attribute);
                  // console.log(filteredArrayOfAttributeValues, "filter");
                  if (filteredArrayOfAttributeValues?.type == "dropdown") {
                    countAttribute++;
                    // check if values contain only yes then Toggle Switch
                    if (
                      filteredArrayOfAttributeValues.values.length == 1 &&
                      filteredArrayOfAttributeValues.values[0] == "yes"
                    ) {
                      const value = filteredArrayOfAttributeValues.values[0];
                      // console.log(value);
                      const groupName = `${category.name}-${attribute.name}`;
                      return (
                        <Accordion.Item eventKey={attrIndex} key={attrIndex}>
                          <Accordion.Header
                            as="div"
                            className="accordion-header"
                          >
                            {attribute.name}
                            <Form.Check
                              required
                              className="custom-switch"
                              type="switch"
                              id={`${attribute.name}`}
                              onChange={(e) =>
                                handelFilterActions(
                                  "radioSwitch",
                                  attribute.name,
                                  value,
                                  e.target.checked
                                )
                              }
                            />
                          </Accordion.Header>
                        </Accordion.Item>
                      );
                    }
                    // if not toggle show dropdown
                    else {
                      return (
                        <Accordion.Item eventKey={attrIndex} key={attrIndex}>
                          <Accordion.Header
                            as="div"
                            className="accordion-header"
                          >
                            {attribute.name}{" "}
                            <i className="ri-arrow-down-s-fill"></i>
                          </Accordion.Header>

                          <Accordion.Body>
                            {filteredArrayOfAttributeValues.values?.map(
                              (value, valIndex) => {
                                const groupName = `${category.attribute}-${attribute.values[0]}`;
                                return (
                                  <Form.Check
                                    required
                                    label={
                                      <span>
                                        {value.toString()}{" "}
                                        {filteredArrayOfAttributeValues?.unit}
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: `<p>(${
                                              filteredArrayOfAttributeValues.values &&
                                              filteredArrayOfAttributeValues.product_count &&
                                              filteredArrayOfAttributeValues
                                                .product_count[valIndex] !==
                                                undefined
                                                ? filteredArrayOfAttributeValues
                                                    .product_count[valIndex]
                                                : "0"
                                            })</p>`,
                                          }}
                                        />
                                      </span>
                                    }
                                    key={valIndex}
                                    id={`${attribute.name}${value}`}
                                    onChange={(e) =>
                                      handelFilterActions(
                                        "dropdown",
                                        attribute.name,
                                        { key: value },
                                        e.target.checked
                                      )
                                    }
                                  />
                                );
                              }
                            )}
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    }
                  } else if (filteredArrayOfAttributeValues?.type == "range") {
                    countAttribute++;
                    return (
                      <Accordion.Item eventKey={attrIndex} key={attrIndex}>
                        <Accordion.Header as="div" className="accordion-header">
                          {attribute.name}{" "}
                          <i className="ri-arrow-down-s-fill"></i>
                        </Accordion.Header>
                        <Accordion.Body>
                          <MultiRangeSlider
                            rangeVal={sliderValues}
                            classForSlider={attribute.name}
                            min={
                              filteredArrayOfAttributeValues.maxValue -
                                filteredArrayOfAttributeValues.minValue >=
                              1
                                ? filteredArrayOfAttributeValues.minValue
                                : 0
                            }
                            max={
                              filteredArrayOfAttributeValues.maxValue -
                                filteredArrayOfAttributeValues.minValue >=
                              1
                                ? filteredArrayOfAttributeValues.maxValue
                                : 100
                            }
                            unit={filteredArrayOfAttributeValues.unit}
                            onChange={({ min, max }) => {
                              handelFilterActions(
                                "range",
                                attribute.name,
                                `${min},${max}`,
                                true
                              );
                            }}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  }
                }
              })}
            </Accordion>
            {countAttribute >
              (pagination[category.name] || initialNoOfCategories) && (
              <span
                className="show_more"
                onClick={() => handlePagination(category.name)}
              >
                SHOW MORE <i className="ri-add-line"></i>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
