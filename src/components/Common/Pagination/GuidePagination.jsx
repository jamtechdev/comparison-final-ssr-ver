"use client"
import { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useRouter, useSearchParams } from "next/navigation";
const GuidePagination = ({ pagination }) => {
  const { current_page, total_pages } = pagination;
  const [currentPage, setCurrentPage] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get(["page"])) {
      setCurrentPage(parseInt(url.searchParams.get(["page"])));
    } else {
      setCurrentPage(currentPage)
    }
  }, [])
  const handlePageClick = (page) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const url = new URL(window.location.href);
    setCurrentPage(page);
    currentParams.set("page", page);
    url.searchParams.set("page", page);
    // Update the URL without triggering a page reload (hack)
    window.history.pushState({}, '', url.toString());
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };
  // Generate an array of page numbers
  const pagesArray = Array.from({ length: total_pages }, (_, i) => i + 1);
  return (
    <>
      <Row className="mt-4">
        {/* <Col md={12} className="text-center">
          <Button className="view-blog load-more">
            Load more <i className="ri-arrow-right-s-line"></i>
          </Button>
        </Col> */}
        <Col className="d-flex justify-content-center text-center">
          <ul className="custom-pagination">
            {pagesArray.map((item, index) => (
              <li
                onClick={() => handlePageClick(item)}
                className={item == currentPage ? 'page_active' : ''}
                key={index}
              >
                {item}
              </li>
            ))}
            {currentPage === total_pages ? null : (
              <li
                className="page_next"
                onClick={() => handlePageClick(currentPage + 1)}
              >
                Next
              </li>
            )}
            <li className="page_last" onClick={() => handlePageClick(total_pages)}>
              Last
            </li>
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default GuidePagination;
