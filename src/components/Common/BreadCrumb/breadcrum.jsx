"use client"
import { useRouter } from "next/navigation";
import { Breadcrumb, Container, Row, Col, BreadcrumbItem } from "react-bootstrap";
export default function BreadCrum({firstPageName,secondPageName}) {
  const router = useRouter()
  return (
    <>
      <Breadcrumb className="breadcrumb-group">
        <BreadcrumbItem className="breadcrumb-items" onClick={()=>{router.push(`/`)}}>Home</BreadcrumbItem>
        {firstPageName == "" ? (
          ""
        ) : (
          <BreadcrumbItem className="breadcrumb-items" onClick={()=>{router.push(`/${firstPageName}`)}}>
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
