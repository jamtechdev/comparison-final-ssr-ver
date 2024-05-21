"use client";
import { homePage } from "@/_services";
import React, { useCallback, useEffect, useState } from "react";
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
  const [debouncedKeyword, setDebouncedKeyword] = useState(searchedKeyWord);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const handleChange = (data, inputPostion) => {
    if (inputPostion === "productFirst") {
      handelCategoryUpdate(data.category_id);
    }
    onSendValue(inputPostion, data);
  };
  // console.log(searchedKeyWord);

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced effect
  const debounceSetKeyword = useCallback(
    debounce((nextValue) => setDebouncedKeyword(nextValue), 500),
    []
  );

  useEffect(() => {
    debounceSetKeyword(searchedKeyWord);
  }, [searchedKeyWord]);

  useEffect(() => {
    if (typeof debouncedKeyword !== "string") {
      return;
    }

    if (debouncedKeyword.trim() !== "" && debouncedKeyword !== undefined) {
      if (inputPostion === "productFirst") {
        homePage
          .getAllSearchedProducts(debouncedKeyword)
          .then((res) => {
            const startsWithResults = res.data.data.filter((item) =>
              item.name.toLowerCase().startsWith(debouncedKeyword.toLowerCase())
            );
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
          .getAllSearchedProductsByCategory(category_id, debouncedKeyword)
          .then((res) => {
            if (res.data.data === null) {
              setSearchPerformed(true);
              setFilteredProData([]);
            } else {
              let filteredProducts = res.data.data;
              if (inputPostion === "productSecond") {
                filteredProducts = res.data.data.filter(
                  (item) =>
                    item.name !== reduxData?.productFirst?.name &&
                    item.name !== reduxData?.productThird?.name &&
                    item?.name !== getGuideCompareReduxData[0]?.name &&
                    item?.name !== getGuideCompareReduxData[2]?.name
                );
              }
              if (inputPostion === "productThird") {
                filteredProducts = res.data.data.filter(
                  (item) =>
                    item.name !== reduxData?.productFirst?.name &&
                    item.name !== reduxData?.productSecond?.name &&
                    item?.name !== getGuideCompareReduxData[0]?.name &&
                    item?.name !== getGuideCompareReduxData[1]?.name
                );
              }
              setFilteredProData(filteredProducts);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    } else {
      setFilteredProData([]);
    }
  }, [debouncedKeyword]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div className={isFocused && searchedKeyWord?.length > 0 ? "" : "d-none"}>
        <div className="search-dropdown-list">
          {/* compare home page */}
          {filteredProData &&
            filteredProData.slice(0, 10).map((item, index) => (
              <div className="search-data-list" key={index}>
                <h2
                  className="search-data-heading compare-search-list"
                  onClick={(e) => {
                    handleChange(item, inputPostion);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <b>{capitalizeFirstLetter(item?.name)}</b>
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
          {/* {console.log(searchPerformed)} */}

          {searchPerformed && (
            <div className="search-data-list">
              <span className="no-result-found">No results found</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CompareSearchList;
