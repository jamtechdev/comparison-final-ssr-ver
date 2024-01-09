"use client"
import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
export default function BreadCrum({firstPageName,secondPageName}) {
  return (
    <>
      <Breadcrumb className="breadcrumb-group">
        <Breadcrumb.Item className="breadcrumb-items">Home</Breadcrumb.Item>
        {firstPageName == "" ? (
          ""
        ) : (
          <Breadcrumb.Item className="breadcrumb-items">
            {firstPageName}
          </Breadcrumb.Item>
        )}
        {secondPageName == "" ? (
          ""
        ) : (
          <Breadcrumb.Item className="breadcrumb-items breadcrumb-active">
            {secondPageName}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </>
  );
}
