"use client";
import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import React, { useState } from "react";
import SearchList from "@/components/Search/SearchList";
import LatesGuid from "@/components/Common/ProductSlider/LatesGuid";
import Compare from "@/components/Common/Compare/Compare";
import Sponsor from "@/components/Common/Sponsor/Sponsor";
import Category from "@/components/Common/Category/Category";
import ProductSlider from "@/components/Common/ProductSlider/productSlider";
import ReviewSlider from "@/components/Common/ReviewSlider/reviewSlider";
import BlogSlider from "@/components/Common/BlogSlider/blogSlider";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainPage({ bannerCounts, favSlider }) {
  const [search, setsearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };
  const handleSearch = (e) => {
    setsearch(e.target.value);
  };
  const router = useRouter();
  return (
    <>
      <section className="hero_section home">
        <Container>
          <Row>
            <Col md={12} className="form-col">
              <h1>...Where Product’s DATA and REVIEWS Meet</h1>
              <p>Discover the Best, Leave the Rest!</p>
              <Form className="d-flex hero-searchbar">
                <div className="search-icon">
                  <i className="ri-search-line"></i>
                </div>

                <Form.Control
                  type="text"
                  value={search}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleBlur}
                  onChange={handleSearch}
                  placeholder="Search The Guide or Product You Need..."
                  aria-label="Search"
                />
                <Button className="search-btn">Search</Button>
                <SearchList search={search} isFocused={isFocused} />
              </Form>
            </Col>
          </Row>
          <div className="hero-card-container">
            <Row>
              {bannerCounts ? (
                <>
                  {Object.values(bannerCounts).map((section, index) => (
                    <Col className="p-2" lg={3} md={6} xs={6} key={index}>
                      <div className="hero-card-content">
                        <span className="count">{section?.count}</span>
                        <span className="card-heading">{section?.heading}</span>
                        <span className="card-subheading">
                          {section?.subheading}
                        </span>
                      </div>
                    </Col>
                  ))}
                </>
              ) : (
                <>
                  <Col className="p-2" lg={12}>
                    <h2>No Data Found</h2>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </Container>
      </section>

      <Container className="ptb-80">
        <Row>
          <Col md={12}>
            <h2 className="site-main-heading">Favourite Guides</h2>
            {favSlider && favSlider.favorite_guides && (
              <>
                <LatesGuid favSlider={favSlider.favorite_guides} />
              </>
            )}
          </Col>
        </Row>
      </Container>

      <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Compare Products</h2>
              <Compare />
            </Col>
          </Row>
        </Container>
      </section>
      {favSlider && favSlider?.as_seen_on.length > 0 && (
        <section className="ptb-80">
          <Container>
            <Row>
              <Col md={12}>
                <h2 className="site-main-heading">As Seen On</h2>
                <Sponsor asSeenOn={favSlider?.as_seen_on} />
              </Col>
            </Row>
          </Container>
        </section>
      )}
      {favSlider && favSlider?.categories.length > 0 && (
        <section className="ptb-80">
          <Container>
            <Row>
              <Col md={12}>
                <h2 className="site-main-heading">Categories</h2>
                <Category categories={favSlider?.categories} />
              </Col>
            </Row>
          </Container>
        </section>
      )}
      <section className="ptb-80 bg-pattern">
        <Container>
          <Row>
            <Col lg={7} md={12}>
              <h2 className="site-main-heading">How Our Rankings Work?</h2>
              <p
                className="inner-text-content mt-3"
                dangerouslySetInnerHTML={{
                  __html: favSlider && favSlider?.how_ranking_work,
                }}
              ></p>
            </Col>
            <Col lg={5} md={12} className="top-space">
              <Image
                className="site_image"
                src="/images/side-img.png"
                width={10}
                height={10}
                alt="How Our Rankings Work Image"
                sizes="100%"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {favSlider &&
        favSlider?.categories?.map((data, index) => {
          return (
            <div key={index}>
              <section className="ptb-80 bg-cat">
                <Container className="small-p-0 ">
                  <Row key={data?.id}>
                    <Col md={12} xs={12}>
                      <h2
                        role="button"
                        className="text-center electronics"
                        style={{
                          backgroundImage: `url(${data?.rectangle_image})`,
                        }}
                        onClick={() => {
                          router.push(
                            `/${data?.primary_archive_category.toLowerCase()}`
                          );
                        }}
                      >
                        {data?.primary_archive_category}
                      </h2>
                    </Col>
                  </Row>
                </Container>
              </section>
              {data?.categories?.length > 0 && (
                <section className="mt-3">
                  <Container>
                    <Row>
                      <Col md={12}>
                        <h3 className="site-main-heading">
                          Product categories
                        </h3>
                        <div className="product-categories-container">
                          {data?.categories?.map((item, index) => {
                           
                            return (
                              <div
                                className="product-categories-item"
                                key={index}
                                onClick={() => {
                                  router.push(
                                    `/${item?.category_url.toLowerCase()}`
                                  );
                                }}
                              >
                                {item?.title}
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </section>
              )}

              <Container className="mt-3">
                <Row>
                  <Col md={12}>
                    <h3 className="site-main-heading">Guides</h3>
                    <Tabs
                      defaultActiveKey="tab-1"
                      id="Review-tab"
                      className="mb-3 site_tabs"
                    >
                      <Tab eventKey="tab-1" title="Most Popular Guides">
                        <ProductSlider favSlider={data?.popular_guides} />
                      </Tab>
                      <Tab eventKey="tab-2" title="Latest Guides">
                        <LatesGuid favSlider={data?.latest_guides} />
                      </Tab>
                    </Tabs>
                  </Col>
                </Row>
              </Container>

              <Container className="mt-3">
                <Row>
                  <Col md={12}>
                    <h3 className="site-main-heading">Review</h3>
                    <Tabs
                      defaultActiveKey="tab-1"
                      id="Review-tab"
                      className="mb-3 site_tabs"
                    >
                      <Tab eventKey="tab-1" title="Most Popular Reviews">
                        <ReviewSlider favSlider={data?.popular_reviews} />
                      </Tab>
                      <Tab eventKey="tab-2" title="Latest Reviews">
                        <ReviewSlider favSlider={data?.latest_reviews} />
                      </Tab>
                    </Tabs>
                  </Col>
                </Row>
              </Container>

              {data?.blog_posts && data?.blog_posts?.length > 0 && (
                <Container className="my-3">
                  <Row>
                    <Col md={12}>
                      <h3 className="site-main-heading">Blog Posts</h3>
                      <BlogSlider blogData={data.blog_posts} />
                    </Col>
                    {/* <Col md={12} className="text-center">
                      <Button
                        className="view-blog"
                        onClick={() => {
                          router.push(
                            `/all-blog/${data?.primary_archive_category}`
                          );
                        }}
                      >
                        View All Blog Posts
                        <i className="ri-arrow-right-s-line"></i>
                      </Button>
                    </Col> */}
                  </Row>
                </Container>
              )}
            </div>
          );
        })}
    </>
  );
}
