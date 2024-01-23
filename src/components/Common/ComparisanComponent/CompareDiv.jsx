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
  const reduxData = useSelector((state) => state.comparePro.compareProduct)[0];
  const [otherPermalinks, setOtherPermalinks] = useState([]);

  const router = useRouter();
  const handelRemoveProductFormComparison = (index) => {
    // Remove the product from the comparison store last product url
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
  console.log(comparisonProductData[1]?.name);

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
  // console.log(productAttributes);
  useEffect(() => {
    if (
      reduxData === undefined ||
      reduxData === null ||
      reduxData?.productFirst === null
    ) {
      let productData = {
        name: comparisonProductData[0].name,
        category: comparisonProductData[0].category_id,
        category_url: comparisonProductData[0].category_url,
        permalink: comparisonProductData[0].permalink,
        image: comparisonProductData[0].main_image
          ? comparisonProductData[0].main_image
          : "/images/nofound.png",
      };
      dispatch(
        addCompareProduct({
          productFirst: productData,
          productSecond: null,
          productThird: null,
          category: comparisonProductData[0].category_id,
          location: "ON_GUIDE",
        })
      );
      return;
    }
    if (
      reduxData?.productFrist !== null &&
      reduxData?.productSecond === null &&
      reduxData?.productThird === null
    ) {
      let productData = {
        name: comparisonProductData[1]?.name,
        category: comparisonProductData[1]?.category_id,
        category_url: comparisonProductData[1]?.category_url,
        permalink: comparisonProductData[1]?.permalink,
        image: comparisonProductData[1]?.main_image
          ? comparisonProductData[1]?.main_image
          : "/images/nofound.png",
      };
      dispatch(
        updateCompareProduct({
          key: "productSecond",
          data: productData,
        })
      );
      return;
    }
    if (comparisonProductData > 2) {
      if (
        reduxData?.productThird === null &&
        reduxData?.productFrist !== null &&
        reduxData?.productSecond !== null
      ) {
        let productData = {
          name: comparisonProductData[2].name,
          category_id: comparisonProductData[2].category_id,
          category_url: comparisonProductData[2].category_url,
          permalink: comparisonProductData[2].permalink,
          image: comparisonProductData[2].main_image
            ? comparisonProductData[2].main_image
            : "/images/nofound.png",
        };
        dispatch(
          updateCompareProduct({
            key: "productThird",
            data: productData,
          })
        );
        return;
      }
    }
  }, [reduxData]);
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
      <CompareDropDown attributeDropDown={productAttributes} />
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
