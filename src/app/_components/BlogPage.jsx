import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

import ProductSliderBlog from "@/components/Common/ProductSliderBlog/ProductSliderBlog";

export default function BlogPage({ slug, blogData }) {
  console.log(blogData);
  return (
    <>
      {/* <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <BreadCrumb
                firstPageName="Blog"
                secondPageName={blogData?.data?.title}
              />
            </Col>
            <Col md={12} lg={12} xl={9}>
              <h1 className="site-main-heading">{blogData?.data?.title}</h1>
            </Col>

            <Col md={12} lg={12} xl={3}>
              <div className="user-info-section">
                {blogData?.data?.author && (
                  <div className="user-section">
                    {blogData?.data?.author?.image && (
                      <img
                        src={
                          blogData?.data?.author?.image
                            ? blogData?.data?.author?.image
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
                        <Link href={`/author/${blogData?.data?.author?.id}`}>
                          {blogData?.data?.author?.name}{" "}
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
                <span>
                  updated:
                  <i>{blogData?.data?.updated_at}</i>
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
              <div className="content-para mt-1">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      blogData.data?.text_part && blogData.data?.text_part,
                  }}
                ></p>

                <div className="kitchen">
                  <Image
                    src="/images/kitchen.png"
                    width={0}
                    height={0}
                    sizes="100%"
                    alt=""
                    className="kitchen-img"
                  />
                </div>
              </div>
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
                        blogData?.data?.author?.image
                          ? blogData?.data?.author?.image
                          : "/images/user.png"
                      }
                      width={0}
                      height={0}
                      sizes="100%"
                      alt=""
                    />
                  </div>
                  <div className="label">
                    <Link href={`/author/${blogData?.data?.author?.id}`}>
                      <p className="name">{blogData?.data?.author?.name}</p>
                    </Link>
                    <p>{blogData?.data?.author?.summary}</p>
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
                    favSlider={blogData?.data?.related_guides}
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
              <BlogSlider blogData={blogData?.data?.related_blogs} />
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
              <ProductSliderBlog favSlider={blogData?.data?.related_guides} />
            </Col>
          </Row>
        </Container>
      </section> */}
    </>
  );
}
