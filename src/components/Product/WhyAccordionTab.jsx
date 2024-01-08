"use client"
import React, { useState } from 'react'
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
import Image from 'next/image';

const WhyAccordionTab = React.memo(({ product }) => {
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
                                                                    <>
                                                                        <li key={index}>
                                                                            {typeof item?.difference_value ==
                                                                                "number"
                                                                                ? item?.difference
                                                                                : item?.phrase}
                                                                            <span className="question-marker-icon">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                                                                                </svg>
                                                                            </span>
                                                                            <small className="d-block">
                                                                                {item?.difference_value ==
                                                                                    "yes" ||
                                                                                    item?.difference_value == "no"
                                                                                    ? ""
                                                                                    : item?.vs}
                                                                            </small>
                                                                        </li>
                                                                    </>
                                                                );
                                                            })
                                                        : product?.average_pros[tabvalue?.pros]
                                                            ?.slice(0, 8)
                                                            ?.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <li key={index}>
                                                                            {typeof item?.difference_value ==
                                                                                "number"
                                                                                ? item?.difference
                                                                                : item?.phrase}
                                                                            <span className="question-marker-icon">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                                                                                </svg>
                                                                            </span>
                                                                            <small className="d-block">
                                                                                {item?.difference_value ==
                                                                                    "yes" ||
                                                                                    item?.difference_value == "no"
                                                                                    ? ""
                                                                                    : item?.vs}
                                                                            </small>
                                                                        </li>
                                                                    </>
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
                                                            handleTabChanage("total", "pros")
                                                        }
                                                    >
                                                        TOTAL
                                                    </Nav.Link>
                                                </Nav.Item>
                                                {product &&
                                                    Object.keys(product?.average_pros)?.map(
                                                        (item, index) => {
                                                            return (
                                                                <>
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
                                                                </>
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
                                Why is {product && product?.name} WORSE than others?
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
                                                    {product && tabvalue?.cons == "total"
                                                        ? product?.total_average_cons
                                                            ?.slice(0, 8)
                                                            ?.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <li key={index}>
                                                                            {typeof item?.difference_value ==
                                                                                "number"
                                                                                ? item?.difference
                                                                                : item?.phrase}
                                                                            <span className="question-marker-icon">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                                                                                </svg>
                                                                            </span>
                                                                            <small className="d-block">
                                                                                {item?.difference_value ==
                                                                                    "yes" ||
                                                                                    item?.difference_value == "no"
                                                                                    ? ""
                                                                                    : item?.vs}
                                                                            </small>
                                                                        </li>
                                                                    </>
                                                                );
                                                            })
                                                        : product?.average_cons[tabvalue?.cons]
                                                            ?.slice(0, 8)
                                                            ?.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <li key={index}>
                                                                            {typeof item?.difference_value ==
                                                                                "number"
                                                                                ? item?.difference
                                                                                : item?.phrase}
                                                                            <span className="question-marker-icon">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path>
                                                                                </svg>
                                                                            </span>
                                                                            <small className="d-block">
                                                                                {item?.difference_value ==
                                                                                    "yes" ||
                                                                                    item?.difference_value == "no"
                                                                                    ? ""
                                                                                    : item?.vs}
                                                                            </small>
                                                                        </li>
                                                                    </>
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
                                                            handleTabChanage("total", "cons")
                                                        }
                                                    >
                                                        TOTAL
                                                    </Nav.Link>
                                                </Nav.Item>
                                                {product &&
                                                    Object.keys(product?.average_cons).map(
                                                        (item, index) => {
                                                            return (
                                                                <>
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
                                                                </>
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
    )
})

export default WhyAccordionTab