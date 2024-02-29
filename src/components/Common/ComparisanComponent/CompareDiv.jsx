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
import {
  addCompareProduct,
  deleteCompareProduct,
  updateCompareProduct,
} from "@/redux/features/compareProduct/compareProSlice";
import CompareForm from "../Comparison/CompareForm";
import CompareCard from "./CompareCard";
import CompareAccordionTab from "./CompareAccordionTab";
import { useDispatch, useSelector } from "react-redux";
import CompareDropDown from "@/components/Product/CompareDropDown";
import { useRouter } from "next/navigation";
import { getAttributeHalf } from "@/_helpers";
import ProductSlider from "../ProductSlider/productSlider";
import GuidePageTextArea from "../GuidePageOutline/GuidePageTextArea";
function CompareDiv({
  comparisonData,
  categroyAttributes,
  graphComparisonProsCons,
  slug,
  categorySlug,
}) {
  const dispatch = useDispatch();
  const products = comparisonData.map((item) => item.data);
  // console.log(products[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [compareProDataFirst, setCompareProDataFirst] = useState(
    (products[0] && products[0]) || []
  );

  const [compareProDataSec, setCompareProDataSec] = useState(
    (products[1] && products[1]) || []
  );
  const [compareProDataThird, setCompareProDataThird] = useState(
    (products[2] && products[2]) || []
  );
  const [otherPermalinks, setOtherPermalinks] = useState([]);
  const router = useRouter();
  const handelRemoveProductFormComparison = (index) => {
    // Remove the last product's URL from the comparison store.
    let remainingProductUrl = "";
    if (index === 0) {
      setCompareProDataFirst([]);
      dispatch(deleteCompareProduct({ key: "productFirst" }));
      remainingProductUrl = [compareProDataSec, compareProDataThird];
    } else if (index === 1) {
      setCompareProDataSec([]);
      dispatch(deleteCompareProduct({ key: "productSecond" }));
      remainingProductUrl = [compareProDataThird, compareProDataFirst];
    } else if (index === 2) {
      dispatch(deleteCompareProduct({ key: "productThird" }));
      setCompareProDataThird([]);
      remainingProductUrl = [compareProDataFirst, compareProDataSec];
    }
    // Optionally, you can store the updated permalinks array in state
    const updatedPermalinks = [...remainingProductUrl, ...otherPermalinks];
    let removeEmptyArray = updatedPermalinks.filter(
      (item) =>
        item !== "" &&
        typeof item !== "undefined" &&
        Object.keys(item).length !== 0
    );
    // Log the last remaining product URL
    if (removeEmptyArray.length === 1) {
      const lastPermalink = removeEmptyArray[0];
      router.push(
        `/${lastPermalink?.category_url}/${lastPermalink?.permalink}`
      );
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
  // console.log(comparisonProductData?.length);

  const productCopy = comparisonProductData;
  const productAttributes = {};
  comparisonProductData[0]?.attributes?.forEach((attribute) => {
    // Extract the category name for the attribute
    const categoryName = attribute?.attribute_category?.name;
    // Check if the category name exists in the productAttributes object

    if (!productAttributes[categoryName]) {
      // If not, create an empty array for the category
      productAttributes[categoryName] = [];
    }
    // Push the current attribute to the array corresponding to its category
    productAttributes[categoryName]?.push(attribute);
  });
  productCopy["attributes"] = productAttributes;
  // console.log(comparisonTableProductData)

  return (
    <>
      <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <BreadCrumb
                pageType="comparision"
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
      {/* <section>
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">
                {`${compareProDataFirst?.name || ""} vs ${
                  compareProDataSec?.name || ""
                } ${
                  compareProDataThird?.name
                    ? `vs ${compareProDataThird?.name}`
                    : ""
                }`}
              </h2>
            </Col>
          </Row>
          <GuidePageTextArea  />
        </Container>
      </section> */}
      <section className="ptb-80 bg-color">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">
                Should You Buy {compareProDataFirst?.name} or{" "}
                {compareProDataSec?.name}{" "}
                {compareProDataThird?.name && `or ${compareProDataThird?.name}`}
              </h2>
            </Col>
            <Col md={6}>
              <div className="pros-corns-section pros">
                <div className="pros-header">
                  Who SHOULD BUY {compareProDataFirst?.name}?
                </div>
                {/* {product?.should_buy.length === 0 && (
                  <h3 className="no-data text-center mt-2">No data Found</h3>
                )} */}
                {/* {console.log(product?.should_not_buy)} */}
                {/* <ul>
                  {product &&
                    product?.should_buy?.map((item, index) => {
                      return (
                        <>
                          <li
                            key={index}
                            style={{ color: "rgba(39, 48, 78, 0.7)" }}
                          >
                            {item}
                          </li>
                        </>
                      );
                    })}
                </ul> */}
              </div>
            </Col>
            <Col md={6}>
              <div className="pros-corns-section corns">
                <div className="pros-header">
                  Who SHOULD NOT BUY {compareProDataSec?.name} ?
                </div>
                {/* {product?.should_not_buy.length === 0 && (
                  <h3 className="no-data text-center mt-2">No data Found</h3>
                )} */}
                <ul className="cross">
                  {/* {product &&
                    product?.should_not_buy?.map((item, index) => {
                      return (
                        <>
                          <li
                            key={index}
                            style={{ color: "rgba(39, 48, 78, 0.7)" }}
                          >
                            {item}
                          </li>
                        </>
                      );
                    })} */}
                </ul>
              </div>
            </Col>
          </Row>
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
      <CompareDropDown
        slug={slug}
        attributeDropDown={[...categroyAttributes].reverse()}
      />
      <section className="mt-3">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Best Alternatives</h2>
              {/* <p>No Data Found</p> */}
              {/* {product?.alternative_products?.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <h2 className="site-main-heading">{data?.heading}</h2>
                    {data?.alternative_products.length != 0 ? (
                      <ReviewSlider favSlider={data?.alternative_products} />
                    ) : (
                      <span className="text-center m-2">
                        No Alternative Products Found
                      </span>
                    )}
                  </React.Fragment>
                );
              })} */}
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
              {/* <ProductSlider favSlider={blogData[0]?.data?.related_guides} /> */}
            </Col>
          </Row>
        </Container>
      </section>
      {isOpen && (
        <CompareModal
          location={"comparison"}
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
