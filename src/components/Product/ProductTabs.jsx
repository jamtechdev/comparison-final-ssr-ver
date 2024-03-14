"use client";
import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Image from "next/image";
import ExperReviwes from "../Common/ExpertReviews/ExperReviwes";
import Rating from "../Common/Rating/Rating";
import ProductReviewTab from "./ProductReviewTab";
import VideoReviews from "../Common/VideoReviews/VideoReviews";

function ProductTabs({
  productReview,
  productPhaseData,
  expertReview,
  videoReview,
}) {
  // console.log(expertReview)
  return (
    <>
      {" "}
      {productReview && productReview.length > 0 && (
        <section className="ptb-80 bg-color">
          <Container>
            <Row>
              <Col md={12}>
                <h2 className="site-main-heading">{productPhaseData}</h2>
              </Col>

              <Col md={12} className="site_tabs_hide">
                <Tabs
                  defaultActiveKey="tab-1"
                  id="Review-tab"
                  className="mb-3 site_tabs site_tabs_hide"
                >
                  {productReview && productReview.length > 0 && (
                    <Tab eventKey="tab-1" title="User’s Reviews">
                      <ProductReviewTab productReview={productReview} />
                    </Tab>
                  )}

                  {expertReview && expertReview.length > 0 && (
                    <Tab eventKey="tab-2" title="Expert Reviews">
                      <ExperReviwes expertReview={expertReview} />
                    </Tab>
                  )}

                  {videoReview && videoReview.length > 0 && (
                    <Tab eventKey="tab-3" title="Video Reviews">
                      <VideoReviews videoReview={videoReview} />
                    </Tab>
                  )}
                </Tabs>
              </Col>
              {/* <Col md={12} className="">
              <MobileAccordion />
            </Col> */}
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}

export default ProductTabs;
