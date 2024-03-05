import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Product from "./Product/Product";
export default function ProductListing({ products, productPositionArray, handleToggleCollapse, handleManageCollapsedDiv,guidePhraseData }) {
  function findProductPosition(name) {
    const index = Object.values(productPositionArray).indexOf(name);
    if (index !== -1) {
      return index + 1;
    } else {
      return null;
    }
  }
  // console.log(guidePhraseData)
  return (
    <div className="best-product-wrapper">
      {products.map((product, index) => (
        <Product
        guidePhraseData={guidePhraseData}
          incomingProduct={product}
          key={index}
          position={findProductPosition(product.name)}
          handleToggleCollapse={handleToggleCollapse}
          handleManageCollapsedDiv={handleManageCollapsedDiv}
        />
      ))}
    </div>
  );
}