"use client";
import { homePage } from "@/_services";
import React, { useEffect, useState } from "react";
function CompareSearchList({
  compareProSearchList,
  isFocused,
  onSendValue,
  onSendValue2,
  onSendValue3,
  compareProSearchListForCat,
  compareProSearchListForCat3,
  catId,
  catId3,
}) {
  const [filteredProData, setFilteredProData] = useState([]);
  const [filteredProData2, setFilteredProData2] = useState([]);
  const [filteredProData3, setFilteredProData3] = useState([]);

  const [selectedText, setSelectedText] = useState();

  const [childValue, setChildValue] = useState("");
  const [childValue2, setChildValue2] = useState("");
  const [childValue3, setChildValue3] = useState("");
  const [sendHandler, setSendHandler] = useState();

  const handleChange = (item) => {
    setChildValue(item.name);
    // Send the value to the parent component
    onSendValue(item);
  };
  const handleChange2 = (item) => {
    setChildValue2(item.name);
    // Send the value to the parent component
    onSendValue2(item);
  };
  const handleChange3 = (item) => {
    setChildValue3(item.name);
    // Send the value to the parent component
    onSendValue3(item);
  };
  useEffect(() => {
    if (compareProSearchList != "" && compareProSearchList != undefined) {
      homePage
        .getAllSearchedProducts(compareProSearchList)
        .then((res) => {
          setFilteredProData(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [compareProSearchList]);

  useEffect(() => {
    if (
      compareProSearchListForCat != "" &&
      compareProSearchListForCat != undefined &&
      catId != undefined
    ) {
      homePage
        .getAllSearchedProductsByCategory(catId, compareProSearchListForCat)
        .then((res) => {
          setFilteredProData2(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [compareProSearchListForCat, catId]);

  useEffect(() => {
    if (
      compareProSearchListForCat3 != "" &&
      compareProSearchListForCat3 != undefined &&
      catId3 != undefined
    ) {
      homePage
        .getAllSearchedProductsByCategory(catId3, compareProSearchListForCat3)
        .then((res) => {
          setFilteredProData3(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [compareProSearchListForCat3, catId3]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div
        className={
          (isFocused && compareProSearchList?.length > 0) ||
          (isFocused && compareProSearchListForCat?.length > 0) ||
          (isFocused && compareProSearchListForCat3?.length > 0)
            ? ""
            : "d-none"
        }
      >
        <div className="search-dropdown-list">
          {/* compare home page */}
          {filteredProData &&
            filteredProData.map((item, index) => (
              <div className="search-data-list" key={index}>
                <h2
                  className="search-data-heading compare-search-list"
                  onClick={(e) => {
                    handleChange(item);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {capitalizeFirstLetter(item?.name)}
                </h2>
              </div>
            ))}
          {filteredProData2 &&
            filteredProData2.map((item, index) => (
              <div className="search-data-list" key={index}>
                <h2
                  className="search-data-heading compare-search-list"
                  onClick={(e) => {
                    handleChange2(item);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {capitalizeFirstLetter(item?.name)}
                </h2>
              </div>
            ))}
          {filteredProData3 &&
            filteredProData3.map((item, index) => (
              <div className="search-data-list" key={index}>
                <h2
                  className="search-data-heading compare-search-list"
                  onClick={(e) => {
                    handleChange3(item);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {capitalizeFirstLetter(item?.name)}
                </h2>
              </div>
            ))}
          {(filteredProData2 == "" || filteredProData3) && (
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
