import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import ProductSlider from "@/components/Common/ProductSlider/productSlider";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
function CategoryArchive({ slug, ArchiveData }) {
  return (
    <>
      <section className="breadcrumb-section">
        <Container>
          <Row>
            <Col md={12}>
              <BreadCrumb
                firstPageName=""
                secondPageName={ArchiveData[0].data}
              />
            </Col>
            <Col md={12}>
              <h1 className="heading-primary">{ArchiveData[0].data?.title}</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="blog_post_section py-5">
        <Container>
          {ArchiveData[0].data &&
            ArchiveData[0].data?.categories?.map((item, index) => {
              return (
                <Row key={index}>
                  <Col md={12}>
                    <div className="heading-primary secondary">
                      {item?.title}
                    </div>
                  </Col>
                  <Col md={12}>
                    <ProductSlider
                      favSlider={item?.guides}
                      indexSlider={index}
                    />
                  </Col>
                </Row>
              );
            })}
        </Container>
      </section>
    </>
  );
}

export default CategoryArchive;
