"use client";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import useChart, { searchForPatternAndReplace } from "@/hooks/useChart";
import ProductSliderBlog from "@/components/Common/ProductSliderBlog/ProductSliderBlog";
import BlogSlider from "@/components/Common/BlogSlider/blogSlider";
import ProductSlider from "@/components/Common/ProductSlider/productSlider";
import OutlineGenerator from "@/components/Common/OutlineGenerator/OutlineGenerator";
export default function BlogPage({ slug, blogData, categorySlug }) {
  const [currentHeading, setCurrentHeading] = useState("");
  // //  *******This part of code extract h1,h2,h3 from text_part and add ids to them*************
  const content = blogData[0]?.data?.text_part;
  // Regular expression to match h1, h2, and h3 tags
  const headingRegex = /<h([1-6])>(.*?)<\/h[1-6]>/g;
  // Function to add IDs to matched tags
  const addIds = (match, tag, content) => {
    const id = content.toLowerCase().replace(/\s+/g, "-"); // Generate ID from content
    return `<h${tag} id="${id}" >${content}</h${tag}>`;
  };
  // Replace the matched tags with IDs
  const modifiedContent = content.replace(headingRegex, addIds);
  // console.log(blogData[0])

  const contentRef = useRef(null);

  useEffect(() => {
    let lastHeadingId = null; // Variable to store the ID of the last heading that entered the viewport

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
          console.log(entry.isIntersecting);
          if (entry.isIntersecting) {
            const heading = entry.target;
            lastHeadingId = heading.id; // Update the lastHeadingId variable
          }
        });

        // Update the currentHeading state with the last heading ID
        if (lastHeadingId !== null && lastHeadingId !== currentHeading) {
          setCurrentHeading(lastHeadingId);
        }
      },
      { threshold: 1 }
    );
    const shortTextElement = contentRef.current.querySelector("#shortText");
    if (shortTextElement) {
      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      headings.forEach((heading) => {
        observer.observe(heading);
      });

      return () => {
        headings.forEach((heading) => {
          observer.unobserve(heading);
        });
      };
    }
  }, [currentHeading]);
  console.log(currentHeading);

  // Include currentHeading in the dependency array

  return (
    <>
      {/* <h1>{blogData[0]?.data?.text_part}</h1> */}
      <div>{useChart()}</div>
      <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <BreadCrumb
                firstPageName={categorySlug}
                secondPageName={{ heading_title: blogData[0]?.data?.title }}
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
          <div className="custom-row">
            <div className="left-side-bar">
              <div className="outline-section">
                <p>Outline</p>
                <OutlineGenerator
                  currentIndexId={currentHeading}
                  blogData={blogData[0]?.data?.text_part}
                />
                {/* <ol>
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
                </ol> */}
              </div>
            </div>
            <div className="center-section ">
              <div
                id="shortCodeText"
                ref={contentRef}
                className="content-para mt-1"
                dangerouslySetInnerHTML={{
                  __html: searchForPatternAndReplace(modifiedContent),
                }}
              />
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
            </div>
            <div className="mobile-hide right-side-bar productSlider-Container">
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
            </div>
          </div>
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
