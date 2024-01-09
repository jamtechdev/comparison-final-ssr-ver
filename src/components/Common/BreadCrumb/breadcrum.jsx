import { Breadcrumb, Container, Row, Col, BreadcrumbItem } from "react-bootstrap";
export default function BreadCrum({firstPageName,secondPageName}) {
  return (
    <>
      <Breadcrumb className="breadcrumb-group">
        <BreadcrumbItem className="breadcrumb-items">Home</BreadcrumbItem>
        {firstPageName == "" ? (
          ""
        ) : (
          <BreadcrumbItem className="breadcrumb-items">
            {firstPageName}
          </BreadcrumbItem>
        )}
        {secondPageName == "" ? (
          ""
        ) : (
          <BreadcrumbItem className="breadcrumb-items breadcrumb-active">
            {secondPageName}
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </>
  );
}
