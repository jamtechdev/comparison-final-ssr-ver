"use client";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

function AboutPage({ slug, aboutData }) {
  // console.log(aboutData);
  return (  
    <>
      <section className="breadcrumb-section">
        <Container>
          <Row>
            <Col md={12}>
              <BreadCrumb
                firstPageName={"About us"}
                secondPageName={""} 
                
              />
            </Col>

            <Col md={12}>
              <h1 className="heading-primary">About us</h1>
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
                dangerouslySetInnerHTML={{ __html: aboutData?.content }}
              ></div>
            </Col>

            <Col md={4} className="about-category-Sec d-none">
              <h2 className="heading-primary secondary">See also</h2>
              <Row className="mt-3">
                <Col md={12} xs={6}>
                  <div className="category-section">
                    <Image
                      src="/images/how-work.png"
                      width={0}
                      height={0}
                      sizes="100%"
                      alt=""
                      className="card-img"
                    />
                    <span className="category_name">How our ranking works</span>
                  </div>
                </Col>
                <Col md={12} xs={6} className="ps">
                  <div className="category-section">
                    <Image
                      src="/images/tab.png"
                      width={0}
                      height={0}
                      sizes="100%"
                      alt=""
                      className="card-img"
                    />
                    <span className="category_name">Blog</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading mt-3">Our team</h2>
            </Col>
            {aboutData &&
              aboutData?.authors?.map((item, index) => {
                return (
                  <>
                    <Col md={3} lg={3}>
                      <Link href={`/author/${item?.id}`}>
                        <div className="author-page-section about-card-section">
                          <img
                            src={
                              item?.image ? item?.image : "/images/nofound.png"
                            }
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                          />

                          <div className="author-page-section-footer">
                            <span>{item?.name}</span>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  </>
                );
              })}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AboutPage;
