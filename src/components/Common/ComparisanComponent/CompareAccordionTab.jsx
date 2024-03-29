"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
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

// import ProsConsToolTip from "@/component/Svg/ProsConsToolTip";
import QuestionIcon from "@/components/Svg/QuestionIcon";
import { LoaderIcon } from "react-hot-toast";
import Loader from "@/app/_components/Loader";
import Radar from "@/_chart/Radar";
const CompareAccordionTab = React.memo(
  ({ sendProductProps, comparePhaseData }) => {
    const [activatab, setActiveTab] = useState("tab-1");
    const [apiData, setApiData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [graphData, setGraphData] = useState(null);

    // extract the permalink from the sendProductProps
    const extractedUrls = sendProductProps.map((entry) => entry?.permalink);
    // console.log(sendProductProps?.length)

    const [tabvalue, setTabValue] = useState({ pros: "total", cons: "total" });

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

    const handleTabChange = (eventKey) => {
      // console.log(eventKey);
      setActiveTab(eventKey);
      setIsLoading(false);
    };
    useEffect(() => {
      // Extract the numerical index from the eventKey
      const index = parseInt(activatab.split("-")[1], 10);
      // Swap the order of extractedUrls when the active tab changes
      const updatedUrls = [...extractedUrls];
      // console.log(updatedUrls);
      const temp = updatedUrls[index - 1];
      updatedUrls[index - 1] = updatedUrls[0];
      updatedUrls[0] = temp;
      const apiUrlParams = updatedUrls.map((url, idx) => {
        return `permalink${idx + 1}=${url}`;
      });

      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }/product/average?${apiUrlParams.join("&")}`;
      // Now you can use apiUrl to make your API call or perform any other actions
      const headers = {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      };
      fetch(apiUrl, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setApiData(data.data);
          // console.log(data.data,"Check")
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      const secondApiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }/generate-chart?${apiUrlParams.join("&")}`;
      fetch(secondApiUrl, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.data?.sets);
          setGraphData(data.data?.sets); // Assuming data from the second API call is directly usable
        })
        .catch((error) => {
          console.error("Error fetching data from second API:", error);
        });

      setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    }, [activatab]);
    // console.log(graphData?.data);

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

    //  find button and add data Attribute to button
    const getColorBasedOnScore = (score) => {
      if (score >= 9.7) {
        return "#28A28C";
      } else if (score >= 8.7 && score < 9.2) {
        return "#437ECE";
      } else {
        return "#FF8F0B";
      }
    };

    //if value is an integer and not equal to 10, add decimal that value
    const formatValue = (value) => {
      if (value % 1 === 0 && value !== 10) {
        return `${value}.0`;
      }
      return value;
    };
    useEffect(() => {
      const getColor = ["#437ECE", "#FF8F0B", "#28A28C"];
      // Find all buttons that are children of an element with role="presentation" add attribute
      const attributeAdd = document.querySelectorAll(
        '[role="presentation"] button'
      );
      attributeAdd.forEach((button, index) => {
        button.setAttribute(
          "data-count",
          formatValue(sendProductProps[index]?.overall_score)
        );
        button.style.setProperty("--color-bg", getColor[index]);
      });
    }, []);

    // Helping Funcation Accordion Heading

    const getTabNumber = () => {
      const tabNumbers = { "tab-2": 1, "tab-3": 2 };
      return tabNumbers[activatab] || 0;
    };
    const getComparisonIndex = () => (getTabNumber() + 1) % 3;
    const accordionHeader = (type) => {
      const isPros = type === "pros";
      const comparisonText = isPros
        ? comparePhaseData?.two_products_better_then
        : comparePhaseData?.two_products_better_then;

      const tabNumber = getTabNumber();
      const comparisonIndex = getComparisonIndex();
      return (
        <h3 className="font-20">
          {/* Why is {sendProductProps[tabNumber]?.name} {comparisonText} than{" "} */}
          {sendProductProps?.length > 2
            ? comparePhaseData?.three_products_better_then
            : comparePhaseData?.two_products_better_then}
          {extractedUrls.length > 2
            ? activatab === "tab-3"
              ? "other"
              : "other"
            : activatab === "tab-2"
            ? sendProductProps[0]?.name
            : sendProductProps[1]?.name}
          ?
        </h3>
      );
    };

    // console.log(graphData);

    const chartData = {
      variables: [
        { key: "a", label: "a" },
        { key: "b", label: "b" },
        { key: "c", label: "c" },
        { key: "d", label: "d" },
        { key: "e", label: "e" },
      ],
      sets: [
        {
          key: "served",
          label: "Those Who Have Served",
          values: {
            anxiety: 19.7,
            illness: 6,
            sucidal: 10,
            distress: 2,
            openness: 8,
            depression: 10,
          },
        },
        {
          key: "civilians",
          label: "Civilians",
          values: {
            anxiety: 10,
            illness: 8,
            sucidal: 10,
            distress: 4,
            openness: 2,
            depression: 10,
          },
        },
      ],
    };
    const [highlighted, setHighlighted] = useState(null);

    const onHover = (hovered) => {
      if (!highlighted && !hovered) return;
      if (highlighted && hovered && hovered.key === highlighted.key) return;
      setHighlighted(hovered);
    };
    // console.log(comparePhaseData)
    return (
      <>
        <Row>
          <Col md={12} lg={6}>
            <Tabs
              defaultActiveKey="tab-1"
              id="Review-tab"
              className="site_tabs graph-tab compare-graph-tabs"
              activeKey={activatab}
              onSelect={handleTabChange}
              data-count="4.0"
            >
              {sendProductProps?.map((items, index) => (
                <Tab
                  eventKey={`tab-${index + 1}`}
                  title={items?.name}
                  key={index}
                  onSelect={() => {
                    d3.select(".tooltip").remove(); // Remove existing tooltip
                  }}
                >
                  <div className="graph-tab-content">
                    {activatab === `tab-${index + 1}` && graphData && (
                      <Radar
                        data={graphData}
                        itemsData={items}
                        activeTab={index}
                      />
                    )}
                  </div>
                </Tab>
              ))}
            </Tabs>
          </Col>
          <Col md={12} lg={6}>
            <Accordion defaultActiveKey="1" className="compare-accordion p-0">
              <Accordion.Item eventKey="1">
                <Accordion.Header as="div">
                  {sendProductProps?.length > 2
                    ? comparePhaseData &&
                      comparePhaseData?.three_products_better_then
                    : comparePhaseData &&
                      comparePhaseData?.two_products_better_then}

                  <div className="show-btn">
                    {comparePhaseData && comparePhaseData?.show_all}{" "}
                    <i className="ri-arrow-down-s-line"></i>
                  </div>
                  <div className="hide-btn">
                    {comparePhaseData && comparePhaseData?.hide_all}{" "}
                    <i className="ri-arrow-down-s-line"></i>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Tab.Container
                    id="compare-left-tabs"
                    defaultActiveKey={tabvalue?.pros}
                  >
                    <Row>
                      {!isLoading && <Loader pageType={"comparison"} />}
                      <Col md={8} xl={8} className="dividers">
                        <Tab.Content className="compare-tab-content">
                          <Tab.Pane eventKey={tabvalue?.pros}>
                            <ul>
                              {apiData && tabvalue?.pros == "total"
                                ? apiData?.total_average_pros
                                    ?.slice(0, 8)
                                    ?.map((item, index) => {
                                      return (
                                        <li key={index}>
                                          {/* {console.log(item?.difference)} */}
                                          <span className="tooltip-title">
                                            {extractedUrls.length > 2
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
                                              : item?.phrase.toFixed(2)}

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
                                                  __html: splitVsValue(
                                                    item?.vs
                                                  ),
                                                }}
                                              ></span>
                                            )}
                                          </small>
                                        </li>
                                      );
                                    })
                                : ""}
                              {/* Gernal props */}
                              {apiData &&
                                apiData?.general?.pros &&
                                tabvalue?.pros == "general" &&
                                Object.keys(apiData?.general.pros).map(
                                  (item, index) => {
                                    return (
                                      <li key={index}>
                                        <span className="tooltip-title">
                                          {apiData?.general.pros[item][2]}

                                          {apiData?.general.pros[item][2] && (
                                            <>
                                              <div className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {
                                                    apiData?.general.pros[
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
                                            apiData?.general.pros[item][1]
                                          }
                                        />
                                        <small className="d-block tooltip-title">
                                          {apiData?.general.pros[item][1] && (
                                            <>
                                              <span className="tooltip-display-content">
                                                <span className="mb-2 prosconsColor">
                                                  {
                                                    apiData?.general.pros[
                                                      item
                                                    ][1]
                                                  }
                                                </span>
                                              </span>
                                            </>
                                          )}
                                        </small>
                                        {apiData?.general.pros[item][2] && (
                                          <>
                                            <small>
                                              <span
                                                dangerouslySetInnerHTML={{
                                                  __html: splitVsValue(
                                                    apiData?.general.pros[
                                                      item
                                                    ][1]
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
                              {apiData?.average_pros[tabvalue?.pros]?.length >
                              0 ? (
                                apiData?.average_pros[tabvalue?.pros]
                                  ?.slice(0, 8)
                                  ?.map((item, index) => {
                                    return (
                                      <li key={index}>
                                        <span className="tooltip-title">
                                          {extractedUrls.length > 2
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
                                            : item?.phrase.toFixed(2)}

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
                            {apiData &&
                              Object.keys(apiData?.average_pros)?.map(
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
                  {/* worse than */}
                  {sendProductProps?.length > 2
                    ? comparePhaseData &&
                      comparePhaseData?.three_products_worse_then
                    : comparePhaseData &&
                      comparePhaseData?.two_products_worse_then}
                  <div className="show-btn">
                    {comparePhaseData && comparePhaseData?.show_all}{" "}
                    <i className="ri-arrow-down-s-line"></i>
                  </div>
                  <div className="hide-btn">
                    {comparePhaseData && comparePhaseData?.hide_all}{" "}
                    <i className="ri-arrow-up-s-line"></i>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Tab.Container
                    id="compare-left-tabs"
                    defaultActiveKey={tabvalue?.cons}
                  >
                    <Row>
                      {!isLoading && <Loader pageType={"comparison"} />}
                      <Col md={8} xl={8} className="dividers">
                        <Tab.Content className="compare-tab-content">
                          <Tab.Pane eventKey={tabvalue?.cons}>
                            <ul className="compare-crons">
                              {apiData &&
                              apiData?.general?.cons &&
                              tabvalue?.cons == "general" ? (
                                Object.keys(apiData?.general.cons).map(
                                  (item, index) => {
                                    if (
                                      apiData?.general.cons[item]?.cons
                                        ?.length != 0
                                    ) {
                                      return (
                                        <li key={index}>
                                          <span className="tooltip-title">
                                            {JSON.stringify(
                                              apiData?.general.cons[item]
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

                                            {apiData?.general.cons[item][2] && (
                                              <>
                                                <div className="tooltip-display-content">
                                                  <span className="mb-2 prosconsColor">
                                                    {
                                                      apiData?.general.cons[
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
                                              apiData?.general.cons[item][1]
                                            }
                                          />

                                          <small className="d-block tooltip-title">
                                            {apiData?.general.cons[item][1] && (
                                              <>
                                                <span className="tooltip-display-content">
                                                  <span className="mb-2 prosconsColor">
                                                    {
                                                      apiData?.general.cons[
                                                        item
                                                      ][1]
                                                    }
                                                  </span>
                                                </span>
                                              </>
                                            )}
                                          </small>
                                          {/* <small>
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
                                        </small> */}
                                        </li>
                                      );
                                    } else {
                                    }
                                  }
                                )
                              ) : apiData?.total_average_cons?.length > 0 ? (
                                apiData && tabvalue?.cons == "total" ? (
                                  apiData?.total_average_cons?.map(
                                    (item, index) => {
                                      return (
                                        <li key={index}>
                                          <span className="tooltip-title">
                                            {extractedUrls.length > 2
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
                                              : item?.phrase.toFixed(2)}

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
                                                  __html: splitVsValue(
                                                    item?.vs
                                                  ),
                                                }}
                                              ></span>
                                            )}
                                          </small>
                                        </li>
                                      );
                                    }
                                  )
                                ) : apiData?.average_cons[tabvalue?.cons]
                                    ?.length > 0 ? (
                                  apiData?.average_cons[tabvalue?.cons]
                                    ?.slice(0, 8)
                                    ?.map((item, index) => {
                                      return (
                                        <li key={index}>
                                          <span className="tooltip-title">
                                            {extractedUrls.length > 2
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
                                              : item?.phrase.toFixed(2)}

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
                                                  __html: splitVsValue(
                                                    item?.vs
                                                  ),
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
                            {apiData &&
                              Object?.values(apiData?.general.cons).some(
                                (category) =>
                                  category.cons.length > 0 ? (
                                    <Nav.Item>
                                      <Nav.Link
                                        eventKey="general"
                                        onClick={() =>
                                          handleAccordionChange(
                                            "general",
                                            "cons"
                                          )
                                        }
                                      >
                                        General
                                      </Nav.Link>
                                    </Nav.Item>
                                  ) : (
                                    ""
                                  )
                              )}

                            {apiData &&
                              Object.keys(apiData?.average_cons).map(
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
      </>
    );
  }
);

export default CompareAccordionTab;
