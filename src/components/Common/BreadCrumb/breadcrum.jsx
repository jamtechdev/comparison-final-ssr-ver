import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
export default function BreadCrumb(props) {
  return (
    <>
      <Breadcrumb className="breadcrumb-group">
        <Breadcrumb.Item className="breadcrumb-items">Home</Breadcrumb.Item>
        {props.firstPageName == "" ? (
          ""
        ) : (
          <Breadcrumb.Item className="breadcrumb-items">
            {props.firstPageName}
          </Breadcrumb.Item>
        )}
        {props.secondPageName == "" ? (
          ""
        ) : (
          <Breadcrumb.Item className="breadcrumb-items breadcrumb-active">
            {props.secondPageName}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </>
  );
}
