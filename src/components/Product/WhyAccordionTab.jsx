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

const WhyAccordionTab = React.memo(
  ({ product, pageType, sendProductProps }) => {
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

    // Here we check which tab will active
    const [activeTab, setActiveTab] = useState("tab-1");
    // Initialize with the default active tab
    // Remove undefined values from the array
    let filteredArray = sendProductProps?.filter(
      (item) =>
        item !== "" &&
        typeof item !== "undefined" &&
        Object.keys(item).length !== 0
    );
    const [TabProsCons, setTabProsCons] = useState();
    const [loading, setLoading] = useState(false);

    const handleTabChange = (key) => {
      console.log(key, "activeTabCheck");
      setActiveTab(key);
    }; // Assuming you have a state for data

    useEffect(() => {
      if (filteredArray.length === 2) {
        if (activeTab === "tab-2") {
          // Call API with the specified parameters for tab-2
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/product/average?permalink1=${filteredArray[1]?.permalink}&permalink2=${filteredArray[0]?.permalink}`;
          const headers = {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          };
          fetch(apiUrl, {
            method: "GET",
            headers: headers,
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the API response data
              setTabProsCons(data?.data);
            })
            .catch((error) => {
              console.error("Error calling API:", error);
            });
        } else {
          // Call API with the specified parameters for tab-1
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/product/average?permalink1=${filteredArray[0]?.permalink}&permalink2=${filteredArray[1]?.permalink}`;
          const headers = {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          };
          fetch(apiUrl, {
            method: "GET", // You can change the method based on your API requirements
            headers: headers,
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the API response data
              setTabProsCons(data?.data);
            })
            .catch((error) => {
              console.error("Error calling API:", error);
            });
        }
      } else if (filteredArray.length === 3) {
        if (activeTab === "tab-2") {
          // Call API with the specified parameters for tab-2 with three permalinks
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/product/average?permalink1=${filteredArray[1]?.permalink}&permalink2=${filteredArray[0]?.permalink}&permalink3=${filteredArray[2]?.permalink}`;
          // Make the API call
          // ...
        } else {
          // Call API with the specified parameters for tab-3 with three permalinks
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/product/average?permalink1=${filteredArray[2]?.permalink}&permalink2=${filteredArray[0]?.permalink}&permalink3=${filteredArray[0]?.permalink}`;
        }
      }
    }, [activeTab]);
    console.log(TabProsCons, "checkingTabs");

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
                activeTab={activeTab}
                onSelect={handleTabChange}
              >
                {filteredArray?.map((items, index) => {
                  return (
                    <Tab eventKey={`tab-${index + 1}`} title={items?.name}>
                      <Image
                        className="site_image"
                        src="/images/chart.png"
                        width={0}
                        height={0}
                        alt=""
                        sizes="100%"
                      />
                    </Tab>
                  );
                })}

                {/* Baad me puchenge sir se */}

                {/* <Tab eventKey="tab-4" title="Average">
                  <Image
                    className="site_image"
                    src="/images/chart.png"
                    width={0}
                    height={0}
                    alt=""
                    sizes="100%"
                  />
                </Tab> */}
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
                    {activeTab === "tab-2" ? (
                      <>
                        {" "}
                        <h3 className="font-20">
                          Why is{" "}
                          {filteredArray[1]?.name && filteredArray[1]?.name}{" "}
                          BETTER than others ?
                        </h3>
                      </>
                    ) : (
                      <>
                        <h3 className="font-20">
                          Why is{" "}
                          {filteredArray[0]?.name && filteredArray[0]?.name}{" "}
                          BETTER than others ?
                        </h3>
                      </>
                    )}
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
                            {TabProsCons && tabvalue?.pros == "total"
                              ? TabProsCons?.total_average_pros
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
                                  })
                              : TabProsCons?.average_pros[tabvalue?.pros]
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
                          {TabProsCons &&
                            Object.keys(TabProsCons?.average_pros)?.map(
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
                    {activeTab === "tab-2" ? (
                      <>
                        {" "}
                        <h3 className="font-20">
                          Why is{" "}
                          {filteredArray[1]?.name && filteredArray[1]?.name}{" "}
                          WORSE than others ?
                        </h3>
                      </>
                    ) : (
                      <>
                        <h3 className="font-20">
                          Why is{" "}
                          {filteredArray[0]?.name && filteredArray[0]?.name}{" "}
                          WORSE than others ?
                        </h3>
                      </>
                    )}
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
                            {TabProsCons && tabvalue?.cons == "total"
                              ? TabProsCons?.total_average_cons?.map(
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
                              : TabProsCons?.average_cons[tabvalue?.cons]
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
                          {TabProsCons &&
                            Object.keys(TabProsCons?.average_cons).map(
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
