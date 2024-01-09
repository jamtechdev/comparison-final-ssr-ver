"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";

function CompareDropDown({ attributeDropDown, product }) {
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(attributeDropDown)[0] || ""
  );
  const [selectedObjectDescription, setSelectedObjectDescription] =
    useState("");

  useEffect(() => {
    // Set the initial description based on the first category
    const firstObject = attributeDropDown[selectedCategory]?.[0] || {};
    const { description } = firstObject;
    setSelectedObjectDescription(description || "");
  }, [selectedCategory, attributeDropDown]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Update the description based on the selected category
    const firstObject = attributeDropDown[category]?.[0] || {};
    const { description } = firstObject;
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
                {selectedCategory}
                {selectedObjectDescription}
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
