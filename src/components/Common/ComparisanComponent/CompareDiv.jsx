"use client";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Accordion,
  Tab,
  Nav,
  Form,
  Button,
  Tabs,
} from "react-bootstrap";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import Image from "next/image";
import CompareModal from "@/components/Common/Comparison/CompareModal";
import ComparisonTable from "../CompareTable/ComparisonTable";
import { deleteCompareProduct } from "@/redux/features/compareProduct/compareProSlice";
import CompareForm from "../Comparison/CompareForm";
import CompareCard from "./CompareCard";
import CompareAccordionTab from "./CompareAccordionTab";
import { useDispatch } from "react-redux";
function CompareDiv({
  comparisonData,
  categroyAttributes,
  graphComparisonProsCons,
  slug,
  categorySlug,
}) {
  const dispatch = useDispatch();
  const products = comparisonData.map((item) => item.data);
  const [isOpen, setIsOpen] = useState(false);
  const [compareProDataFirst, setCompareProDataFirst] = useState(
    products[0] || []
  );
  const [compareProDataSec, setCompareProDataSec] = useState(products[1] || []);
  const [compareProDataThird, setCompareProDataThird] = useState(
    products[2] || []
  );
  const handelRemoveProductFormComparison = (index) => {
    if (index === 0) {
      setCompareProDataFirst([]);
      dispatch(deleteCompareProduct({ key: "productFirst" }));
      return;
    }
    if (index === 1) {
      setCompareProDataSec([]);
      dispatch(deleteCompareProduct({ key: "productSecond" }));
      return;
    }
    if (index === 2) {
      dispatch(deleteCompareProduct({ key: "productThird" }));
      setCompareProDataThird([]);
      return;
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);
  // prepare data for comparison table component
  const comparisonTableProductData = [
    compareProDataFirst,
    compareProDataSec,
    compareProDataThird,
  ];
  // This funcation rmeove undefined and empty object
  let comparisonProductData = comparisonTableProductData.filter(
    (item) =>
      item !== "" &&
      typeof item !== "undefined" &&
      Object.keys(item).length !== 0
  );

  return (
    <>
      <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <BreadCrumb
                firstPageName={categorySlug}
                secondPageName={`${compareProDataFirst?.name || ""} vs ${
                  compareProDataSec?.name || ""
                } ${
                  compareProDataThird?.name
                    ? `vs ${compareProDataThird?.name}`
                    : ""
                }`}
              />
            </Col>
            <Col md={12}>
              <h1 className="site-main-heading">
                {compareProDataFirst?.name} vs {compareProDataSec?.name}{" "}
                {compareProDataThird?.name && `vs ${compareProDataThird?.name}`}
              </h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col md={12} className="table-section-mobile">
              <div className="comparison-tool">
                {/* First Crd */}
                <CompareCard
                  compareProduct={compareProDataFirst}
                  products={products}
                  productIndex={0}
                  setIsOpen={setIsOpen}
                  handelRemoveProductFormComparison={
                    handelRemoveProductFormComparison
                  }
                />
                <div className="comparison-vs-img">
                  <Image src="/images/vs.svg" width={118} height={40} alt="" />
                </div>
                {/* second  Card*/}
                <CompareCard
                  compareProduct={compareProDataSec}
                  products={products}
                  productIndex={1}
                  setIsOpen={setIsOpen}
                  handelRemoveProductFormComparison={
                    handelRemoveProductFormComparison
                  }
                />
                <div className="comparison-vs-img">
                  <Image src="/images/vs.svg" width={118} height={40} alt="" />
                </div>
                {/* Third Card */}
                <CompareCard
                  compareProduct={compareProDataThird}
                  products={products}
                  productIndex={2}
                  setIsOpen={setIsOpen}
                  handelRemoveProductFormComparison={
                    handelRemoveProductFormComparison
                  }
                />
              </div>
            </Col>
            <Col md={12} className="table-section-desktop">
              {/* <MobileComparisonTool /> */}
            </Col>
          </Row>
        </Container>
      </section>
      <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Graph Comparison</h2>
            </Col>
          </Row>
          <CompareAccordionTab
            sendProductProps={comparisonProductData}
            product={graphComparisonProsCons}
            pageType={"comparison"}
          />
        </Container>
      </section>
      <section className="ptb-80">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Table Comparison</h2>
            </Col>
            <Col md={12} className="table-section-mobile">
              <ComparisonTable
                products={comparisonProductData}
                categoryAttributes={categroyAttributes}
              />
            </Col>
            {/* <Col md={12} className="table-section-desktop">
              isko baad me krna h hai
              <MobileCompareTable />
            </Col> */}
          </Row>
        </Container>
      </section>
      <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Compare Other Products</h2>
              <CompareForm
                location="ON_MAIN_PAGE"
                handelCloseCompareModel={() => {}}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="ptb-80">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">
                Comparison With All Other Vaccuum Cleaners
              </h2>
            </Col>
            <Col md={12}>
              <div className="filtered-data-select justify-content-start">
                <span>Compare:</span>
                <Form.Select aria-label="Default select example">
                  <option>Power</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4} lg={3}>
              <p className="text-end para_content_text">
                Power is since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. ever
                galley of type and scrambled it to make a type specimen book.
              </p>
            </Col>
            <Col md={8} lg={9}>
              <Image
                className="graph-bar"
                src="/images/graph-bar.png"
                width={0}
                height={0}
                alt=""
                sizes="100%"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {isOpen && (
        <CompareModal
          setIsOpen={setIsOpen}
          compareProDataFirst={{
            name: compareProDataFirst?.name,
            permalink: compareProDataFirst?.permalink,
            category_id: compareProDataFirst.category_id,
            category_url: compareProDataFirst.category_url,
          }}
          compareProDataSec={{
            name: compareProDataSec?.name,
            permalink: compareProDataSec?.permalink,
            category_id: compareProDataSec.category_url,
            category_url: compareProDataSec.category_url,
          }}
        />
      )}
    </>
  );
}

export default CompareDiv;
