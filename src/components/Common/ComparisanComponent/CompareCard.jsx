import React from "react";
import Image from "next/image";
const CompareCard = ({
  compareProduct,
  products,
  productIndex,
  setIsOpen,
  handelRemoveProductFormComparison,
}) => {
  const handelRemoveProduct = (index) => {
    handelRemoveProductFormComparison(index);
  };
  const findProductsScoreLabelIndex = (products) => {
    if (products.length === 0) {
      return "";
    }
    const maxScore = Math.max(...products.map((obj) => obj.overall_score));
    const winningProductIndex = products
      .map((obj, index) => (obj.overall_score === maxScore ? index : undefined))
      .filter((index) => index !== undefined);
    return winningProductIndex.length === 1 ? winningProductIndex[0] : -1000;
  };
  const productScoreLabelIndex = findProductsScoreLabelIndex(products);
  // format overallScore Value to decimal
  const formatValue = (value) => {
    if (value % 1 === 0 && value !== 10) {
      return `${value}.0`;
    }
    return value;
  };

  const urlChange = (i) => {
    let x = window.location.pathname.split("/")[2].split("-vs-");
    // Create a new array without the element at the specified index
    const newArray = [...x.slice(0, i), ...x.slice(i + 1)];

    if (newArray.length > 1) {
      let newUrl = newArray.join("-vs-");
      let path = `${window.location.origin}/${
        window.location.pathname.split("/")[1]
      }/${newUrl}`;
      window.location.href = path;
    }

    newArray.length <= 1 && handelRemoveProduct(i);
  };

  return (
    <div className="comparison-wrapper">
      {compareProduct.length <= 0 ? (
        <div className="add-product" onClick={() => setIsOpen(true)}>
          <div className="add-product-inner-content">
            <Image src="/images/add_icon.svg" width={50} height={50} alt="" />
            <p>add a product to compare</p>
          </div>
        </div>
      ) : (
        <>
          {productScoreLabelIndex !== "" &&
            productScoreLabelIndex === productIndex && (
              <div className="comparison-tag">Winner</div>
            )}
          {productScoreLabelIndex === -1000 && productIndex === 0 && (
            <div className="comparison-tag">draw! No clear winner</div>
          )}

          <div className="comparison-card">
            <Image
              src={
                compareProduct?.main_image
                  ? compareProduct?.main_image
                  : "/images/nofound.png"
              }
              width={0}
              height={0}
              alt=""
              sizes="100%"
            />
            <div className="comparison-card-footer">
              <h2 className="product-title">{compareProduct.name}</h2>
            </div>
            <span
              className="count"
              style={{
                background:
                  compareProduct.overall_score >= 7.5
                    ? "#093673"
                    : compareProduct.overall_score >= 5 &&
                      compareProduct.overall_score < 7.5
                    ? "#437ECE"
                    : "#85B2F1",
              }}
            >
              {formatValue(compareProduct?.overall_score)}
            </span>
            <i
              className="ri-close-circle-line close_icon"
              onClick={
                () => urlChange(productIndex)
                //
              }
            ></i>
          </div>
          <div className="comparison-product-spec">
            {compareProduct?.price_websites?.length > 0 ? (
              <>
                <div className="comparison-product-item">
                  <Image
                    src={
                      compareProduct?.price_websites[0]?.price != null &&
                      compareProduct?.price_websites[0]?.logo
                    }
                    width={0}
                    height={0}
                    sizes="100%"
                    alt=""
                  />
                  {compareProduct?.price_websites[0]?.price != null && (
                    <span>{compareProduct?.price_websites[0]?.price} €</span>
                  )}
                </div>
                <div className="comparison-product-item">
                  <Image
                    src={compareProduct?.price_websites[1]?.logo}
                    width={0}
                    height={0}
                    sizes="100%"
                    alt=""
                  />
                  {compareProduct?.price_websites[1]?.price != null && (
                    <span>{compareProduct?.price_websites[1]?.price} €</span>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="not-availabel">
                  <span className="txt">NOT AVAILABLE</span>
                  <span className="price">~ {compareProduct?.price} €</span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompareCard;
