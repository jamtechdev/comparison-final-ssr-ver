"use client";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import OutlineGenerator from "../OutlineGenerator/OutlineGenerator";
import { searchForPatternAndReplace } from "@/hooks/useChart";
import Link from "next/link";

function GuidePageTextArea({ guide }) {
  const [activeOutlineId, setActiveOutlineId] = useState("");
  const contentRef = useRef(null);
  // This code for text part and outline
  useEffect(() => {
    const handleScroll = () => {
      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );

      let closestHeading = null;
      let closestDistance = Number.MAX_VALUE;

      headings.forEach((heading) => {
        const bounding = heading.getBoundingClientRect();
        const distanceToTop = bounding.top;

        if (distanceToTop >= 0 && distanceToTop < closestDistance) {
          closestHeading = heading;
          closestDistance = distanceToTop;
        }
      });

      if (closestHeading) {
        setActiveOutlineId(closestHeading.id);
      }

      const shortCodeText = document.getElementById("shortCodeText");
      if (shortCodeText) {
        const shortCodeTextBounding = shortCodeText.getBoundingClientRect();
        if (
          shortCodeTextBounding.top >= 0 &&
          shortCodeTextBounding.bottom <= window.innerHeight
        ) {
          setActiveOutlineId("shortCodeText");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const addIdsToHeadings = (content) => {
    const headings = content.match(/<h[2-6][^>]*>.*?<\/h[2-6]>/g) || [];

    headings.forEach((heading) => {
      const id = heading
        .replace(/<\/?[^>]+(>|$)/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      const newHeading = heading.replace(">", ` id="${id}">`);
      content = content.replace(heading, newHeading);
    });

    return content;
  };
  const contentWithIds = addIdsToHeadings(guide?.text_third_part_main);
  return (
    <>
      <Row className="mt-3">
        <Col md={4} lg={2}>
          <div className="outline-section">
            <p>{guide && guide?.page_phrases?.outline}</p>
            <OutlineGenerator
              currentIndexId={activeOutlineId}
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
              __html: searchForPatternAndReplace(contentWithIds),
            }}
          />
          <br />
        </Col>
        <Col className="mobile-hide" md={12} lg={2}>
          <div className="ranking-section">
            <div className="site-main-heading">
              {guide && guide?.page_phrases?.in_rankings}
            </div>
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
