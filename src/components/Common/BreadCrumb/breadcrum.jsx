import {
  BreadcrumbItem,
  Breadcrumb,
} from "react-bootstrap";
export default function BreadCrumb(props) {
  return (
    <>
      <Breadcrumb className="breadcrumb-group">
        <BreadcrumbItem className="breadcrumb-items">Home</BreadcrumbItem>
        {props.firstPageName == "" ? (
          ""
        ) : (
          <BreadcrumbItem className="breadcrumb-items">
            {props.firstPageName}
          </BreadcrumbItem>
        )}
        {props.secondPageName == "" ? (
          ""
        ) : (
          <BreadcrumbItem className="breadcrumb-items breadcrumb-active">
            {props.secondPageName}
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </>
  );
}
