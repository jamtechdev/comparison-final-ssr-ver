/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { Button, Table } from "react-bootstrap";
import QuestionIcon from "../../Svg/QuestionIcon";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ProsConsToolTip from "../../Svg/ProsConsToolTip";
import { useRouter } from "next/navigation";
import { productService } from "@/_services";
import axios from "axios";

const ProductCompareTable = React.memo(({ product, producrCatID }) => {
  const [getDataByCompareId, SetgetDataByCompareId] = useState([]);
  const [categoryAttribute, setCategoryAttributes] = useState(null);
  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/compare-product/1`,
        config
      )
      .then((res) => {
        setCategoryAttributes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <>{JSON.stringify(categoryAttribute)}</>;
});
//check
ProductCompareTable.displayName = "CompareTable";
export default ProductCompareTable;
