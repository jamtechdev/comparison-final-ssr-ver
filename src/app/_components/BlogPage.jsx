"use client";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

import ProductSliderBlog from "@/components/Common/ProductSliderBlog/ProductSliderBlog";
import BlogSlider from "@/components/Common/BlogSlider/blogSlider";
import ProductSlider from "@/components/Common/ProductSlider/productSlider";
export default function BlogPage({ slug, blogData, categorySlug}) {
  return (
    <>
      <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <BreadCrumb
                firstPageName={categorySlug}
                secondPageName={{heading_title:blogData[0]?.data?.title}}
              />
            </Col>
            <Col md={12} lg={12} xl={9}>
              <h1 className="site-main-heading">{blogData[0]?.data?.title}</h1>
            </Col>

            <Col md={12} lg={12} xl={3}>
              <div className="user-info-section">
                {blogData[0]?.data?.author && (
                  <div className="user-section">
                    {blogData[0]?.data?.author?.image && (
                      <img
                        src={
                          blogData[0]?.data?.author?.image
                            ? blogData[0]?.data?.author?.image
                            : "/images/user.png"
                        }
                        width={0}
                        height={0}
                        sizes="100%"
                        alt=""
                      />
                    )}

                    <div className="user-detail">
                      <p>
                        <Link href={`/author/${blogData[0]?.data?.author?.id}`}>
                          {blogData[0]?.data?.author?.name}{" "}
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
                <span>
                  updated:
                  <i>{blogData[0]?.data?.updated_at}</i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="contentSec my-3">
        <Container>
          <Row>
            <Col lg={2} md={2} xs={12}>
              <div className="outline-section">
                <p>Outline</p>
                <ol>
                  <li>Overall</li>
                  <li>Technical</li>
                  <li>VS Average</li>
                  <li className="outline-active">
                    Review
                    <ol>
                      <li>Subtile</li>
                      <li>Subtile</li>
                    </ol>
                  </li>
                  <li>Pros/Cons</li>
                </ol>
              </div>
            </Col>
            <Col lg={8} md={8} xs={12}>
              <div className="content-para mt-1"  dangerouslySetInnerHTML={{__html:blogData[0]?.data?.text_part}}/>
              <div className="social-icon items-icon">
                <div className="twitter">
                  <i className="ri-twitter-fill"></i>
                </div>
                <div className="facebook">
                  <i className="ri-facebook-fill"></i>
                </div>
                <div className="printerest">
                  <i className="ri-pinterest-fill"></i>
                </div>
                <div className="linkedIn">
                  <i className="ri-linkedin-fill"></i>
                </div>
              </div>
              <div className="fonzi p-3 my-md-4 my-xs-0">
                <div className="profile mb-2">
                  <div className="avatar">
                    <img
                      src={
                        blogData[0]?.data?.author?.image
                          ? blogData[0]?.data?.author?.image
                          : "/images/user.png"
                      }
                      width={0}
                      height={0}
                      sizes="100%"
                      alt=""
                    />
                  </div>
                  <div className="label">
                    <Link href={`/author/${blogData[0]?.data?.author?.id}`}>
                      <p className="name">{blogData[0]?.data?.author?.name}</p>
                    </Link>
                    <p>{blogData[0]?.data?.author?.summary}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              lg={2}
              md={2}
              xs={12}
              className="mobile-hide productSlider-Container"
            >
              <Row className="mt-3">
                <Col md={12}>
                  <div className="heading-primary secondary mb-2">
                    Related Guides
                  </div>
                </Col>
                <Col md={12}>
                  <ProductSliderBlog
                    favSlider={blogData[0]?.data?.related_guides}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="blog-slides">
        <Container>
          <Row className="my-3">
            <Col md={12}>
              <h2 className="heading-primary secondary blog-post">
                Blog Posts
              </h2>
            </Col>
            <Col md={12}>
              <BlogSlider blogData={blogData[0]?.data?.related_blogs} />
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="my-3">
            <Col md={12}>
              <h2 className="heading-primary secondary related-guides">
                Related Guides
              </h2>
            </Col>
            <Col md={12}>
              <ProductSlider favSlider={blogData[0]?.data?.related_guides} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
