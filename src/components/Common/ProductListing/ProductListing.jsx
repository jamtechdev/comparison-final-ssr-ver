import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Product from "./Product/Product";
export default function ProductListing({
  products,
  productPositionArray,
  handleToggleCollapse,
  handleManageCollapsedDiv,
  guidePhraseData,
  slug,
  order,
}) {
  function findProductPosition(name) {
    const index = Object.values(productPositionArray).indexOf(name);

    if (index !== -1) {
      return index + 1;
    } else {
      return null;
    }
  }
  // console.log(findProductPosition(product.name)
  return (
    <div className="best-product-wrapper">
      <span className="testing__text"><i>This is a testing text that I’d like to add in this page.</i></span>
      {products.map((product, index) => (
        <Product
          guidePhraseData={guidePhraseData}
          incomingProduct={product}
          KeyIndex={index}
          position={findProductPosition(product.name)}
          handleToggleCollapse={handleToggleCollapse}
          handleManageCollapsedDiv={handleManageCollapsedDiv}
          slug={slug}
          order={order}
        />
      ))}
      <span className="testing__text"><i>This is a testing text that I’d like to add in this page.</i></span>
    </div>
  );
}
