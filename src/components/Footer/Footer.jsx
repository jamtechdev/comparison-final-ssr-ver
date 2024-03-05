import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Col,
  Container,
  Form,
  NavDropdown,
  Row,
} from "react-bootstrap";
import NewsLetter from "../Common/NewsLetter/newsLetter.jsx";
import { useEffect, useState } from "react";
export default function Footer({ footerData }) {
  // console.log(footerData);
  // news letter pop up
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <footer>
      <div className={styles.signupContainer}>
        <Container>
          <Row className="align-items-center ">
            <Col lg={6} md={12} xs={12}>
              {/* footer_page_phases: {
      sign_up_text: 'Sign Up Text',
      sign_up_label: 'Sign Up Label',
      sign_up_button: 'Sign Up Label',
      sign_up_placeholder: 'Sign Up Placeholder',
      copyright: 'Copyright'
    }, */}
              <div className={"text-uppercase " + styles.singupNewsletter}>
                {footerData?.footer_page_phases?.sign_up_text}
              </div>
              <p className="space-bottom-para">
                {footerData?.footer_page_phases?.sign_up_label}
              </p>
            </Col>
            <Col lg={6} md={12} xs={12} className="top-space">
              <Form className={"d-flex " + styles.emailinput}>
                <div className="search-icon">
                  <i className="ri-mail-line"></i>
                </div>
                <Form.Control
                  type="email"
                  placeholder={`${footerData?.footer_page_phases?.sign_up_placeholder}`}
                  aria-label="Search"
                />
                <Button onClick={handleShow}>
                  {footerData?.footer_page_phases?.sign_up_button}
                </Button>
                <NewsLetter
                  show={show}
                  setShow={setShow}
                  handleClose={handleClose}
                  handleShow={handleShow}
                />
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="footer-container">
        <Row>
          <Col lg={3} md={6}>
            <div className="footer-content">
              <Image
                src={`https://panel.mondopedia.it/logos/app_logo.png`}
                alt="Logo"
                width={118}
                height={40}
              />
              <p>{footerData && footerData?.column_one?.desc}</p>
              <div className="social-icon">
                {Object.keys(footerData?.column_one || {}).map((platform) => {
                  const link = footerData.column_one[platform];
                  const iconClass = `ri-${platform.replace("_link", "")}-fill`;

                  return (
                    link && (
                      <Link key={platform} href={link}>
                        <i className={iconClass}></i>
                      </Link>
                    )
                  );
                })}
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} className="">
            <span className="footer_heading">
              {footerData?.column_two?.c2nd_title}
            </span>
            <div className="address-section">
              {footerData?.column_two?.address && (
                <div className="inner-item">
                  <Image
                    src="/images/location.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <p>{footerData?.column_two?.address}</p>
                </div>
              )}
              {footerData?.column_two?.phone && (
                <div className="inner-item">
                  <Image src="/images/call.svg" width={20} height={20} alt="" />
                  <p>{footerData?.column_two?.phone}</p>
                </div>
              )}
              {footerData?.column_two?.email && (
                <div className="inner-item">
                  <Image
                    src="/images/message.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <p>{footerData?.column_two?.email}</p>
                </div>
              )}
            </div>
          </Col>
          <Col lg={3} md={6} xs={6} className="top-space">
            <span className="footer_heading">
              {footerData?.column_three?.c3rd_title}
            </span>
            {footerData &&
              footerData?.column_three?.name_link?.map((item, index) => {
                return (
                  <ul
                    className={
                      item[`name${index + 1}`] != null ? "footer_list-item" : ""
                    }
                    key={index}
                  >
                    <li>
                      <Link href={item[`link${index + 1}`] || ""}>
                        {item[`name${index + 1}`] != null
                          ? item[`name${index + 1}`]
                          : ""}
                      </Link>
                    </li>
                  </ul>
                );
              })}
          </Col>
          <Col lg={3} md={6} xs={6} className="top-space">
            <span className="footer_heading">
              {footerData?.column_four?.title}
            </span>
            <ul className="footer_list-item">
              {footerData &&
                footerData?.column_four?.categories?.map((cat, index) => {
                  return (
                    cat?.title && (
                      <li key={index}>
                        <Link href={`/${cat.title}`}>{cat.title}</Link>
                      </li>
                    )
                  );
                })}
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="copy-right">
        <p className="text-center">
          {footerData?.footer_page_phases?.copyright}
        </p>
      </div>
    </footer>
  );
}
