"use client";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";

function SinglePage({ singlePageData }) {
  // console.log(singlePageData?.page_phases);
  return (
    <>
      <section className="breadcrumb-section">
        <Container>
          <Row>
            <Col md={12}>
              <BreadCrumb
                productPhaseData={singlePageData?.page_phases}
                firstPageName={""}
                secondPageName={{name:singlePageData?.title}}
              />
            </Col>
            <Col md={12}>
              <h1 className="heading-primary">{singlePageData?.title}</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="contentSec pt-3 pb-5">
        <Container>
          <Row>
            <Col md={12}>
              <div
                className="contentPara"
                dangerouslySetInnerHTML={{
                  __html: singlePageData?.description,
                }}
              ></div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default SinglePage;
