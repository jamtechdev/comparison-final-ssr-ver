"use client";
import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Image from "next/image";
import ExperReviwes from "../Common/ExpertReviews/ExperReviwes";
import Rating from "../Common/Rating/Rating";
import ProductReviewTab from "./ProductReviewTab";
import VideoReviews from "../Common/VideoReviews/VideoReviews";
import MobileAccordion from "../Common/MobileAccordion/mobileAccordion";

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
      <section className="ptb-80 bg-color">
        {productReview && productReview.length > 0 && (
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
              <Col md={12} className="">
                <MobileAccordion
                  productReview={productReview}
                  expertReview={expertReview}
                  videoReview={videoReview}
                />
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </>
  );
}

export default ProductTabs;
