/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from "react";
import { Accordion, Form } from "react-bootstrap";
import {
  filterArrayOfObject,
  handleFilterValueChange,
  isCheckboxChecked,
  capitalize,
  filterProducts,
} from "../../../_helpers";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider.js";
const Filter = React.memo(
  ({
    categoryAttributes,
    setFilterObj,
    filterObj,
    products,
    sortRangeAttributeArray,
    priceRangeAndBrandsArray,
    setFilterObjPriceBrand,
    filterObjPriceBrand,
  }) => {
    let initialNoOfCategories = 5;

    const [pagination, setPagination] = useState({});
    const remainigProductsCalculateFilter = (category, attribute, value) => {
      let newobj = {};
      // if (!newobj[category]) {
      newobj[category] = {};
      // }
      // if (!newobj[category][attribute]) {
      newobj[category][attribute] = [];
      // }
      newobj[category][attribute].push(value);
      return filterProducts({ ...filterObj, ...newobj }, products).length;
    };

    const handlePagination = (categoryName) => {
      let updatedPage =
        pagination[categoryName] + initialNoOfCategories ||
        initialNoOfCategories * 2;
      setPagination({ ...pagination, [categoryName]: updatedPage });
    };
    // let refObj = useRef({})

    const handleFilterChange = (category, attribute, value, e) => {
      handleFilterValueChange(
        filterObj,
        setFilterObj,
        category,
        attribute,
        value,
        e
      );
    };

    const handleRangeChange = (
      category,
      attribute,
      value,
      initial_min,
      initial_max
    ) => {
      let obj = { ...filterObj };
      if (!obj[category]) {
        obj[category] = {};
      }
      if (!obj[category][attribute]) {
        obj[category][attribute] = [{ min: 0, max: 100 }];
      }

      if (
        initial_max - initial_min >= 1 &&
        initial_max == value.max &&
        initial_min == value.min
      ) {
        delete obj[category][attribute];
        if (Object.keys(obj[category]).length === 0) {
          delete obj[category];
        }
      } else if (
        initial_max - initial_min < 1 &&
        value.max == 100 &&
        value.min == 0
      ) {
        delete obj[category][attribute];
        if (Object.keys(obj[category]).length === 0) {
          delete obj[category];
        }
      } else {
        obj[category][attribute][0] = {
          min: value.min,
          max: value.max,
        };
      }
      setFilterObj({ ...obj });
    };
    const handlefilterObjPriceBrand = (type, value) => {
      let obj = { ...filterObjPriceBrand };
      if (type == "price") {
      
        obj["price"] = { ...value };
        if (
          obj.price.min == priceRangeAndBrandsArray.priceRange.min &&
          obj.price.max == priceRangeAndBrandsArray.priceRange.max
        ) {
          delete obj["price"];
        }
      } else if (type == "available") {
        if (value) {
          obj["available"] = true;
        } else {
          delete obj["available"];
        }
      } else if (type == "brand") {
        if (!obj["brand"]) {
          obj["brand"] = [];
        }
        if (value.isChecked) {
          obj["brand"].push(value.brand);
        } else {
          obj["brand"] = obj["brand"].filter((item) => item !== value.brand);
          if (obj["brand"].length == 0) {
            delete obj["brand"];
          }
        }
      }
      setFilterObjPriceBrand({ ...obj });
      // console.log(filterObjPriceBrand)
    };

    return (
      <div className="filter-container">
        <div className="filter-section">
          <div className="tech-features-price">
            Price
            {priceRangeAndBrandsArray.priceRange.min != null && (
              <MultiRangeSlider
                min={priceRangeAndBrandsArray.priceRange?.min}
                max={priceRangeAndBrandsArray.priceRange.max}
                onChange={({ min, max }) => {
                  handlefilterObjPriceBrand("price", { min, max });
                }}
                unit="€"
              />
            )}
          </div>
        </div>
        <Accordion className="filter-accordion">
          {/* {priceRangeAndBrandsArray.priceRange.min != null &&
          <Accordion.Item eventKey="999999">
            <Accordion.Header as="div" className="accordion-header">
              Price <i className="ri-arrow-down-s-fill"></i>
            </Accordion.Header>
            <Accordion.Body>
              <MultiRangeSlider
                min={priceRangeAndBrandsArray.priceRange.min}
                max={priceRangeAndBrandsArray.priceRange.max}
                onChange={({ min, max }) => {
                  handlefilterObjPriceBrand("price", { min, max })
                  // console.log(priceRangeAndBrandsArray.priceRange)
                  // handleRangeChange(category.name, attribute.name, { min, max }, resultFilteredArrayOfObject.minValue, resultFilteredArrayOfObject.maxValue);
                }}
                unit=""
              />
            </Accordion.Body>
          </Accordion.Item>
        } */}
          <Accordion.Item eventKey="888888">
            <Accordion.Header as="div" className="accordion-header">
              {" "}
              Available
              <Form.Check
                required
                className="custom-switch"
                type="switch"
                // checked={isCheckboxChecked(filterObj, category.name, attribute.name, value)}
                id={`Available`}
                onChange={(e) =>
                  handlefilterObjPriceBrand("available", e.target.checked)
                }
                // onChange={(e) => handleFilterChange(category.name, attribute.name, value, e)}
              />
            </Accordion.Header>
          </Accordion.Item>
          <Accordion.Item eventKey="777777">
            <Accordion.Header as="div" className="accordion-header">
              Brand <i className="ri-arrow-down-s-fill"></i>
            </Accordion.Header>
            <Accordion.Body className="brand-list-section">
              {priceRangeAndBrandsArray.brands?.map((brand, brandIndex) => {
                return (
                  <Form.Check
                    required
                    label={<span>{brand}</span>}
                    // checked={isCheckboxChecked(filterObj, category.name, attribute.name, value)}
                    key={brandIndex}
                    id={brand}
                    onChange={(e) =>
                      handlefilterObjPriceBrand("brand", {
                        isChecked: e.target.checked,
                        brand: brand,
                      })
                    }
                    // onChange={(e) => handleFilterChange(category.name, attribute.name, value, e)}
                  />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {categoryAttributes?.map((category, index) => {
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
                    let resultFilteredArrayOfObject = filterArrayOfObject(
                      attribute,
                      sortRangeAttributeArray
                    );
                    // console.log(resultFilteredArrayOfObject)
                    if (resultFilteredArrayOfObject?.type == "dropdown") {
                      countAttribute++;
                      // check if values contain only yes then Toggle Switch
                      if (
                        resultFilteredArrayOfObject.values.length == 1 &&
                        resultFilteredArrayOfObject.values[0] == "yes"
                      ) {
                        // console.log(resultFilteredArrayOfObject.values[0]);
                        const value = resultFilteredArrayOfObject.values[0];
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
                                checked={isCheckboxChecked(
                                  filterObj,
                                  category.name,
                                  attribute.name,
                                  value
                                )}
                                id={`${groupName}-${value}`}
                                onChange={(e) =>
                                  handleFilterChange(
                                    category.name,
                                    attribute.name,
                                    value,
                                    e
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
                              {resultFilteredArrayOfObject.values?.map(
                                (value, valIndex) => {
                                  const groupName = `${category.name}-${attribute.name}`;
                                  // console.log("category", category.name, " attr ", attribute.name, " value ", value)
                                  // console.log()
                                  let countProduct =
                                    remainigProductsCalculateFilter(
                                      category.name,
                                      attribute.name,
                                      value
                                    );
                                  return (
                                    <Form.Check
                                      required
                                      label={
                                        <span>
                                          {value.toString()}{" "}
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: `<p>(${countProduct})</p>`,
                                            }}
                                          />
                                        </span>
                                      }
                                      checked={isCheckboxChecked(
                                        filterObj,
                                        category.name,
                                        attribute.name,
                                        value
                                      )}
                                      key={valIndex}
                                      id={`${groupName}-${value}`}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          category.name,
                                          attribute.name,
                                          value,
                                          e
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
                    } else if (resultFilteredArrayOfObject?.type == "range") {
                      countAttribute++;
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
                            <MultiRangeSlider
                              min={
                                resultFilteredArrayOfObject.maxValue -
                                  resultFilteredArrayOfObject.minValue >=
                                1
                                  ? resultFilteredArrayOfObject.minValue
                                  : 0
                              }
                              max={
                                resultFilteredArrayOfObject.maxValue -
                                  resultFilteredArrayOfObject.minValue >=
                                1
                                  ? resultFilteredArrayOfObject.maxValue
                                  : 100
                              }
                              onChange={({ min, max }) => {
                                handleRangeChange(
                                  category.name,
                                  attribute.name,
                                  { min, max },
                                  resultFilteredArrayOfObject.minValue,
                                  resultFilteredArrayOfObject.maxValue
                                );
                              }}
                              unit={resultFilteredArrayOfObject.unit}
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
);

export default Filter;
