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

// import ProsConsToolTip from "@/component/Svg/ProsConsToolTip";
import QuestionIcon from "@/components/Svg/QuestionIcon";

const CompareAccordionTab = React.memo(
  ({ product, pageType, sendProductProps }) => {
    const [activatab, setActiveTab] = useState("tab-1");
    const [apiData, setApiData] = useState(null);

    // extract the permalink from the sendProductProps
    const extractedUrls = sendProductProps.map((entry) => entry?.permalink);

    const [tabvalue, setTabValue] = useState({ pros: "total", cons: "total" });

    const handleAccordionChange = (value, key) => {
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

    const handleTabChange = (eventKey) => {
      console.log(eventKey);
      setActiveTab(eventKey);
    };
    useEffect(() => {
      // Extract the numerical index from the eventKey
      const index = parseInt(activatab.split("-")[1], 10);
      // Swap the order of extractedUrls when the active tab changes
      const updatedUrls = [...extractedUrls];
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
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, [activatab]);

    return (
      <>
        <Row>
          <Col md={12} lg={6}>
            <Tabs
              defaultActiveKey="tab-1"
              id="Review-tab"
              className="site_tabs graph-tab"
              activeKey={activatab}
              onSelect={handleTabChange}
            >
              {sendProductProps?.map((items, index) => (
                <Tab
                  eventKey={`tab-${index + 1}`}
                  title={items?.name}
                  key={index}
                >
                  <Image
                    className="site_image"
                    src="/images/chart.png"
                    width={0}
                    height={0}
                    alt=""
                    sizes="100%"
                  />
                </Tab>
              ))}
            </Tabs>
          </Col>
          <Col md={12} lg={6}>
            <Accordion defaultActiveKey="1" className="compare-accordion p-0">
              <Accordion.Item eventKey="1">
                <Accordion.Header as="div">
                  {extractedUrls.length > 2 ? (
                    activatab === "tab-2" ? (
                      <>
                        {" "}
                        <h3 className="font-20">
                          Why is{" "}
                          {sendProductProps[1]?.name &&
                            sendProductProps[1]?.name}{" "}
                          BETTER than other ?
                        </h3>
                      </>
                    ) : activatab === "tab-3" ? (
                      <h3 className="font-20">
                        Why is{" "}
                        {sendProductProps[2]?.name && sendProductProps[2]?.name}{" "}
                        BETTER than others ?
                      </h3>
                    ) : (
                      <>
                        <h3 className="font-20">
                          Why is{" "}
                          {sendProductProps[0]?.name &&
                            sendProductProps[0]?.name}{" "}
                          BETTER than other ?
                        </h3>
                      </>
                    )
                  ) : activatab === "tab-2" ? (
                    <>
                      {" "}
                      <h3 className="font-20">
                        Why is{" "}
                        {sendProductProps[1]?.name && sendProductProps[1]?.name}{" "}
                        BETTER than{" "}
                        {sendProductProps[0]?.name && sendProductProps[0]?.name}{" "}
                        ?
                      </h3>
                    </>
                  ) : activatab === "tab-3" ? (
                    <h3 className="font-20">
                      Why is{" "}
                      {sendProductProps[2]?.name && sendProductProps[2]?.name}{" "}
                      BETTER than others ?
                    </h3>
                  ) : (
                    <>
                      <h3 className="font-20">
                        Why is{" "}
                        {sendProductProps[0]?.name && sendProductProps[0]?.name}{" "}
                        BETTER than{" "}
                        {sendProductProps[1]?.name && sendProductProps[1]?.name}{" "}
                        ?
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
                              {apiData && tabvalue?.pros == "total"
                                ? apiData?.total_average_pros
                                    ?.slice(0, 8)
                                    ?.map((item, index) => {
                                      return (
                                        <li
                                          key={index}
                                          className="tooltip-title"
                                        >
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
                                : apiData?.average_pros[tabvalue?.pros]
                                    ?.slice(0, 8)
                                    ?.map((item, index) => {
                                      return (
                                        <li
                                          key={index}
                                          className="tooltip-title"
                                        >
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
                                onClick={() =>
                                  handleAccordionChange("total", "pros")
                                }
                              >
                                TOTAL
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
                  {extractedUrls.length > 2 ? (
                    activatab === "tab-2" ? (
                      <>
                        {" "}
                        <h3 className="font-20">
                          Why is{" "}
                          {sendProductProps[1]?.name &&
                            sendProductProps[1]?.name}{" "}
                          WORSE than other ?
                        </h3>
                      </>
                    ) : activatab === "tab-3" ? (
                      <h3 className="font-20">
                        Why is{" "}
                        {sendProductProps[2]?.name && sendProductProps[2]?.name}{" "}
                        WORSE than others ?
                      </h3>
                    ) : (
                      <>
                        <h3 className="font-20">
                          Why is{" "}
                          {sendProductProps[0]?.name &&
                            sendProductProps[0]?.name}{" "}
                          WORSE than other ?
                        </h3>
                      </>
                    )
                  ) : activatab === "tab-2" ? (
                    <>
                      {" "}
                      <h3 className="font-20">
                        Why is{" "}
                        {sendProductProps[1]?.name && sendProductProps[1]?.name}{" "}
                        WORSE than{" "}
                        {sendProductProps[0]?.name && sendProductProps[0]?.name}{" "}
                        ?
                      </h3>
                    </>
                  ) : activatab === "tab-3" ? (
                    <h3 className="font-20">
                      Why is{" "}
                      {sendProductProps[2]?.name && sendProductProps[2]?.name}{" "}
                      WORSE than others ?
                    </h3>
                  ) : (
                    <>
                      <h3 className="font-20">
                        Why is{" "}
                        {sendProductProps[0]?.name && sendProductProps[0]?.name}{" "}
                        WORSE than{" "}
                        {sendProductProps[1]?.name && sendProductProps[1]?.name}{" "}
                        ?
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
                              {apiData?.total_average_cons?.length > 0
                                ? apiData && tabvalue?.cons == "total"
                                  ? apiData?.total_average_cons?.map(
                                      (item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            className="tooltip-title"
                                          >
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
                                              {item?.difference_value ==
                                                "yes" ||
                                              item?.difference_value == "no"
                                                ? ""
                                                : item?.vs}
                                            </small>
                                          </li>
                                        );
                                      }
                                    )
                                  : apiData?.average_cons[tabvalue?.cons]
                                      ?.slice(0, 8)
                                      ?.map((item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            className="tooltip-title"
                                          >
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
                                              {item?.difference_value ==
                                                "yes" ||
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
                                : "data not found"}
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
