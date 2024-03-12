"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";

const ProductCategoryArchivePage = ({ slug, categoryData }) => {
  console.log(categoryData);
  return (
    <div>
      {categoryData != null && (
        <>
          <section className="breadcrumb-section">
            <Container>
              <Row>
                <Col md={12}>
                  <BreadCrumb firstPageName={slug} secondPageName={""} />
                </Col>

                <Col md={12}>
                  <h1 className="heading-primary text-capitalize">{slug}</h1>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="blog_post_section py-3">
            <Container>
              {/*-------------POPULAR GUIDE -------------------*/}
              <Row className="py-3">
                <Col md={12}>
                  <h2 className="heading-primary secondary">Popular guides</h2>
                </Col>
                {/* if data found */}
                {categoryData[0]?.data?.popular_guides?.length > 0 && (
                  <Col md={12}>
                    <Row>
                      {categoryData[0]?.data?.popular_guides?.length > 0 &&
                        categoryData[0]?.data?.popular_guides?.map(
                          (item, index) => {
                            return (
                              <Col
                                lg={2}
                                md={3}
                                xs={6}
                                className="px-2 mb-3"
                                key={`guide-${index}`}
                              >
                                <div className="product-card">
                                  <Link
                                    href={`${item?.category_url}/${item?.permalink}`}
                                    style={{ color: "#27304e" }}
                                    className="product-link-cover"
                                  ></Link>
                                  <Image
                                    src={
                                      item?.bannerImage === null
                                        ? `/images/nofound.png`
                                        : item?.bannerImage
                                    }
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    alt=""
                                  />
                                  <div className="product-name-wrapper">
                                    <span>{item?.short_name}</span>
                                  </div>
                                </div>
                              </Col>
                            );
                          }
                        )}
                    </Row>
                  </Col>
                )}
                {/* if no data found */}
                {categoryData[0]?.data?.popular_guides?.length == 0 && (
                  <p className="">No records to display</p>
                )}
              </Row>
              {/*---------------- POPULAR REVIEWS -----------------------*/}
              {categoryData[0]?.data?.popular_reviews?.length > 0 && (
                <Row className="py-3">
                  <Col md={12}>
                    <h2 className="heading-primary secondary">
                      Popular reviews
                    </h2>
                  </Col>
                  {/* if data found */}

                  <Col md={12}>
                    <Row>
                      {categoryData[0]?.data?.popular_reviews?.length > 0 &&
                        categoryData[0]?.data?.popular_reviews?.map(
                          (item, index) => {
                            return (
                              <Col
                                lg={2}
                                md={3}
                                xs={6}
                                className="px-2 mb-3"
                                key={`review-${index}`}
                              >
                                <Link
                                  href={`/${item?.category_url}/${item?.permalink}`}
                                >
                                  <div className="review-wrapper">
                                    <div className="review-card">
                                      <Image
                                        src={
                                          item?.main_image ||
                                          "/images/nofound.png"
                                        }
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        alt=""
                                      />
                                      <div className="footer_content">
                                        <span>{item?.name}</span>
                                        <p>{item?.category}</p>
                                      </div>
                                      <span
                                        className="rating_count"
                                        style={{
                                          background:
                                            item.rating >= 7.5
                                              ? "#093673"
                                              : item.rating >= 5 &&
                                                item.rating < 7.5
                                              ? "#437ECE"
                                              : "#85B2F1",
                                        }}
                                      >
                                        {item?.overall_score}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </Col>
                            );
                          }
                        )}
                    </Row>
                  </Col>

                  {/* if no data found */}
                  {categoryData[0]?.data?.popular_reviews?.length == 0 && (
                    <p className="">No records to display</p>
                  )}
                </Row>
              )}
              {/*-------------------- POPULAR ARTICLES --------------------------------*/}
              {categoryData[0]?.data?.popular_blogs?.length > 0 && (
                <Row className="py-3">
                  <Col md={12}>
                    <h2 className="heading-primary secondary">
                      Popular articles
                    </h2>
                  </Col>
                  {/* if data found */}

                  <Col md={12}>
                    <Row>
                      {categoryData[0]?.data?.popular_blogs?.length > 0 &&
                        categoryData[0]?.data?.popular_blogs?.map(
                          (item, index) => {
                            return (
                              <Col
                                lg={3}
                                md={3}
                                xs={6}
                                className="px-2 mb-3"
                                key={`articles-${index}`}
                              >
                                <div className="blog-card" role="button">
                                  <Link
                                    href={`/${
                                      item.category_url
                                        ? item.category_url
                                        : item.primary_category.toLowerCase()
                                    }/${item?.permalink}`}
                                  >
                                    <div className="blog-card-img">
                                      <Image
                                        src={
                                          item?.banner_image === null
                                            ? "/images/cat7.png"
                                            : item?.banner_image
                                        }
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        alt=""
                                        className="card-img"
                                      />
                                    </div>
                                    <p className="dates">SEPTEMBER 20 2022</p>
                                    <span className="blog-title">
                                      {item?.title}
                                    </span>
                                    <p className="category">{item?.category}</p>
                                  </Link>
                                </div>
                              </Col>
                            );
                          }
                        )}
                    </Row>
                  </Col>

                  {/* if no data found */}
                  {categoryData[0]?.data?.popular_blogs?.length == 0 && (
                    <p className="">No records to display</p>
                  )}
                </Row>
              )}
            </Container>
          </section>
        </>
      )}
      {categoryData == null && <p>NO DATA FOUND</p>}
    </div>
  );
};

export default ProductCategoryArchivePage;
