import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { productService } from "@/_services";
import { useSelector, useDispatch } from "react-redux";
import CompareForm from "./CompareForm";
import { updateCompareProduct } from "@/redux/features/compareProduct/compareProSlice";
const CompareModal = ({
  setIsOpen
}) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.comparePro.compareProduct)[0];
  const [oftenProducts, setOftenProducts] = useState();
  const [categoryId, setCategoryId] = useState(reduxData?.category ? reduxData?.category : undefined);
  const handelCloseCompareModel = () => {
    setIsOpen(false);
    // window.location.reload(true);
  };

  const handelCategoryForOffenProduct = (id) => {
    setCategoryId(id)
  }

  const handelOffenProductClick = (product) => {
    if (reduxData?.productSecond === undefined) {
      dispatch(updateCompareProduct({ key: 'productSecond', data: product }));
    return;
    }
    if (reduxData?.productThird === undefined) {
      dispatch(updateCompareProduct({ key: 'productThird', data: product }));
      return;
    }
  }
  
  useEffect(() => {
    if (categoryId) {
      productService.getComparedoftenProduct(categoryId)
        .then((res) => {
          setOftenProducts(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categoryId])
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
              <CompareForm location="ON_MODEL"
                handelCloseCompareModel={handelCloseCompareModel}
                handelCategoryForOffenProduct={handelCategoryForOffenProduct}
              />
            </Col>
          </Row>
        </Container>
      </div>
      {oftenProducts?.length > 0 && (
        <Container className="mt-4">
          <Row>
            <Col md={12}>
              <h2 className="site-main-heading">Often Compared With...</h2>
            </Col>
          </Row>
          <Row>
            {oftenProducts?.map(function (item, index) {
              return (
                <Col
                  xl={2}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={6}
                  className="my-3"
                  key={index}
                  onClick={() => handelOffenProductClick(item)}
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
