"use client";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  BreadcrumbItem,
} from "react-bootstrap";
export default function BreadCrum({ firstPageName, secondPageName, pageType }) {
  console.log(secondPageName);
  const router = useRouter();
  return (
    <>
      <Breadcrumb className="breadcrumb-group">
        <BreadcrumbItem className="breadcrumb-items" href="/">
          Home
        </BreadcrumbItem>
        {firstPageName == "" ? (
          ""
        ) : (
          <BreadcrumbItem
            className="breadcrumb-items fristWord"
            href={`/${firstPageName}`}
          >
            {firstPageName.replace(/-/g, " ")}
          </BreadcrumbItem>
        )}
        {secondPageName == "" ? (
          ""
        ) : pageType === "comparision" ? (
          <>
            <BreadcrumbItem
              className="breadcrumb-items breadcrumb-active"
              href={`/${firstPageName}/${secondPageName}`}
            >
              {secondPageName}
            </BreadcrumbItem>
          </>
        ) : (
          <>
            <BreadcrumbItem
              className="breadcrumb-items breadcrumb-active"
              href={`/${firstPageName}/${secondPageName?.permalink}`}
            >
              {secondPageName?.heading_title}
            </BreadcrumbItem>
          </>
        )}
      </Breadcrumb>
    </>
  );
}
