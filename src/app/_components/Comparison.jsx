import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import Image from "next/image";
import CompareDiv from "@/components/Common/ComparisanComponent/CompareDiv";

function Comparison({ comparisonData }) {
  return (
    <>
      <CompareDiv comparisonData={comparisonData} />
    </>
  );
}

export default Comparison;
