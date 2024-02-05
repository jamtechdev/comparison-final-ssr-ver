"use client";
import { useEffect, useState, useRef } from "react";
import useChart from "@/hooks/useChart";
import Image from "next/image";
import { Button, Col, Container, Row, Table, Form } from "react-bootstrap";
import Link from "next/link";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import Filter from "@/components/Common/Filter/Filter";
import ProductListing from "@/components/Common/ProductListing/ProductListing";
import ProductSlider from "@/components/Common/ProductSlider/productSlider";
import ProductSkeleton from "@/components/Common/ProductListing/ProductSkeleton";
import CompareTable from "@/components/Common/CompareTable/CompareTable";
import BottomBar from "@/components/Common/BottomBar/BottomBar";
import { isAreObjectsEqual } from "@/_helpers";
import GuidePagination from "@/components/Common/Pagination/GuidePagination";

export default function GuidePage({
  slug,
  categorySlug,
  guideData,
  attributesForTable,
  filters,
  searchParams,
}) {
  useChart();
  const [isShown, setIsShown] = useState(false);

  const guide = guideData[0]?.data;

  const products = guideData[1]?.data?.products || [];

  const sortedProducts = products.sort(
    (a, b) => b.overall_score - a.overall_score
  );

  const productPagination = guideData[1]?.data?.pagination;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [prevSearcParam, setPrevSearcParam] = useState({});
  const [removedParam, setremovedParam] = useState();
  const [order, setorder] = useState({
    value: "",
    ischecked: false,
  });
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const sortRangeAttributeArray = useRef([
    { algo: "", rangeAttributes: "Overall" },
  ]);
  const [manageCollapsedDiv, setManageCollapsedDiv] = useState(false);
  const [params, setparams] = useState(searchParams);
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

  const removeFilters = () => {
    window.history.replaceState(null, "", window.location.pathname);
    location.reload();
  };

  function removeQueryParamAndNavigate(url, paramToRemove) {
    // delete searchParams[`${paramToRemove}`];

    if (paramToRemove != "sort") {
      setparams(() => {
        return {
          ...searchParams,
        };
      });
    } else {
      delete params.sort;
      let removeSortParam = params;

      setparams(() => {
        return {
          ...removeSortParam,
        };
      });
    }

    const urlObject = new URL(url);
    urlObject.searchParams.delete(paramToRemove);
    const newUrl = urlObject.toString();
    // Update the URL in the address bar without triggering a page reload
    window.history.pushState({ path: newUrl }, "", newUrl);
    // You can also use window.location.href = newUrl; if you want to trigger a page reload
    // Optionally, you can perform additional actions, such as updating the UI, based on the new URL
    // updateUI();
    return newUrl;
  }

  useEffect(() => {
    setparams(() => {
      return {
        ...searchParams,
      };
    });
  }, [searchParams]);
  const handleSort = (sortAttribute) => {
    let param = JSON.parse(sortAttribute);
    if (param.algo) {
      const currentUrl = new URL(window.location.href);
      const searchParam = new URLSearchParams(currentUrl.search);
      const sortValue = `${param.algo},${param.rangeAttributes}`;
      setorder((prev) => {
        return {
          value: sortValue,
          ischecked: true,
        };
      });
      // setorder(sortValue);
      // searchParam.set("sort", sortValue);
      // searchParams.sort = sortValue;
      // setparams((prev) => {
      //   return {
      //     ...prev,
      //     sort: `${param.algo},${param.rangeAttributes}`,
      //   };
      // });
      // const newUrl = `${currentUrl.origin}${
      //   currentUrl.pathname
      // }?${searchParam.toString()}`;
      // searchParams.sort = `${param.algo},${param.rangeAttributes}`;
      // window.history.pushState({ path: newUrl }, "", newUrl);
    } else {
      removeQueryParamAndNavigate(window.location.href, "sort");
      delete searchParams.sort;
    }
    // sortRangeAttribute.current = JSON.parse(sortAttribute);
    // setFilteredProducts([
    //   ...filterProducts(
    //     filterObj,
    //     guide.products,
    //     sortRangeAttribute.current
    //   ),
    // ]);
    // console.log(JSON.parse(sortAttribute))
  };

   console.log(products, "products Abhay");

  return (
    <>
      {products.length > 0 ? (
        <>
          <section className="product-header">
            <Container>
              <Row className="align-items-center">
                <Col md={12}>
                  <BreadCrumb
                    firstPageName={categorySlug}
                    secondPageName={guide}
                  />
                </Col>
                <Col md={12} lg={12} xl={9}>
                  <h1 className="site-main-heading">{guide?.heading_title}</h1>
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
                <div className="product-inner-content" dangerouslySetInnerHTML={{ __html:guide?.text_first_part }} />
                </Col>
              </Row>

              <Row className="pt-3 best-page-card">
                {Object.values(guide.top_guide_counts).map(function (
                  item,
                  index
                ) {
                  return (
                    <Col
                      className="p-2"
                      md={6}
                      lg={3}
                      sm={6}
                      xs={6}
                      key={index}
                    >
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
              {guideData[0]?.data?.show_catchy_titles_in_text == 1 && (
                <Row className="catchy_titles_section mb-3">
                  <Col md={7} className="mx-auto p-0">
                    <p>
                      {" "}
                      {guideData[0]?.data?.catchy_titles_box_title
                        ? guideData[0]?.data?.catchy_titles_box_title
                        : " No title found"}{" "}
                    </p>
                    <ul className="text-center">
                      {guideData[0]?.data?.catchy_titles?.map((item, index) => {
                        return (
                          <li key={index}>
                            <span className="catchy_titles_section_title">
                              {item?.title}:
                            </span>
                            <span className="catchy_titles_section_product_name">
                              {item?.product?.name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </Col>
                </Row>
              )}
              <Row>
                <Col md={12}>
                <div className="para_content_text" dangerouslySetInnerHTML={{ __html: guide?.text_second_part }} />
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
                <Filter
                  categoryAttributes={filters}
                  searchParam={searchParams}
                  removedParam={removedParam}
                  orderBy={order}
                />
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
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
                      <Col md={8}>
                        <div className="filtered-data">
                          <ul>
                            {Object.keys(params).map((categoryName, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  setremovedParam(categoryName);
                                  removeQueryParamAndNavigate(
                                    window.location.href,
                                    categoryName
                                  );
                                }}
                              >
                                {" "}
                                {categoryName} ( {Object.values(params)[index]}{" "}
                                )_
                                <span className="text0danger">
                                  {" "}
                                  <i className="ri-close-fill"></i>{" "}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {Object.keys(params).length > 0 && (
                            <span
                              onClick={() => {
                                removeFilters();
                              }}
                            >
                              Remove all filters
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="filtered-data-select">
                          <span>Order by :</span>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => handleSort(e.target.value)}
                          >
                            {/* <option>Autonomy</option> */}
                            <option
                              value={JSON.stringify({
                                algo: "",
                                rangeAttributes: "Overall",
                              })}
                            >
                              Overall
                            </option>

                            <option
                              value={JSON.stringify({
                                algo: "high-low",
                                rangeAttributes: "technical_score",
                              })}
                            >
                              Technical score
                            </option>
                            <option
                              value={JSON.stringify({
                                algo: "low-high",
                                rangeAttributes: "price",
                              })}
                            >
                              Price (Lowest to Highest)
                            </option>
                            <option
                              value={JSON.stringify({
                                algo: "high-low",
                                rangeAttributes: "price",
                              })}
                            >
                              Price (Highest to Lowest)
                            </option>
                            <option
                              value={JSON.stringify({
                                algo: "high-low",
                                rangeAttributes: "reviews",
                              })}
                            >{`User's rating`}</option>
                            <option
                              value={JSON.stringify({
                                algo: "high-low",
                                rangeAttributes: "ratio_quality_price_points",
                              })}
                            >
                              Ratio quality-price
                            </option>
                            <option
                              value={JSON.stringify({
                                algo: "high-low",
                                rangeAttributes: "popularity_points",
                              })}
                            >
                              Popularity
                            </option>

                            {
                              // Technical score --- will be ordered from highest to lowest, based on numbers in "Technical Score Points CONVERTED"
                              // Price (Lowest to Highest) --- will be ordered from lowest to highest price, based on numbers in "Lowest Price"
                              // Price (Highest to Lowest) --- will be ordered from highest to lowest price, based on numbers in "Highest Price"
                              // User's rating --- will be ordered from highest to lowest price, based on numbers in "User's Rating"
                              // Ratio quality-price ---- will be ordered from highest to lowest, based on numbers in "Ratio Quality Price Points"
                              // Popularity --- will be ordered from highest to lowest, based on numbers in "Popularity points"

                              sortRangeAttributeArray?.current.map(
                                (algoAttribute, attrIndex) => {
                                  if (
                                    algoAttribute?.rangeAttributes != "Overall"
                                  )
                                    return (
                                      <option
                                        value={JSON.stringify(algoAttribute)}
                                        key={attrIndex}
                                      >
                                        {algoAttribute?.rangeAttributes}
                                        {algoAttribute?.algo ==
                                          "lowest_to_highest" &&
                                          " (Lowest to Highest)"}
                                      </option>
                                    );
                                }
                              )
                            }
                          </Form.Select>
                        </div>
                      </Col>
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

                  {productPagination?.total_pages > 1 && (
                    <GuidePagination pagination={productPagination} />
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
                                href={`/${data?.category_url}/${data?.permalink}`}
                                style={{ color: "#437ece" }}
                                scroll={false}
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
                    {guideData[0]?.data?.big_table_subtitle
                      ? guideData[0]?.data?.big_table_subtitle
                      : "No title found"}
                  </h2>
                  {guide && products && (
                    <CompareTable
                      products={products}
                      categoryAttributes={
                        attributesForTable && attributesForTable
                      }
                      slug={slug}
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
                    {guideData[0]?.data?.main_text_subtitle
                      ? guideData[0]?.data?.main_text_subtitle
                      : "No title found"}
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
                <div className="review-content" dangerouslySetInnerHTML={{ __html: guide?.text_third_part_main }} />
                  <br />
                  <h3 className="site-main-heading">Connectivity</h3>
                  <p className="review-content">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry standard dummy text Ipsum
                    has been the industry standard dummy text
                  </p>
                  <br />
                  <h3 className="site-main-heading">Power</h3>
                  <p className="review-content">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry standard dummy text Ipsum
                    has been the industry standard dummy text
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
                                <span className="count power-of-count">
                                  500 W
                                </span>
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
                                <span className="count power-of-count">
                                  500 W
                                </span>
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
                                <span className="count power-of-count">
                                  500 W
                                </span>
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
                                x <span>155.87 €</span>
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry standard dummy text Ipsum
                    has been the industry standard dummy text
                  </p>
                </Col>
                <Col className="mobile-hide" md={12} lg={2}>
                  <div className="ranking-section">
                    <div className="site-main-heading">In Rankings</div>
                    {guide?.recommended_guides &&
                      guide?.recommended_guides
                        .slice(0, 3)
                        ?.map((data, index) => {
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
            </Container>
          </section>
          <section className="ptb-25 mobite-mb-20">
            <Container>
              <Row>
                <Col md={12}>
                  <h2 className="site-main-heading">See Also Guides</h2>
                  <ProductSlider
                    favSlider={guide?.see_also_guides}
                    slug={slug}
                  />
                </Col>
              </Row>
            </Container>
          </section>
          <BottomBar
            isCollapsed={isCollapsed}
            handleToggleCollapse={handleToggleCollapse}
            manageCollapsedDiv={manageCollapsedDiv}
            handleManageCollapsedDiv={handleManageCollapsedDiv}
          />
        </>
      ) : (
        <>
          {" "}
          <div className="text-center p-5">
            We regret to inform you that, at the moment, we do not currently
            have a product available that aligns with the content of this guide.
            Our team is actively working on expanding our product offerings, and
            we appreciate your understanding. If you have any specific
            product-related inquiries or if there's anything else we can assist
            you with, please feel free to reach out to our support team. Thank
            you for your patience and interest in our services.
          </div>
        </>
      )}
    </>
  );
}
