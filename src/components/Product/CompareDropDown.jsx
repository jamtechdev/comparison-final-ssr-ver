"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";
import useChart from "@/hooks/useChart";
import axios from "axios";
import useComparisonChart from "@/hooks/useComparisonChart";

function CompareDropDown({ attributeDropDown, product, slug }) {
  // console.log(attributeDropDown)
  const [selectedItem, setSelectedItem] = useState(
    attributeDropDown[0] || null
  );
  const [chart, setChart] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState(
    (attributeDropDown[0] && attributeDropDown[0].attributes[0]) || null
  );
  // console.log(selectedAttribute)

  useEffect(() => {
    setSelectedItem(attributeDropDown[0] || null);
    setSelectedAttribute(
      (attributeDropDown[0] && attributeDropDown[0].attributes[0]) || null
    );
  }, [attributeDropDown]);
  useEffect(() => {
    if (selectedAttribute) {
      const config = {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
      };
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/generate-chart?attribute=${selectedAttribute?.name}&slug=${slug}`,
          config
        )
        .then((res) => {
          setChart(res.data.data);
        });
    }

    const containerDivs = document.getElementsByClassName("container-div");
    for (let i = 0; i < containerDivs.length; i++) {
      containerDivs[i].remove();
    }
    const legendBoxDivs = document.getElementsByClassName("legendBox");
    for (let i = 0; i < legendBoxDivs.length; i++) {
      legendBoxDivs[i].remove();
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

  useComparisonChart(chart);
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
          </Row>
          <Row className="mt-3">
            <Col md={4} lg={4}>
              <div className="filtered-data-select justify-content-start">
                <span>Attribute category:</span>
                <Form.Select
                  aria-label="Category select"
                  onChange={handleItemChange}
                  value={attributeDropDown.indexOf(selectedItem)}
                >
                  {attributeDropDown.map((item, index) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="filtered-data-select justify-content-start mt-3">
                <span>Attribute:</span>
                {selectedItem && (
                  <Form.Select
                    aria-label="Attribute select"
                    onChange={handleAttributeChange}
                    value={selectedItem.attributes.indexOf(selectedAttribute)}
                  >
                    {selectedItem.attributes.map((attribute, index) => (
                      <option key={index} value={index}>
                        {attribute.name}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </div>
              <p className="text-end para_content_text mt-3">
                {selectedAttribute && (
                  <span style={{ fontWeight: 800, fontSize: 17 }}>
                    What it is:
                  </span>
                )}
                {selectedAttribute.description}
                <br />
                {selectedAttribute && (
                  <span style={{ fontWeight: 800, fontSize: 17 }}>
                    When matters:
                  </span>
                )}
                {selectedAttribute.when_matters}
              </p>
            </Col>
            <Col md={8} lg={8}>
              <h6 className="addClassData"></h6>
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
