"use client";
import { useEffect, useRef, useState } from "react";
import { guideService } from "@/_services";
import { useDispatch, useSelector } from "react-redux";
import useChart from "@/hooks/useChart";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Link from "next/link";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import Filter from "@/components/Common/Filter/Filter";
import ProductListing from "@/components/Common/ProductListing/ProductListing";
import ProductSlider from "@/components/Common/ProductSlider/productSlider";
import ProductSkeleton from "@/components/Common/ProductListing/ProductSkeleton";
import MobileCompareTable from "@/components/Common/MobileCompareTable/MobileCompareTable";
import CompareTable from "@/components/Common/CompareTable/CompareTable";
import BottomBar from "@/components/Common/BottomBar/BottomBar";
import { isAreObjectsEqual } from "@/_helpers";
export default function GuidePage({
  slug,
  guideData,
  attributesForTable,
  filters,
  searchParams,
}) {
  useChart();
  const [isShown, setIsShown] = useState(false);
  const guide = guideData[0].data;
  const products = guideData[1].data.products;
  const productPagination = guideData[1].data.pagination;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [prevSearcParam, setPrevSearcParam] = useState({});
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [manageCollapsedDiv, setManageCollapsedDiv] = useState(false);
  const handleManageCollapsedDiv = () => {
    setManageCollapsedDiv(true);
  };
  const handelSetFilterActive = (status) => {
    setIsFilterActive(status);
  };
  useEffect(() => {
    setPrevSearcParam(searchParams);
  }, []);
  useEffect(() => {
    if (isAreObjectsEqual(searchParams, prevSearcParam)) {
      handelSetFilterActive(true);
    }
    setTimeout(() => {
      handelSetFilterActive(false);
    }, 1000);
  }, [searchParams]);
  return (
    <>
      <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <BreadCrumb
                firstPageName="Electronics"
                secondPageName="Samsung New VR Headset Oculus 2.0"
              />
            </Col>
            <Col md={12} lg={12} xl={9}>
              <h1 className="site-main-heading">{guide?.title}</h1>
            </Col>

            <Col md={12} lg={12} xl={3}>
              <div className="user-info-section">
                {guide?.author && (
                  <div className="user-section">
                    {guide?.author?.image && (
                      <img
                        src={
                          guide?.author?.image
                            ? guide?.author?.image
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
                        <Link href={`/author/${guide?.guide?.id}`}>
                          {guide?.author?.name}
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
                <span>
                  updated:
                  <i> {guide?.updated_at}</i>
                </span>
              </div>
            </Col>
            <Col md={12}>
              <p className="product-inner-content">{guide?.text_first_part}</p>
            </Col>
          </Row>
          <Row className="pt-3 best-page-card">
            {Object.values(guide.top_guide_counts).map(function (item, index) {
              return (
                <Col className="p-2" md={6} lg={3} sm={6} xs={6} key={index}>
                  <div className="hero-card-content">
                    <span className="count">{item.count}</span>
                    <span className="card-heading">{item.heading}</span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      <section className="ptb-25">
        <Container>
          <Row>
            <Col md={12}>
              <p className="para_content_text">{guide?.text_second_part}</p>
            </Col>
          </Row>
        </Container>
      </section>
      <Container>
        <Row>
          <Col
            md={12}
            lg={3}
            xl={3}
            className="sidebar-width"
            style={{ display: isShown ? "block" : "none" }}
          >
            <Filter categoryAttributes={filters} />
            <div className="desktop-hide">
              <Button className="site_main_btn w-100 d-block btn-icon mb-4">
                <i className="ri-close-fill"></i>
                Close Filter
              </Button>
            </div>
          </Col>
          <Col md={12} lg={9} xl={9} className="main-content">
            <Row className="mobile-hide"></Row>
            <Row className="desktop-hide">
              <Col sm={6} xs={6}>
                <Button className="site_main_btn w-100 d-block btn-icon">
                  <i className="ri-filter-line"></i>
                  Filter
                </Button>
              </Col>
              <Col sm={6} xs={6}>
                <span className="filter-data">
                  Ratio Quality Price{" "}
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M18.2073 9.04304 12.0002 2.83594 5.79312 9.04304 7.20733 10.4573 12.0002 5.66436 16.7931 10.4573 18.2073 9.04304ZM5.79297 14.9574 12.0001 21.1646 18.2072 14.9574 16.793 13.5432 12.0001 18.3361 7.20718 13.5432 5.79297 14.9574Z" />
                    </svg>
                  </div>
                </span>
              </Col>
            </Row>
            <Row className="m-0">
              {isFilterActive ? (
                <ProductSkeleton />
              ) : (
                <>
                  {products ? (
                    <ProductListing
                      products={products}
                      handleToggleCollapse={handleToggleCollapse}
                      handleManageCollapsedDiv={handleManageCollapsedDiv}
                    />
                  ) : (
                    <ProductSkeleton />
                  )}
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <section className="ptb-25">
        <Container>
          <Row>
            <Col md={12}>
              <div className="similar-guides">
                <p>Similar Guides:</p>

                <ul>
                  {guide?.recommended_guides &&
                    guide?.recommended_guides?.map((data, index) => {
                      return (
                        <li key={index}>
                          <Link
                            href={`/${data?.permalink}`}
                            style={{ color: "#437ece" }}
                          >
                            {data?.short_name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="table-section-mobile">
            <Col md={12}>
              <h2 className="site-main-heading pt-5">
                Comparing Samsung New VR Headset Oculus 2.0 with best robot
                vacuum cleaners
              </h2>
              {guide && guide?.products && (
                <CompareTable
                  products={products}
                  categoryAttributes={attributesForTable}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
      {/* Isko baad mai sahi karna hai <section className="mobile-table-section">
        <Container>
          <Row className="table-section-desktop p-0">
            <Col md={12} className="p-0">
              <MobileCompareTable />
            </Col>
          </Row>
        </Container>
      </section> */}
      <section>
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">
                Review of Samsung New VR Headset Oculus 2.0
              </h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4} lg={2}>
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
            <Col md={8} lg={8}>
              <p className="review-content">{guide?.text_third_part_main}</p>
              <br />
              <h3 className="site-main-heading">Connectivity</h3>
              <p className="review-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry
                standard dummy text Ipsum has been the industry standard dummy
                text
              </p>
              <br />
              <h3 className="site-main-heading">Power</h3>
              <p className="review-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry
                standard dummy text Ipsum has been the industry standard dummy
                text
              </p>
              <Row className="mt-3">
                <Col md={12}>
                  <h4 className="site-main-heading">
                    Smartwatches with best power
                  </h4>
                </Col>
                <div className="best-product-listing-item">
                  <span className="number">1</span>
                  <Table>
                    <tbody>
                      <tr>
                        <td rowSpan="2">
                          <div className="best-product-listing-item-name">
                            <p className="device-name">
                              Samsung Galaxy S23 Ultra
                            </p>
                            <Image
                              className="compare_image"
                              src="/images/compare.png"
                              width={0}
                              height={0}
                              alt=""
                              sizes="100%"
                            />
                          </div>
                        </td>
                        <td className="light-bg-color">
                          <div className="best-product-listing-item-rating-item">
                            <span>Overall Score</span>
                            <span className="count dark-color">8.5</span>
                          </div>
                        </td>
                        <td>
                          <div className="best-product-listing-item-price-item">
                            <Image
                              src="/images/amazon.png"
                              width={0}
                              height={0}
                              sizes="100%"
                              alt=""
                            />
                            <span>155.87 €</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="light-bg-color">
                          <div className="best-product-listing-item-rating-item">
                            <span>Power</span>
                            <span className="count power-of-count">500 W</span>
                          </div>
                        </td>
                        <td>
                          <div className="best-product-listing-item-price-item">
                            <Image
                              src="/images/amazon.png"
                              width={0}
                              height={0}
                              sizes="100%"
                              alt=""
                            />
                            <span>155.87 €</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="best-product-listing-item">
                  <span className="number">2</span>
                  <Table>
                    <tbody>
                      <tr>
                        <td rowSpan="2">
                          <div className="best-product-listing-item-name">
                            <p className="device-name">
                              Samsung Galaxy S23 Ultra
                            </p>
                            <Image
                              className="compare_image"
                              src="/images/compare.png"
                              width={0}
                              height={0}
                              alt=""
                              sizes="100%"
                            />
                          </div>
                        </td>
                        <td className="light-bg-color">
                          <div className="best-product-listing-item-rating-item">
                            <span>Overall Score</span>
                            <span className="count dark-color">8.5</span>
                          </div>
                        </td>
                        <td>
                          <div className="best-product-listing-item-price-item">
                            <Image
                              src="/images/amazon.png"
                              width={0}
                              height={0}
                              sizes="100%"
                              alt=""
                            />
                            <span>155.87 €</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="light-bg-color">
                          <div className="best-product-listing-item-rating-item">
                            <span>Power</span>
                            <span className="count power-of-count">500 W</span>
                          </div>
                        </td>
                        <td>
                          <div className="best-product-listing-item-price-item">
                            <Image
                              src="/images/amazon.png"
                              width={0}
                              height={0}
                              sizes="100%"
                              alt=""
                            />
                            <span>155.87 €</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="best-product-listing-item">
                  <span className="number">3</span>
                  <Table>
                    <tbody>
                      <tr>
                        <td rowSpan="2">
                          <div className="best-product-listing-item-name">
                            <p className="device-name">
                              Samsung Galaxy S23 Ultra
                            </p>
                            <Image
                              className="compare_image"
                              src="/images/compare.png"
                              width={0}
                              height={0}
                              alt=""
                              sizes="100%"
                            />
                          </div>
                        </td>
                        <td className="light-bg-color">
                          <div className="best-product-listing-item-rating-item">
                            <span>Overall Score</span>
                            <span className="count dark-color">8.5</span>
                          </div>
                        </td>
                        <td>
                          <div className="best-product-listing-item-price-item">
                            <Image
                              src="/images/amazon.png"
                              width={0}
                              height={0}
                              sizes="100%"
                              alt=""
                            />
                            <span>155.87 €</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="light-bg-color">
                          <div className="best-product-listing-item-rating-item">
                            <span>Power</span>
                            <span className="count power-of-count">500 W</span>
                          </div>
                        </td>
                        <td>
                          <div className="best-product-listing-item-price-item">
                            <Image
                              src="/images/amazon.png"
                              width={0}
                              height={0}
                              sizes="100%"
                              alt=""
                            />
                            <span>155.87 €</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Row>
              <br />
              <h3 className="site-main-heading">Speed</h3>
              <p className="review-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry
                standard dummy text Ipsum has been the industry standard dummy
                text
              </p>
            </Col>
            <Col className="mobile-hide" md={12} lg={2}>
              <div className="ranking-section">
                <div className="site-main-heading">In Rankings</div>
                {guide?.recommended_guides &&
                  guide?.recommended_guides.slice(0, 3)?.map((data, index) => {
                    return (
                      <div className="product-card" key={index}>
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
                        <span>
                          <Link
                            href={`/${data?.permalink}`}
                            style={{ color: "#326ebf" }}
                          >
                            {data?.short_name}
                          </Link>
                        </span>
                      </div>
                    );
                  })}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="ptb-25 mobite-mb-20">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">See Also Guides</h2>
              <ProductSlider favSlider={guide?.see_also_guides} />
            </Col>
          </Row>
        </Container>
      </section>
      <BottomBar
        isCollapsed={isCollapsed}
        handleToggleCollapse={handleToggleCollapse}
        manageCollapsedDiv={manageCollapsedDiv}
        handleManageCollapsedDiv={handleManageCollapsedDiv}
        compareGuideData={null}
      />
    </>
  );
}
