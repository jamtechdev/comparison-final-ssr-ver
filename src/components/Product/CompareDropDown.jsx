"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";
import useChart from "@/hooks/useChart";
import axios from "axios";
import useComparisonChart from "@/hooks/useComparisonChart";

function CompareDropDown({
  categorySlug,
  attributeDropDown,
  product,
  slug,
  pageType,
}) {
  // console.log(product);
  // console.log(attributeDropDown);

  const [selectedItem, setSelectedItem] = useState(
    attributeDropDown[0] || null
  );
  const [chart, setChart] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState(
    (attributeDropDown[0] && attributeDropDown[0].attributes[0]) || null
  );
  // console.log(selectedAttribute)

  useEffect(() => {
    const containerDivs = document.querySelectorAll(".container-divs");
    if (containerDivs.length > 1) {
      const elementsToRemove = Array.from(containerDivs).slice(1);
      elementsToRemove.forEach((element) => element.remove());
    }
  });

  useEffect(() => {
    if (selectedAttribute) {
      const config = {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
      };
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/generate-chart/${categorySlug}/?attribute=${selectedAttribute?.name}&slug=${slug}`,
          config
        )
        .then((res) => {
          setChart(res.data.data);
        });
    }

    const containerDivss = document.getElementsByClassName("container-divs");
    for (let i = 0; i < containerDivss.length; i++) {
      containerDivss[i].remove();
    }
    const legendBoxDivs = document.getElementsByClassName("legendBox");
    for (let i = 0; i < legendBoxDivs.length; i++) {
      legendBoxDivs[i].remove();
    }
    const parentDivs = document.getElementsByClassName("parentBarDiv");
    for (let i = 0; i < parentDivs.length; i++) {
      parentDivs[i].remove();
    }
  }, [selectedAttribute]);

  const handleItemChange = (e) => {
    const selectedItemIndex = e.target.value;
    const selectedItem = attributeDropDown[selectedItemIndex];
    setSelectedItem(selectedItem);
    setSelectedAttribute(selectedItem.attributes[0]);
  };

  const handleAttributeChange = (e) => {
    const selectedAttributeIndex = e.target.value;
    const selectedAttribute = selectedItem.attributes[selectedAttributeIndex];
    setSelectedAttribute(selectedAttribute);
  };
  // testing
  // console.log(chart)
  useComparisonChart(chart, pageType, slug);
  return (
    <>
      <section className="ptb-80">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">
                {(product && product?.page_phases?.compare_with_others) ||
                  (product && product?.page_phases?.compare_with_all_others)}
              </h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4} lg={4}>
              <div className="filtered-data-select justify-content-start">
                <span>
                  {product && product?.page_phases?.attribute_category}:
                </span>
                <Form.Select
                  aria-label="Category select"
                  onChange={handleItemChange}
                  value={attributeDropDown.indexOf(selectedItem)}
                >
                  {attributeDropDown
                    .sort((a, b) => a.position - b.position)
                    .map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                </Form.Select>
              </div>
              <div className="filtered-data-select justify-content-start mt-3">
                <span>{product && product?.page_phases?.attribute} : </span>
                {selectedItem && (
                  <Form.Select
                    aria-label="Attribute select"
                    onChange={handleAttributeChange}
                    value={selectedItem.attributes.indexOf(selectedAttribute)}
                  >
                    {selectedItem.attributes.sort((a, b) => a?.position - b?.position)?.map((attribute, index) => (
                      <option key={index} value={index}>
                        {attribute.name}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </div>
              {/* {console.log(selectedAttribute)} */}
              {selectedAttribute?.name !== "Price" && (
                <p className="text-end para_content_text mt-3">
                  {selectedAttribute && (
                    <span style={{ fontWeight: 600, fontSize: 17 }}>
                      {product && product?.page_phases?.what_it_is} :
                    </span>
                  )}
                  {""} {selectedAttribute.description}
                  <br />
                  {selectedAttribute && (
                    <span style={{ fontWeight: 600, fontSize: 17 }}>
                      {product && product?.page_phases?.when_it_matters} :
                    </span>
                  )}
                  {""} {selectedAttribute.when_matters}
                </p>
              )}
            </Col>
            <Col md={8} lg={8}>
              <span className="addClassData"></span>
              <div className="barData"></div>
              {/* <h6 className="addClassData">
                [pie-chart;Overall1;Robot Vacuum Cleaners;Runtime:0-300;Can mop]
              </h6> */}
              {/* <Image
                className="graph-bar"
                src="/images/graph-bar.png"
                width={0}
                height={0}
                alt=""
                sizes="100%"
              /> */}
            </Col>
            {/* <Col md={2} lg={2}>
              <div className="barData"></div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default CompareDropDown;
