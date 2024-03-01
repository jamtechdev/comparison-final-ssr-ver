"use client";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import OutlineGenerator from "../OutlineGenerator/OutlineGenerator";
import { searchForPatternAndReplace } from "@/hooks/useChart";
import Link from "next/link";

function GuidePageTextArea({ guide }) {
  const [currentHeading, setCurrentHeading] = useState("");
  // console.log(guide)
  // **************Here code for outline section *************************
  // add ids to matched text_part
  const content = guide?.text_third_part_main;
  // Regular expression to match h1, h2, and h3 tags
  const headingRegex = /<h([1-6])>(.*?)<\/h[1-6]>/g;
  // Function to add IDs to matched tags
  const addIds = (match, tag, content) => {
    const id = content.toLowerCase().replace(/\s+/g, "-"); // Generate ID from content
    return `<h${tag} id="${id}" >${content}</h${tag}>`;
  };
  // Replace the matched tags with IDs
  const modifiedContent = content.replace(headingRegex, addIds);
  // console.log(modifiedContent);
  // console.log(blogData[0])

  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log(entries?.length);
        entries.forEach((entry) => {
        //   console.log(entry?.isIntersecting);
          //   if (entry.isIntersecting) {
          //     const heading = entry.target;
          //     const headingId = heading.id;
          //     setCurrentHeading(headingId);
          //   }
        });
      },
      { threshold: 0.5 }
    );

    const headings = contentRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6"
    );
    headings.forEach((heading) => {
      // console.log(heading)
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, [currentHeading]); // Ensure this effect runs only once, adjust dependencies if needed
  // Ensure this effect runs only once, you can adjust dependencies if needed
  // console.log(currentHeading);
  return (
    <>
      <Row className="mt-3">
        <Col md={4} lg={2}>
          <div className="outline-section">
            <p>Outline</p>
            <OutlineGenerator
              currentIndexId={currentHeading}
              blogData={guide?.text_third_part_main}
            />
          </div>
        </Col>

        <Col md={8} lg={8}>
          <div
            id="shortCodeText"
            ref={contentRef}
            className="content-para mt-1"
            dangerouslySetInnerHTML={{
              __html: searchForPatternAndReplace(modifiedContent),
            }}
          />
          <br />
        </Col>
        <Col className="mobile-hide" md={12} lg={2}>
          <div className="ranking-section">
            <div className="site-main-heading">In Rankings</div>
            {guide?.recommended_guides &&
              guide?.recommended_guides.slice(0, 3)?.map((data, index) => {
                return (
                  <div className="product-card" key={index}>
                    <Link
                      className="product-link-cover"
                      href={`/${data?.category_url}/${data?.permalink}`}
                      style={{ color: "#326ebf" }}
                    ></Link>
                    <img
                      src={
                        data?.bannerImage === null
                          ? "/images/nofound.png"
                          : data?.bannerImage
                      }
                      width={0}
                      height={0}
                      sizes="100%"
                      alt=""
                    />
                    <span>{data?.short_name}</span>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default GuidePageTextArea;
