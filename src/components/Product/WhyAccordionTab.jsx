"use client";
import React, { useState } from "react";
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

const WhyAccordionTab = React.memo(
  ({ product, pageType, product1, product2, product3 }) => {
    // console.log(pageType,">>>>>")
    const [tabvalue, setTabValue] = useState({ pros: "total", cons: "total" });

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

    return (
      <Row>
        <Col md={12} lg={6}>
          {pageType === undefined ? (
            <>
              <Tabs
                defaultActiveKey="tab-1"
                id="Review-tab"
                className="site_tabs graph-tab"
              >
                <Tab eventKey="tab-1" title={product && product?.name}>
                  <Image
                    className="site_image"
                    src="/images/chart.png"
                    width={0}
                    height={0}
                    alt=""
                    sizes="100%"
                  />
                </Tab>
                <Tab eventKey="tab-2" title="Average">
                  <Image
                    className="site_image"
                    src="/images/chart.png"
                    width={0}
                    height={0}
                    alt=""
                    sizes="100%"
                  />
                </Tab>
              </Tabs>
            </>
          ) : (
            <>
              <Tabs
                defaultActiveKey="tab-1"
                id="Review-tab"
                className="site_tabs graph-tab"
              >
                <Tab eventKey="tab-1" title={product1 && product1}>
                  <Image
                    className="site_image"
                    src="/images/chart.png"
                    width={0}
                    height={0}
                    alt=""
                    sizes="100%"
                  />
                </Tab>
                <Tab eventKey="tab-2" title={product2 && product2}>
                  <Image
                    className="site_image"
                    src="/images/chart.png"
                    width={0}
                    height={0}
                    alt=""
                    sizes="100%"
                  />
                </Tab>
                <Tab eventKey="tab-3" title="Average">
                  <Image
                    className="site_image"
                    src="/images/chart.png"
                    width={0}
                    height={0}
                    alt=""
                    sizes="100%"
                  />
                </Tab>
              </Tabs>
            </>
          )}
        </Col>
        <Col md={12} lg={6}>
          <Accordion defaultActiveKey="1" className="compare-accordion p-0">
            <Accordion.Item eventKey="1">
              <Accordion.Header as="div">
                {pageType === undefined ? (
                  <>
                    <h3 className="font-20">
                      Why is {product && product?.name} BETTER than average?
                    </h3>
                  </>
                ) : (
                  <>
                    {" "}
                    <h3 className="font-20">
                      Why is {product1 && product1} BETTER than{" "}
                      {product2 && product2}?
                    </h3>
                  </>
                )}

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
                              ? product?.total_average_pros?.map(
                                  (item, index) => {
                                    return (
                                      <li key={index}>
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
                                  }
                                )
                              : product?.average_pros[tabvalue?.pros]
                                  ?.slice(0, 8)
                                  ?.map((item, index) => {
                                    return (
                                      <li key={index}>
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
                {pageType === undefined ? (
                  <>
                    <h3 className="font-20">
                      Why is {product && product?.name} WORSE than others?
                    </h3>
                  </>
                ) : (
                  <>
                    {" "}
                    <h3 className="font-20">
                      Why is {product1 && product1} WORSE than{" "}
                      {product2 && product2}?
                    </h3>
                  </>
                )}

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
                            {product && tabvalue?.cons == "total"
                              ? product?.total_average_cons?.map(
                                  (item, index) => {
                                    return (
                                      <li key={index}>
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
                                  }
                                )
                              : product?.average_cons[tabvalue?.cons]
                                  ?.slice(0, 8)
                                  ?.map((item, index) => {
                                    return (
                                      <li key={index}>
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
