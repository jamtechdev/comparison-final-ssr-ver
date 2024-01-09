"use client";
/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from "react";
import { Accordion, Form } from "react-bootstrap";
import { getFilteredAttributeValues } from "../../../_helpers";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from 'lodash.debounce';
export default function Filter({ categoryAttributes }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  let price = categoryAttributes.price;
  let brands = categoryAttributes.brands;
  let attributeCategories = categoryAttributes.attribute_categories
  let initialNoOfCategories = 5;
  let updatedParams = {};
  const [pagination, setPagination] = useState({});
  const handlePagination = (categoryName) => {
    let updatedPage =
      pagination[categoryName] + initialNoOfCategories ||
      initialNoOfCategories * 2;
    setPagination({ ...pagination, [categoryName]: updatedPage });
  };
  const handelFilterActions = (key, value) => {
     console.log(key,value);
    const currentParams = new URLSearchParams(searchParams.toString());
    // console.log(JSON.stringify(currentParams),"currentParams")
    const url = new URL(window.location.href);
    switch (key) {
      case "price":
        updatedParams.price = value;
        break;
      case "available":
        if (value) {
          updatedParams.available = value;
        } else {
          deleteQueryFormURL(key, updatedParams, currentParams, url)
        }
        break;
      case "brand":
        if (Object.values(value).length > 0) {
          updatedParams.brand = Object.values(value).join()
        } else {
          deleteQueryFormURL(key, updatedParams, currentParams, url)
        }
        break;
      default:
        return;
    }
    // console.log(updatedParams)
    Object.entries(updatedParams).forEach(([paramKey, paramValue]) => {
      currentParams.set(paramKey, paramValue);
      url.searchParams.set(paramKey, paramValue);
    });
    // Update the URL without triggering a page reload (hack)
    window.history.pushState({}, '', url.toString());
    //call the next router for srr
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };
  const deleteQueryFormURL = (key, updatedParams, currentParams, url) => {
    delete updatedParams[key];
    currentParams.delete([key]);
    url.searchParams.delete([key]);
  }
  //router.replace(pathname, { scroll: false });
  return (
    <div className="filter-container">
      <div className="filter-section">
        <div className="tech-features-price">
          Price
          {price?.[0]?.min_price != null && (
            <MultiRangeSlider
              min={price[0]?.min_price}
              max={price[0]?.max_price}
              unit="€"
              onChange={({ min, max }) => {
                handelFilterActions("price", `${min},${max}`);
              }}
            />
          )}
        </div>
      </div>
      <Accordion className="filter-accordion">
        <Accordion.Item eventKey="888888">
          <Accordion.Header as="div" className="accordion-header">
            {" "}
            Available
            <Form.Check
              required
              className="custom-switch"
              type="switch"
              id={`Available`}
              onChange={(e) =>
                handelFilterActions("available", e.target.checked)
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
                    handelFilterActions("brand", { brand: brand })
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
                  let filteredArrayOfAttributeValues = getFilteredAttributeValues(attribute);
                  if (filteredArrayOfAttributeValues?.type == "dropdown") {
                    countAttribute++;
                    // check if values contain only yes then Toggle Switch
                    if (
                      filteredArrayOfAttributeValues.values.length == 1 &&
                      filteredArrayOfAttributeValues.values[0] == "yes"
                    ) {
                      const value = filteredArrayOfAttributeValues.values[0];
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
                              id={`${groupName}-${value}`}
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
                                const groupName = `${category.name}-${attribute.name}`;
                                return (
                                  <Form.Check
                                    required
                                    label={
                                      <span>
                                        {value.toString()}{" "}
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: `<p>(${0})</p>`,
                                          }}
                                        />
                                      </span>
                                    }

                                    key={valIndex}
                                    id={`${groupName}-${value}`}
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
                              handelFilterActions("price", `${min},${max}`);
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

