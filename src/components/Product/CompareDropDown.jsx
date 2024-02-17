"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";
import useChart from "@/hooks/useChart";
import axios from "axios";
import useComparisonChart from "@/hooks/useComparisonChart";

function CompareDropDown({ attributeDropDown, product, slug }) {
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(attributeDropDown)[0] || ""
  );
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedObjectDescription, setSelectedObjectDescription] =
    useState("");
  const [whenMatters, setwhenMatters] = useState("");
  const [chart, setChart] = useState("");
  // console.log(attributeDropDown);
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedAttribute(""); // Reset selected attribute when category changes

    // Update the description based on the selected category and attribute
    const firstObject = attributeDropDown[category]?.[0] || {};
    const { description } = firstObject;
    setSelectedObjectDescription(description || "");
  };

  const handleAttributeChange = (event) => {
    const attribute = event.target.value;
    setSelectedAttribute(attribute);

    // Update the description based on the selected category and attribute
  };

  // Call Chart API
  useEffect(() => {
    const selectedObject = selectedAttribute
      ? attributeDropDown[selectedCategory].find(
          (obj) => selectedAttribute === obj.attribute
        )
      : attributeDropDown[selectedCategory][0];
    const { description, when_matters } = selectedObject;
    setwhenMatters(when_matters ? when_matters : "");
    setSelectedObjectDescription(description || "");

    const config = {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    };
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/generate-chart?attribute=${selectedObject?.attribute}&slug=${slug}`,
        config
      )
      .then((res) => {
        setChart(res.data.data);
      });

    const containerDivs = document.getElementsByClassName("container-div");
    for (let i = 0; i < containerDivs.length; i++) {
      containerDivs[i].remove();
    }
    const legendBoxDivs = document.getElementsByClassName("legendBox");
    for (let i = 0; i < legendBoxDivs.length; i++) {
      legendBoxDivs[i].remove();
    }
  }, [attributeDropDown, selectedAttribute]);
  // console.log(slug);
  useComparisonChart(chart);
  return (
    <>
      <section className="ptb-80">
        <Container fluid>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">
                Comparison With All Other Vaccuum Cleaners
              </h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4} lg={4}>
              <div className="filtered-data-select justify-content-start">
                <span>Attribute category:</span>
                <Form.Select
                  aria-label="Category select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {Object.keys(attributeDropDown).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="filtered-data-select justify-content-start mt-3">
                <span>Attribute:</span>
                {selectedCategory && (
                  <Form.Select
                    aria-label="Attribute select"
                    value={selectedAttribute}
                    onChange={handleAttributeChange}
                  >
                    {attributeDropDown[selectedCategory].map((obj) => (
                      <option key={obj.attribute} value={obj.attribute}>
                        {obj.attribute}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </div>
              <p className="text-end para_content_text mt-3">
                {selectedObjectDescription && (
                  <span style={{ fontWeight: 800, fontSize: 17 }}>
                    What it is:
                  </span>
                )}
                {selectedObjectDescription}
                <br />
                {whenMatters && (
                  <span style={{ fontWeight: 800, fontSize: 17 }}>
                    When matters:
                  </span>
                )}
                {whenMatters}
              </p>
            </Col>
            <Col md={6} lg={6}>
              <h6 className="addClassData"></h6>
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
            <Col md={2} lg={2}>
              <div className="barData"></div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default CompareDropDown;
