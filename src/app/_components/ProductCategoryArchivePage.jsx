import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";

const ProductCategoryArchivePage = ({ slug, categoryData }) => {
  return (
    <div>
      {categoryData && (
        <>
          <section className="breadcrumb-section">
            <Container>
              <Row>
                <Col md={12}>
                  <Breadcrumb firstPageName="Blog Archive" secondPageName="" />
                </Col>

                <Col md={12}>
                  <h1 className="heading-primary text-capitalize">{slug}</h1>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="blog_post_section py-5">
            <Container>
              {/*-------------POPULAR GUIDE -------------------*/}
              <Row>
                {categoryData[0]?.data?.popular_guides?.length > 0 && (
                  <Col md={12}>
                    <h2 className="heading-primary secondary">
                      Popular guides
                    </h2>
                  </Col>
                )}
                <Col md={12}>
                  <Row className="mt-3">
                    {categoryData[0]?.data?.popular_guides?.length > 0 &&
                      categoryData[0]?.data?.popular_guides?.map(
                        (item, index) => {
                          return (
                            <Col
                              lg={3}
                              md={4}
                              xs={6}
                              className="px-2 mb-3"
                              key={`guide-${index}`}
                            >
                              <div className="blog-card" role="button">
                                <Link href={`/guide/${item?.permalink}`}>
                                  <div className="blog-card-img">
                                    <Image
                                      src={
                                        item?.bannerImage
                                          ? item?.bannerImage
                                          : "/images/cat7.png"
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
                                </Link>
                                {/* <p className="category">{`item?.category`}</p> */}
                              </div>
                            </Col>
                          );
                        }
                      )}
                  </Row>
                </Col>
              </Row>
              {/*---------------- POPULAR REVIEWS -----------------------*/}
              <Row>
                {categoryData[0]?.data?.popular_reviews?.length > 0 && (
                  <Col md={12}>
                    <h2 className="heading-primary secondary">
                      Popular reviews
                    </h2>
                  </Col>
                )}
                <Col md={12}>
                  <Row className="mt-3">
                    {categoryData[0]?.data?.popular_reviews?.length > 0 &&
                      categoryData[0]?.data?.popular_reviews?.map(
                        (item, index) => {
                          return (
                            <Col
                              lg={3}
                              md={4}
                              xs={6}
                              className="px-2 my-3"
                              key={`review-${index}`}
                            >
                              <div className="blog-card" role="button">
                                <div className="blog-card-img">
                                  <Image
                                    src={
                                      item?.main_image
                                        ? item?.main_image
                                        : "/images/cat7.png"
                                    }
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    alt=""
                                    className="card-img"
                                  />
                                </div>
                                <p className="dates">SEPTEMBER 20 2022</p>
                                <span className="blog-title">{item?.name}</span>
                                <p className="category">{item?.category}</p>
                              </div>
                            </Col>
                          );
                        }
                      )}
                  </Row>
                </Col>
              </Row>
              {/*-------------------- POPULAR ARTICLES --------------------------------*/}
              <Row>
                {categoryData[0]?.data?.popular_blogs?.length > 0 && (
                  <Col md={12}>
                    <h2 className="heading-primary secondary">
                      Popular articles
                    </h2>
                  </Col>
                )}
                <Col md={12}>
                  <Row className="mt-3">
                    {categoryData[0]?.data?.popular_blogs?.length > 0 &&
                      categoryData[0]?.data?.popular_blogs?.map(
                        (item, index) => {
                          return (
                            <Col
                              lg={3}
                              md={4}
                              xs={6}
                              className="px-2 my-3"
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
                                        item?.banner_image
                                          ? item?.banner_image
                                          : "/images/cat7.png"
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
              </Row>
            </Container>
          </section>
        </>
      )}
      {!categoryData && <p>NO DATA FOUND</p>}
    </div>
  );
};

export default ProductCategoryArchivePage;
