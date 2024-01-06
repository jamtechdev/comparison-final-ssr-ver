import React, { useEffect, useState } from "react";
import { homePage } from "../../_services/homepage.service";
import Link from "next/link";

const SearchList = ({
  search,
  isFocused,
  compareProSearchList,
  compareTabType,
  onSendValue,
  onSendValue2,
  onSendValue3,
  search2,
  search3,
  compareProSearchListForCat,
  compareProSearchListForCat3,
  catId,
  catId3,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [filteredProData, setFilteredProData] = useState([]);
  const [filteredProData2, setFilteredProData2] = useState([]);
  const [filteredProData3, setFilteredProData3] = useState([]);

  const [selectedText, setSelectedText] = useState();

  const [childValue, setChildValue] = useState("");
  const [childValue2, setChildValue2] = useState("");
  const [childValue3, setChildValue3] = useState("");
  const [sendHandler, setSendHandler] = useState();

  const handleChange = (item) => {
    // let value = event.target.outerText;
    setChildValue(item.name);
    // Send the value to the parent component
    onSendValue(item);
  };
  const handleChange2 = (item) => {
    // let value = event.target.outerText;
    setChildValue2(item.name);
    // Send the value to the parent component
    onSendValue2(item);
  };
  const handleChange3 = (item) => {
    // let value = event.target.outerText;
    setChildValue3(item.name);
    // Send the value to the parent component
    onSendValue3(item);
  };
  useEffect(() => {
    if (search !== "" && search !== undefined) {
      homePage
        .searchFilter(search)
        .then((res) => {
          setFilteredData(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [search]);
  useEffect(() => {
    if (compareProSearchList != "" && compareProSearchList != undefined) {
      console.log("11111111111111111");
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
      console.log("2222222222");
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
      console.log("33333333333333");
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

  const paramsCate = (category, links) => {
    if (category === "guides") {
      // Clear search input
      return "/" + links;
    } else if (category === "products") {
      // Clear search input
      return "/product/" + links;
    } else {
      return "/blog/" + links;
    }
  };

  // const clearSearch= ()=>{
  //   setsearch('')
  // }

  return (
    <>
      <div
        className={
          (isFocused && search?.length > 0) ||
          (isFocused && compareProSearchList?.length > 0) ||
          (isFocused && compareProSearchListForCat?.length > 0) ||
          (isFocused && compareProSearchListForCat3?.length > 0)
            ? ""
            : "d-none"
        }
      >
        <div className="search-dropdown-list">
          {filteredData &&
            Object.keys(filteredData).map((category, index) => (
              <div className="search-data-list" key={index}>
                <h2 className="search-data-heading">
                  {capitalizeFirstLetter(category)}
                </h2>
                <ul>
                  {/* `${
                        category === "guides" ? "/" + item.permalink : ""
                      }` */}
                  {filteredData[category].map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      // onClick={clearSearch}
                      href={paramsCate(category, item?.permalink)}
                      style={{ cursor: "pointer" }}
                    >
                      <li style={{ cursor: "pointer" }}>
                        <span style={{ cursor: "pointer" }}>
                          {item?.short_name || item?.title}
                        </span>

                        {item?.banner_image && (
                          <img
                            src={item?.banner_image || item?.image}
                            alt={`Image ${itemIndex}`}
                          />
                        )}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          {!filteredData && search !== "" && (
            <div className="search-data-list">
              <span className="no-result-found">No results found</span>
            </div>
          )}

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
                {/* <ul>
                  <Link
                    href="#"
               
                  >
                    <li>
                      <span>{item?.name}</span>

                      {item?.main_image && (
                        <img
                          src={item?.main_image}
                          alt={`Image ${itemIndex}`}
                        />
                      )}
                    </li>
                  </Link>
                 
                </ul> */}
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
                {/* <ul>
                  <Link
                    href="#"
               
                  >
                    <li>
                      <span>{item?.name}</span>

                      {item?.main_image && (
                        <img
                          src={item?.main_image}
                          alt={`Image ${itemIndex}`}
                        />
                      )}
                    </li>
                  </Link>
                 
                </ul> */}
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
                {/* <ul>
                  <Link
                    href="#"
               
                  >
                    <li>
                      <span>{item?.name}</span>

                      {item?.main_image && (
                        <img
                          src={item?.main_image}
                          alt={`Image ${itemIndex}`}
                        />
                      )}
                    </li>
                  </Link>
                 
                </ul> */}
              </div>
            ))}
          {(filteredProData == "" ||
            search == "" ||
            filteredProData2 == "" ||
            filteredProData3) && (
            <div className="search-data-list">
              <span className="no-result-found">No results found</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchList;
