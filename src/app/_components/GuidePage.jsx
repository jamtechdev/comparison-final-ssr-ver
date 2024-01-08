"use client";
import {
  filterProducts,
  handleFilterValueChange,
  arrangeProducts,
  arrangeCategories,
  productsLastFilter,
} from "@/_helpers";
import { useEffect, useRef, useState } from "react";
import { guideService } from "@/_services";
import { useDispatch, useSelector } from "react-redux";
import useChart from "@/hooks/useChart";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import Link from "next/link";
import BreadCrumb from "@/components/Common/BreadCrumb/breadcrum";
import Filter from "@/components/Common/Filter/Filter";
import ProductListing from "@/components/Common/ProductListing/ProductListing";
import ProductSlider from "@/components/Common/ProductSlider/productSlider";
import MobileCompareTable from "@/components/Common/MobileCompareTable/MobileCompareTable";
import CompareTable from "@/components/Common/CompareTable/CompareTable";
import BottomBar from "@/components/Common/BottomBar/BottomBar";
export default function GuidePage({ slug, guideData }) {
  useChart();
  const guide = guideData[0].data;
  const products = guideData[1].data.products;
  const productPagination = guideData[1].data.pagination;
  return (
    <>
      <section className="product-header">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <BreadCrumb
                firstPageName="Electronics"
                secondPageName="Samsung New VR Headset Oculus 2.0"
              />
            </Col>
            <Col md={12} lg={12} xl={9}>
              <h1 className="site-main-heading">{guide?.title}</h1>
            </Col>

            <Col md={12} lg={12} xl={3}>
              <div className="user-info-section">
                {guide?.author && (
                  <div className="user-section">
                    {guide?.author?.image && (
                      <img
                        src={
                          guide?.author?.image
                            ? guide?.author?.image
                            : "/images/user.png"
                        }
                        width={0}
                        height={0}
                        sizes="100%"
                        alt=""
                      />
                    )}

                    <div className="user-detail">
                      <p>
                        <Link href={`/author/${guide?.guide?.id}`}>
                          {guide?.author?.name}
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
                <span>
                  updated:
                  <i> {guide?.updated_at}</i>
                </span>
              </div>
            </Col>
            <Col md={12}>
              <p className="product-inner-content">{guide?.text_first_part}</p>
            </Col>
          </Row>
          <Row className="pt-3 best-page-card">
            {Object.values(guide.top_guide_counts).map(function (item, index) {
              return (
                <Col className="p-2" md={6} lg={3} sm={6} xs={6} key={index}>
                  <div className="hero-card-content">
                    <span className="count">{item.count}</span>
                    <span className="card-heading">{item.heading}</span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      <section className="ptb-25">
        <Container>
          <Row>
            <Col md={12}>
              <p className="para_content_text">{guide?.text_second_part}</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
