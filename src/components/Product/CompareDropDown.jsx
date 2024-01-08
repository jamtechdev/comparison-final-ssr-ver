"use client";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";

function CompareDropDown({ attributeDropDown, product }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedObjectDescription, setSelectedObjectDescription] =
    useState("");
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Assuming each category has an array of objects with a "name" property
    const firstObject = attributes[category]?.[0] || {};
    const { name, description } = firstObject;

    setSelectedObjectName(name || "");
    setSelectedObjectDescription(description || "");
  };

  return (
    <>
      <section className="ptb-80">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">{product}</h2>
            </Col>
            <Col md={12}>
              <div className="filtered-data-select justify-content-start">
                <span>Compare:</span>

                <Form.Select
                  aria-label="Default select example"
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
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4} lg={3}>
              <p className="text-end mobile-content-left para_content_text">
                <p>{selectedCategory}</p>
              </p>
            </Col>
            <Col md={8} lg={9}>
              <Image
                className="graph-bar"
                src="/images/graph-bar.png"
                width={0}
                height={0}
                alt=""
                sizes="100%"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default CompareDropDown;
