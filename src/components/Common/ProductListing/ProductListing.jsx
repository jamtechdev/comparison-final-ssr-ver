import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "react-loading-skeleton/dist/skeleton.css";
import Product from "./Product/Product";
export default function ProductListing({products,handleToggleCollapse,handleManageCollapsedDiv}) {
  return (
    <div className="best-product-wrapper">
      {products.map((product, index) => (
        <Product
        incomingProduct={product}
          key={index}
          position={index + 1}
          handleToggleCollapse={handleToggleCollapse}
          handleManageCollapsedDiv={handleManageCollapsedDiv}
        />
      ))}
    </div>
  );
}