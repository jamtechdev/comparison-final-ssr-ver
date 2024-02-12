"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";
import useChart from "@/hooks/useChart";
import axios from "axios";
import comparisonChart from "@/hooks/comparisonChart";

function CompareDropDown({ attributeDropDown, product }) {
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
    const selectedObject =
      attributeDropDown[selectedCategory]?.find(
        (obj) => obj.attribute === selectedAttribute
      ) || {};
    // console.log(selectedObject, "selected object");
    const { description, when_matters } = selectedObject;
    setwhenMatters(when_matters ? when_matters : "");
    setSelectedObjectDescription(description || "");
  }, [selectedCategory, selectedAttribute, attributeDropDown]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    };
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/generate-chart?attribute=${selectedAttribute}`,
        config
      )
      .then((res) => {
        setChart(res.data.data);
      });
  }, [selectedAttribute]);
  console.log(chart,chart?.type);

  comparisonChart(chart);
  return (
    <>
      <section className="ptb-80">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">
                Comparison With All Other Vaccuum Cleaners
              </h2>
            </Col>
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
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4} lg={4}>
              <p className="text-end para_content_text">
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
            <Col md={8} lg={8}>
              <h6 className="addClassData">

              </h6>
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
          </Row>
        </Container>
      </section>
    </>
  );
}

export default CompareDropDown;
