"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Breadcrumb,
  Button,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import Image from "next/image";
import QuestionIcon from "../Svg/QuestionIcon";
import ProsConsToolTip from "../Svg/ProsConsToolTip";
import Radar from "@/_chart/Radar";
import ProductPageGraph from "@/_chart/Radar/ProductPageGraph";
import formatValue from "@/_helpers/formatValue";

const WhyAccordionTab = React.memo(
  ({ categorySlug, product, pageType, slug }) => {
    const [tabvalue, setTabValue] = useState({ pros: "total", cons: "total" });
    const [activetab, setActiveTab] = useState("tab-1");

    const [apiData, setApiData] = useState(null);
    // console.log(slug);

    useEffect(() => {
      const headers = {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      };

      const secondApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/generate-chart?permalink2=${slug}&permalink1=average`;
      fetch(secondApiUrl, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setApiData(data?.data); // Assuming data from the second API call is directly usable
        })
        .catch((error) => {
          console.error("Error fetching data from second API:", error);
        });
    }, []);

    // console.log(apiData && apiData?.sets);
    const handleTabChange = (key) => {
      setActiveTab(key);
    };
    const handleTabChanage = (value, key) => {
      if (key == "pros") {
        if (value == "total") {
          setTabValue({ ...tabvalue, pros: "total" });
        } else {
          setTabValue({ ...tabvalue, pros: value });
        }
      } else {
        if (value == "total") {
          setTabValue({ ...tabvalue, cons: "total" });
        } else {
          setTabValue({ ...tabvalue, cons: value });
        }
      }
    };
    const handleAccordionChange = (value, key) => {
      if (key == "pros") {
        if (value == "total") {
          setTabValue({ ...tabvalue, pros: "total" });
        } else if (value === "general") {
          setTabValue({ ...tabvalue, pros: value });
        } else {
          setTabValue({ ...tabvalue, pros: value });
        }
      } else {
        if (value == "total") {
          setTabValue({ ...tabvalue, cons: "total" });
        } else {
          setTabValue({ ...tabvalue, cons: value });
        }
      }
    };

    // this funcation spilt the vs value from ApiData
    const splitVsValue = (value) => {
      const splitValue = value && value.trim().split("vs");
      // console.log(splitValue[0])
      const boldedPart = `<strong>${splitValue[0]}</strong>`;
      if (splitValue?.length > 2) {
        return `${boldedPart} vs ${splitValue[1]} vs ${splitValue[2]}`;
      } else {
        return `${boldedPart} vs ${splitValue[1]}`;
      }
    };

    useEffect(() => {
      const getColor = ["#437ECE", "#FF8F0B", "#28A28C"];
      // Find all buttons that are children of an element with role="presentation" add attribute
      const attributeAdd = document.querySelectorAll(
        '[role="presentation"] button'
      );
      attributeAdd.forEach((button, index) => {
        if (index === 0) {
          button.setAttribute(
            "data-count",
            formatValue(product?.overall_score)
          );
        } else if (index === 1) {
          button.setAttribute(
            "data-count",
            parseFloat(product?.average_overall_score).toFixed(1)
          );
        }
        button.style.setProperty("--color-bg", getColor[index]);
      });
    }, []);
    // console.log(activetab);
    return (
      <Row>
        <Col md={12} lg={6}>
          <Tabs
            defaultActiveKey="tab-1"
            id="Review-tab"
            className="site_tabs graph-tab compare-graph-tabs"
            activeKey={activetab}
            onSelect={handleTabChange}
          >
            <Tab eventKey="tab-1" title={product && product?.name}>
              {activetab === "tab-1" && (
                <div className="graph-tab-content" id="productGraph">
                  {apiData && (
                    <ProductPageGraph data={apiData?.sets} activeTab={0} />
                  )}
                </div>
              )}
              {/* Your content for tab-1 */}
            </Tab>
            <Tab eventKey="tab-2" title={product?.average_title}>
              {activetab === "tab-2" && (
                <div className="graph-tab-content" id="productGraph">
                  {apiData && (
                    <ProductPageGraph data={apiData?.sets} activeTab={1} />
                  )}
                </div>
              )}
              {/* Your content for tab-2 */}
            </Tab>
          </Tabs>
        </Col>
        <Col md={12} lg={6}>
          <Accordion defaultActiveKey="1" className="compare-accordion p-0">
            <Accordion.Item eventKey="1">
              <Accordion.Header as="div">
                <h3 className="font-20">
                  {product && product?.page_phases?.better_then}
                  {/* Why is {product && product?.name} BETTER than{" "}
                  {product && product?.average_title}? */}
                </h3>
                <div className="show-btn">
                  {product && product?.page_phases?.show_all}
                  <i className="ri-arrow-down-s-line"></i>
                </div>
                <div className="hide-btn">
                  {product && product?.page_phases?.hide_all}{" "}
                  <i className="ri-arrow-up-s-line"></i>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Tab.Container
                  id="compare-left-tabs"
                  defaultActiveKey={tabvalue?.pros}
                >
                  <Row>
                    {/* {!isLoading && <Loader pageType={"comparison"} />} */}
                    <Col md={8} xl={8} className="dividers">
                      <Tab.Content className="compare-tab-content">
                        <Tab.Pane eventKey={tabvalue?.pros}>
                          <ul>
                            {product && tabvalue?.pros == "total"
                              ? product?.total_average_pros
                                  ?.slice(0, 8)
                                  ?.map((item, index) => {
                                    return (
                                      <li key={index}>
                                        <span className="tooltip-title">
                                          {typeof item?.difference_value ==
                                          "number"
                                            ? item?.difference
                                            : item?.phrase}

                                          {item?.hover_phase && (
                                            <>
                                              <div className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {item?.hover_phase}
                                                </span>
                                              </div>
                                            </>
                                          )}
                                        </span>

                                        <QuestionIcon
                                          attributes={item?.when_matters}
                                        />

                                        <small className="d-block tooltip-title">
                                          {item?.hover_phase && (
                                            <>
                                              <span className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {item?.hover_phase}
                                                </span>
                                              </span>
                                            </>
                                          )}
                                        </small>
                                        <small>
                                          {item?.difference_value === "yes" ||
                                          item?.difference_value === "no" ||
                                          item?.difference_value === 0 ||
                                          item?.difference_value === null ? (
                                            ""
                                          ) : (
                                            <span
                                              dangerouslySetInnerHTML={{
                                                __html: splitVsValue(item?.vs),
                                              }}
                                            ></span>
                                          )}
                                        </small>
                                      </li>
                                    );
                                  })
                              : ""}
                            {/* Gernal props */}
                            {product &&
                              product?.general?.pros &&
                              tabvalue?.pros == "general" &&
                              Object.keys(product?.general.pros).map(
                                (item, index) => {
                                  return (
                                    <li key={index}>
                                      <span className="tooltip-title">
                                        {product?.general.pros[item][2]}

                                        {product?.general.pros[item][2] && (
                                          <>
                                            <div className="tooltip-display-content">
                                              <span className="mb-2 prosconsColor">
                                                {product?.general.pros[item][2]}
                                              </span>
                                            </div>
                                          </>
                                        )}
                                      </span>

                                      <QuestionIcon
                                        attributes={
                                          product?.general.pros[item][4]
                                        }
                                      />

                                      <small className="d-block tooltip-title">
                                        {product?.general.pros[item][1] && (
                                          <>
                                            <span className="tooltip-display-content">
                                              <span className="mb-2 prosconsColor">
                                                {product?.general.pros[item][1]}
                                              </span>
                                            </span>
                                          </>
                                        )}
                                      </small>
                                      {product?.general.pros[item][2] && (
                                        <>
                                          <small>
                                            <span
                                              dangerouslySetInnerHTML={{
                                                __html: splitVsValue(
                                                  product?.general.pros[item][1]
                                                ),
                                              }}
                                            ></span>
                                          </small>
                                        </>
                                      )}
                                    </li>
                                  );
                                }
                              )}
                            {product?.average_pros[tabvalue?.pros]?.length >
                            0 ? (
                              product?.average_pros[tabvalue?.pros]
                                ?.slice(0, 8)
                                ?.map((item, index) => {
                                  return (
                                    <li key={index}>
                                      <span className="tooltip-title">
                                        {typeof item?.difference_value ==
                                        "number"
                                          ? item?.difference
                                          : item?.phrase}

                                        {item?.hover_phase && (
                                          <>
                                            <div className="tooltip-display-content">
                                              <span className="mb-2 prosconsColor">
                                                {item?.hover_phase}
                                              </span>
                                            </div>
                                          </>
                                        )}
                                      </span>
                                      <QuestionIcon
                                        attributes={item?.when_matters}
                                      />

                                      <small className="d-block tooltip-title invisible">
                                        {item?.hover_phase && (
                                          <>
                                            <span
                                              className="toolt
                                            ip-display-content"
                                            >
                                              <span className="mb-2 prosconsColor">
                                                {/* {item?.hover_phase} */}
                                              </span>
                                            </span>
                                          </>
                                        )}
                                      </small>
                                      <small>
                                        {item?.difference_value === "yes" ||
                                        item?.difference_value === "no" ||
                                        item?.difference_value === 0 ||
                                        item?.difference_value === null ? (
                                          ""
                                        ) : (
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: splitVsValue(item?.vs),
                                            }}
                                          ></span>
                                        )}
                                      </small>
                                    </li>
                                  );
                                })
                            ) : (
                              <p></p>
                            )}
                          </ul>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                    <Col md={4} xl={4}>
                      <div className="overlay">
                        <Nav className="flex-column compare-nav">
                          <Nav.Item>
                            <Nav.Link
                              eventKey="total"
                              onClick={() =>
                                handleAccordionChange("total", "pros")
                              }
                            >
                              TOTAL
                            </Nav.Link>
                          </Nav.Item>
                          {product &&
                            Object?.values(product?.general.pros).some(
                              (category) =>
                                category.pros?.length > 0 ? (
                                  <Nav.Item>
                                    <Nav.Link
                                      eventKey="general"
                                      onClick={() =>
                                        handleAccordionChange("general", "pros")
                                      }
                                    >
                                      General
                                    </Nav.Link>
                                  </Nav.Item>
                                ) : (
                                  ""
                                )
                            )}

                          {/* <Nav.Item>
                            <Nav.Link
                              eventKey="general"
                              onClick={() =>
                                handleAccordionChange("general", "pros")
                              }
                            >
                              General
                            </Nav.Link>
                          </Nav.Item> */}
                          {product &&
                            Object?.keys(product?.average_pros)?.map(
                              (item, index) => {
                                return (
                                  <Nav.Item key={index}>
                                    <Nav.Link
                                      eventKey={item}
                                      onClick={() =>
                                        handleAccordionChange(item, "pros")
                                      }
                                    >
                                      {item}
                                    </Nav.Link>
                                  </Nav.Item>
                                );
                              }
                            )}
                        </Nav>
                      </div>
                    </Col>
                  </Row>
                </Tab.Container>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header as="div">
                <h2 className="font-20">
                  {product && product?.page_phases?.worst_then}
                  {/* Why is {product && product?.name} WORSE than{" "}
                  {product && product?.average_title}? */}
                </h2>

                <div className="show-btn">
                  {product && product?.page_phases?.show_all}{" "}
                  <i className="ri-arrow-down-s-line"></i>
                </div>
                <div className="hide-btn">
                  {product && product?.page_phases?.hide_all}{" "}
                  <i className="ri-arrow-up-s-line"></i>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Tab.Container
                  id="compare-left-tabs"
                  defaultActiveKey={tabvalue?.cons}
                >
                  <Row>
                    <Col md={8} xl={8} className="dividers">
                      <Tab.Content className="compare-tab-content">
                        <Tab.Pane eventKey={tabvalue?.cons}>
                          <ul className="compare-crons">
                            {product &&
                            product?.general?.cons &&
                            tabvalue?.cons === "general" ? (
                              Object.keys(product?.general.cons).map(
                                (item, index) => {
                                  if (
                                    product?.general.cons[item]?.cons?.length !=
                                    0
                                  ) {
                                    return (
                                      <li key={index}>
                                        <span className="tooltip-title">
                                          {JSON.stringify(
                                            product?.general.cons[item]
                                          )}
                                          {/* {extractedUrls.length > 2
                                            ? typeof item?.difference_value ==
                                              "number"
                                              ? item?.difference.replace(
                                                /\d+\.\d+%/,
                                                ""
                                              )
                                              : item?.phrase.toFixed(2)
                                            : typeof item?.difference_value ==
                                              "number"
                                              ? item?.difference
                                              : item?.phrase.toFixed(2)} */}

                                          {product?.general.cons[item][2] && (
                                            <>
                                              <div className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {
                                                    product?.general.cons[
                                                      item
                                                    ][2]
                                                  }
                                                </span>
                                              </div>
                                            </>
                                          )}
                                        </span>
                                        <QuestionIcon
                                          attributes={
                                            product?.general.cons[item][1]
                                          }
                                        />

                                        <small className="d-block tooltip-title">
                                          {product?.general.cons[item][1] && (
                                            <>
                                              <span className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {
                                                    product?.general.cons[
                                                      item
                                                    ][1]
                                                  }
                                                </span>
                                              </span>
                                            </>
                                          )}
                                        </small>
                                        <small>
                                          {item?.difference_value === "yes" ||
                                          item?.difference_value === "no" ||
                                          item?.difference_value === 0 ||
                                          item?.difference_value === null ? (
                                            ""
                                          ) : (
                                            <span
                                              dangerouslySetInnerHTML={{
                                                __html: splitVsValue(item?.vs),
                                              }}
                                            ></span>
                                          )}
                                        </small>
                                      </li>
                                    );
                                  } else {
                                  }
                                }
                              )
                            ) : product?.total_average_cons?.length > 0 ? (
                              product && tabvalue?.cons == "total" ? (
                                product?.total_average_cons?.map(
                                  (item, index) => {
                                    return (
                                      <li key={index}>
                                        <span className="tooltip-title">
                                          {typeof item?.difference_value ==
                                          "number"
                                            ? item?.difference
                                            : item?.phrase}

                                          {item?.hover_phase && (
                                            <>
                                              <div className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {item?.hover_phase}
                                                </span>
                                              </div>
                                            </>
                                          )}
                                        </span>
                                        <QuestionIcon
                                          attributes={item?.when_matters}
                                        />

                                        <small className="d-block tooltip-title">
                                          {item?.hover_phase && (
                                            <>
                                              <span className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {item?.hover_phase}
                                                </span>
                                              </span>
                                            </>
                                          )}
                                        </small>
                                        <small>
                                          {item?.difference_value === "yes" ||
                                          item?.difference_value === "no" ||
                                          item?.difference_value === 0 ||
                                          item?.difference_value === null ? (
                                            ""
                                          ) : (
                                            <span
                                              dangerouslySetInnerHTML={{
                                                __html: splitVsValue(item?.vs),
                                              }}
                                            ></span>
                                          )}
                                        </small>
                                      </li>
                                    );
                                  }
                                )
                              ) : product?.average_cons[tabvalue?.cons]
                                  ?.length > 0 ? (
                                product?.average_cons[tabvalue?.cons]
                                  ?.slice(0, 8)
                                  ?.map((item, index) => {
                                    return (
                                      <li key={index}>
                                        <span className="tooltip-title">
                                          {typeof item?.difference_value ==
                                          "number"
                                            ? item?.difference
                                            : item?.phrase}

                                          {item?.hover_phase && (
                                            <>
                                              <div className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {item?.hover_phase}
                                                </span>
                                              </div>
                                            </>
                                          )}
                                        </span>
                                        <QuestionIcon
                                          attributes={item?.when_matters}
                                        />
                                        <small className="d-block tooltip-title">
                                          {item?.hover_phase && (
                                            <>
                                              <span className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {item?.hover_phase}
                                                </span>
                                              </span>
                                            </>
                                          )}
                                        </small>
                                        <small>
                                          {item?.difference_value === "yes" ||
                                          item?.difference_value === "no" ||
                                          item?.difference_value === 0 ||
                                          item?.difference_value === null ? (
                                            ""
                                          ) : (
                                            <span
                                              dangerouslySetInnerHTML={{
                                                __html: splitVsValue(item?.vs),
                                              }}
                                            ></span>
                                          )}
                                        </small>
                                      </li>
                                    );
                                  })
                              ) : (
                                <p>No Data Found</p>
                              )
                            ) : (
                              <p className="text-center pt-2 pb-2 font-5 font-bold">
                                No Data Found
                              </p>
                            )}
                          </ul>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                    <Col md={4} xl={4}>
                      <div className="overlay">
                        <Nav className="flex-column compare-nav">
                          <Nav.Item>
                            <Nav.Link
                              eventKey="total"
                              onClick={() =>
                                handleAccordionChange("total", "cons")
                              }
                            >
                              TOTAL
                            </Nav.Link>
                          </Nav.Item>
                          {product &&
                            Object?.values(product?.general.cons).some(
                              (category) =>
                                category.cons.length > 0 ? (
                                  <Nav.Item>
                                    <Nav.Link
                                      eventKey="general"
                                      onClick={() =>
                                        handleAccordionChange("general", "cons")
                                      }
                                    >
                                      General
                                    </Nav.Link>
                                  </Nav.Item>
                                ) : (
                                  ""
                                )
                            )}

                          {product &&
                            Object.keys(product?.average_cons).map(
                              (item, index) => {
                                return (
                                  <Nav.Item key={index}>
                                    <Nav.Link
                                      eventKey={item}
                                      onClick={() =>
                                        handleAccordionChange(item, "cons")
                                      }
                                    >
                                      {item}
                                    </Nav.Link>
                                  </Nav.Item>
                                );
                              }
                            )}
                        </Nav>
                      </div>
                    </Col>
                  </Row>
                </Tab.Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    );
  }
);

export default WhyAccordionTab;
