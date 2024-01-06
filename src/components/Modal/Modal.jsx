import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Compare from "../Common/Compare/Compare";
import Image from "next/image";
import { productService } from "../../_services";
import { useSelector } from "react-redux";

const CompareModal = ({
  setIsOpen,
  compareProDataFirst,
  compareProDataSec,
}) => {
  const [searchValue1, setSearchValue1] = useState("");
  const [searchValue2, setSearchValue2] = useState("");
  const [searchValue3, setSearchValue3] = useState("");
  const [guideCatID, setGuideCatID] = useState();

  const ProductId = useSelector((state) => state.comparePro.compareProduct);
  const [oftenData, setOffenData] = useState([]);

  useEffect(() => {
    // Code that uses localStorage
    var checkId = localStorage?.getItem("catIdGuide");
    if (checkId) {
      setGuideCatID(checkId);
    }
  }, []);
  useEffect(() => {
    productService
      .getComparedoftenProduct(
        ProductId[0]?.catID ? ProductId[0]?.catID : guideCatID
      )
      .then((res) => {
        console.log(res.data.data, "response");
        setOffenData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (compareProDataFirst?.name) {
      setSearchValue1(compareProDataFirst);
    }
    if (compareProDataSec?.name) {
      setSearchValue2(compareProDataSec);
    }
  }, [ProductId, guideCatID]);

  const handleProductClick = (item) => {
    console.log(item);
    if (!searchValue2) {
      setSearchValue2(item);
    } else {
      setSearchValue3(item);
    }
  };
  const setIsOpenClick = () => {
    setIsOpen(false);
    // window.location.reload(true);
  };
  return (
    <section className="add-product-modal">
      <div className="add-product-modal-header">
        <Container>
          <Row>
            <Col md={12}>
              <span
                className="d-block text-end"
                onClick={() => setIsOpen(false)}
              >
                <i className="ri-close-circle-line close_icon"></i>
              </span>
            </Col>
            <Col md={12}>
              <h2 className="site-main-heading">Add to Comparison</h2>
              <Compare
                searchValue1={searchValue1}
                searchValue2={searchValue2}
                setIsOpen={setIsOpenClick}
                modelOpen={true}
                searchValue3={searchValue3}
              />
            </Col>
          </Row>
        </Container>
      </div>
      {oftenData?.length != 0 && (
        <Container className="mt-4">
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Often Compared With...</h2>
            </Col>
          </Row>
          <Row>
            {oftenData?.map(function (item, index) {
              return (
                <Col
                  xl={2}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={6}
                  className="my-3"
                  key={index}
                  onClick={() => handleProductClick(item)}
                >
                  <div className="review-wrapper">
                    <div className="review-card">
                      <img
                        src={
                          item?.main_image === null
                            ? "/images/nofound.png"
                            : item?.main_image
                        }
                        width={0}
                        height={0}
                        sizes="100%"
                        alt=""
                      />

                      <div className="footer_content">
                        <span>{item?.name || ""}</span>
                        <p>{item?.text_part || ""}</p>
                      </div>
                      <span
                        className="rating_count"
                        style={{
                          background:
                            item?.overall_score >= 7.5
                              ? "#093673"
                              : item?.overall_score >= 5 &&
                                item?.overall_score < 7.5
                              ? "#437ECE"
                              : " #85B2F1",
                        }}
                      >
                        {item?.overall_score || ""}
                      </span>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </section>
  );
};

export default CompareModal;
