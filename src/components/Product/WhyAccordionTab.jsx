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

    useEffect(() => {
      const getColor = ["#437ECE", "#FF8F0B", "#28A28C"];
      // Find all buttons that are children of an element with role="presentation" add attribute
      const attributeAdd = document.querySelectorAll(
        '[role="presentation"] button'
      );
      attributeAdd.forEach((button, index) => {
        button.setAttribute("data-count", formatValue(product?.overall_score));
        button.style.setProperty("--color-bg", getColor[index]);
      });
    }, []);
    const createDynamicTabs = [slug, "average"];
    console.log(createDynamicTabs);
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
            <Tab eventKey="tab-2" title="Average">
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
                  Why is {product && product?.name} BETTER than average?
                </h3>
                <div className="show-btn">
                  Show All <i className="ri-arrow-down-s-line"></i>
                </div>
                <div className="hide-btn">
                  Hide All <i className="ri-arrow-up-s-line"></i>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Tab.Container
                  id="compare-left-tabs"
                  defaultActiveKey={tabvalue?.pros}
                >
                  <Row>
                    <Col md={8} xl={8} className="dividers">
                      <Tab.Content className="compare-tab-content">
                        <Tab.Pane eventKey={tabvalue?.pros}>
                          <ul>
                            {product && tabvalue?.pros == "total"
                              ? product?.total_average_pros
                                  ?.slice(0, 8)
                                  ?.map((item, index) => {
                                    return (
                                      <li key={index} className="tooltip-title">
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
                                        <QuestionIcon
                                          attributes={item?.when_matters}
                                        />

                                        <small className="d-block">
                                          {item?.difference_value == "yes" ||
                                          item?.difference_value == "no"
                                            ? ""
                                            : item?.vs}
                                        </small>
                                      </li>
                                    );
                                  })
                              : product?.average_pros[tabvalue?.pros]
                                  ?.slice(0, 8)
                                  ?.map((item, index) => {
                                    return (
                                      <li key={index} className="tooltip-title">
                                        {typeof item?.difference_value ==
                                        "number"
                                          ? item?.difference
                                          : item?.phrase}
                                        <QuestionIcon
                                          attributes={item?.when_matters}
                                        />
                                        <small className="d-block">
                                          {item?.difference_value == "yes" ||
                                          item?.difference_value == "no"
                                            ? ""
                                            : item?.vs}
                                        </small>
                                      </li>
                                    );
                                  })}
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
                              onClick={() => handleTabChanage("total", "pros")}
                            >
                              TOTAL
                            </Nav.Link>
                          </Nav.Item>
                          {product &&
                            Object.keys(product?.average_pros)?.map(
                              (item, index) => {
                                return (
                                  <Nav.Item key={index}>
                                    <Nav.Link
                                      eventKey={item}
                                      onClick={() =>
                                        handleTabChanage(item, "pros")
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
                <h3 className="font-20">
                  Why is {product && product?.name} WORSE than average?
                </h3>

                <div className="show-btn">
                  Show All <i className="ri-arrow-down-s-line"></i>
                </div>
                <div className="hide-btn">
                  Hide All <i className="ri-arrow-up-s-line"></i>
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
                            {product?.total_average_cons?.length > 0 ? (
                              product && tabvalue?.cons == "total" ? (
                                product?.total_average_cons?.map(
                                  (item, index) => {
                                    return (
                                      <li key={index} className="tooltip-title">
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
                                        <QuestionIcon
                                          attributes={item?.when_matters}
                                        />
                                        <small className="d-block">
                                          {item?.difference_value == "yes" ||
                                          item?.difference_value == "no"
                                            ? ""
                                            : item?.vs}
                                        </small>
                                      </li>
                                    );
                                  }
                                )
                              ) : (
                                product?.average_cons[tabvalue?.cons]
                                  ?.slice(0, 8)
                                  ?.map((item, index) => {
                                    return (
                                      <li key={index} className="tooltip-title">
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

                                        <small className="d-block">
                                          {item?.difference_value == "yes" ||
                                          item?.difference_value == "no"
                                            ? ""
                                            : item?.vs}
                                        </small>
                                        <QuestionIcon
                                          attributes={item?.when_matters}
                                        />
                                      </li>
                                    );
                                  })
                              )
                            ) : (
                              <p>No Data Found</p>
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
                              onClick={() => handleTabChanage("total", "cons")}
                            >
                              TOTAL
                            </Nav.Link>
                          </Nav.Item>
                          {product &&
                            Object.keys(product?.average_cons).map(
                              (item, index) => {
                                return (
                                  <Nav.Item key={index}>
                                    <Nav.Link
                                      eventKey={item}
                                      onClick={() =>
                                        handleTabChanage(item, "cons")
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
