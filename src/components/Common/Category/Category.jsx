'use client';
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

const IMAGE_ALT_TEXT = "Category Images";
export default function Category({ categories }) {
  // console.log
  (categories)
  return (
    <Row>
      {categories?.map((section, index) => (
        <Col
          xl={3}
          lg={4}
          md={6}
          xs={6}
          key={index}
          // onClick={() => {
          //   router.push(`/${section?.primary_archive_category}`);
          // }}
        >
          <div className="category-section">
            <a href={`/${section?.primary_archive_category}`}>
              <img
                src={
                  section?.square_image
                    ? section?.square_image
                    : "/images/nofound.png"
                }
                width={0}
                height={0}
                sizes="100%"
                alt={IMAGE_ALT_TEXT}
              />
              <span className="category_name">
                {section?.primary_archive_category || "NOT FOUND"}
              </span>
            </a>
          </div>
        </Col>
      ))}
    </Row>
  );
}
