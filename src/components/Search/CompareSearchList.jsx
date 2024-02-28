"use client";
import { homePage } from "@/_services";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
function CompareSearchList({
  isFocused,
  onSendValue,
  product_cat_id,
  searchedKeyWord,
  inputPostion,
  handelCategoryUpdate,
  category_id,
}) {
  const reduxData = useSelector((state) => state.comparePro.compareProduct)[0];
  const getGuideCompareReduxData = useSelector(
    (state) => state.comparePro.guideCompareProduct
  );
  const [filteredProData, setFilteredProData] = useState([]);
  const handleChange = (data, inputPostion) => {
    if (inputPostion === "productFirst") {
      handelCategoryUpdate(data.category_id || category_id);
    }
    onSendValue(inputPostion, data);
  };
  // console.log(category_id);

  useEffect(() => {
    if (typeof searchedKeyWord === "object") {
      return;
    }

    if (searchedKeyWord.trim() != "" && searchedKeyWord != undefined) {
      if (inputPostion === "productFirst") {
        homePage
          .getAllSearchedProducts(searchedKeyWord)
          .then((res) => {
            // Prioritize results starting with the entered letters
            const startsWithResults = res.data.data.filter((item) =>
              item.name.toLowerCase().startsWith(searchedKeyWord.toLowerCase())
            );

            // Include other results that contain the entered letters
            const containsResults = res.data.data.filter(
              (item) => !startsWithResults.includes(item)
            );

            setFilteredProData([...startsWithResults, ...containsResults]);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } else {
        homePage
          .getAllSearchedProductsByCategory(1, searchedKeyWord)
          .then((res) => {
            if (inputPostion === "productSecond") {
              if (res.data.data.length > 0) {
                const filteredProducts = res.data.data.filter(
                  (item) =>
                    item.name !== reduxData?.productSecond?.name &&
                    item.name !== reduxData?.productThird?.name &&
                    item?.name !== getGuideCompareReduxData[1]?.name &&
                    item?.name !== getGuideCompareReduxData[2]?.name
                );

                setFilteredProData(filteredProducts);
              }
            }

            if (inputPostion === "productSecond") {
              if (res.data.data.length > 0) {
                const filteredProducts = res.data.data.filter(
                  (item) =>
                    item.name !== reduxData?.productFirst?.name &&
                    item.name !== reduxData?.productThird?.name &&
                    item?.name !== getGuideCompareReduxData[0]?.name &&
                    item?.name !== getGuideCompareReduxData[2]?.name
                );

                setFilteredProData(filteredProducts);
              }
            }
            if (inputPostion === "productThird") {
              if (res.data.data.length > 0) {
                const filteredProducts = res.data.data.filter(
                  (item) =>
                    item.name !== reduxData?.productFirst?.name &&
                    item.name !== reduxData?.productSecond?.name &&
                    item?.name !== getGuideCompareReduxData[0]?.name &&
                    item?.name !== getGuideCompareReduxData[1]?.name
                );

                setFilteredProData(filteredProducts);
              }
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }
  }, [searchedKeyWord]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div className={isFocused && searchedKeyWord?.length > 0 ? "" : "d-none"}>
        <div className="search-dropdown-list">
          {/* compare home page */}
          {filteredProData &&
            filteredProData.map((item, index) => (
              <div className="search-data-list" key={index}>
                <h2
                  className="search-data-heading compare-search-list"
                  onClick={(e) => {
                    handleChange(item, inputPostion);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {capitalizeFirstLetter(item?.name)}
                  <span>
                    <i>
                      (
                      {item?.category_url
                        ? item?.category_url.split("-").join(" ")
                        : ""}
                      )
                    </i>
                  </span>
                </h2>
              </div>
            ))}
          {filteredProData?.length < 0 ||
            (!filteredProData && <p>NO MATCH FOUND</p>)}
        </div>
      </div>
    </>
  );
}

export default CompareSearchList;
