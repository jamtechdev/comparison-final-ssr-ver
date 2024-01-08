"use client"
import React from 'react'
import {
    Col,
    Container,
    Row,
    Tab,
    Tabs,
} from "react-bootstrap";
import Image from 'next/image';



function ProductReviewTab() {
    return (
        <Tabs
            defaultActiveKey="tab-1"
            id="Review-tab"
            className="mb-3 site_tabs site_tabs_hide"
        >
            <Tab eventKey="tab-1" title="User’s Reviews">
                <Row>
                    <Col md={2}>
                        <Image
                            src="/images/review.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                            className="hover-img"
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Col>
                    <Col md={2}>
                        <Image
                            src="/images/review.png"
                            width={0}
                            height={0}
                            sizes="100%"
                            alt=""
                            className="hover-img"
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Col>
                </Row>
            </Tab>
            <Tab eventKey="tab-2" title="Video Reviews"></Tab>
            <Tab eventKey="tab-3" title="Expert Reviews"></Tab>
        </Tabs>
    )
}

export default ProductReviewTab