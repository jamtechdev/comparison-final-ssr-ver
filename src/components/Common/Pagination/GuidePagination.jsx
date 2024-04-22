import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
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
      setCurrentPage(currentPage);
    }
  }, []);

  const handlePageClick = (page) => {
    const newPage = typeof page === 'number' ? page : currentPage + 1;
    const currentParams = new URLSearchParams(searchParams.toString());
    const url = new URL(window.location.href);
    setCurrentPage(newPage);
    currentParams.set("page", newPage);
    url.searchParams.set("page", newPage);
    // Update the URL without triggering a page reload (hack)
    window.history.pushState({}, '', url.toString());
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  // Generate an array of page numbers
  const pagesArray = Array.from({ length: total_pages }, (_, i) => i + 1);

  return (
    <>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center text-center">
          <ul className="custom-pagination">
            {currentPage > 1 && (
              <li
                className="page_prev"
                onClick={() => handlePageClick(currentPage - 1)}
              >
                Previous
              </li>
            )}
            {pagesArray.map((item, index) => (
              <li
                onClick={() => handlePageClick(item)}
                className={!currentPage && item === 1 ? 'page_active' : item === currentPage ? 'page_active' : ''}
                key={index}
              >
                {item}
              </li>
            ))}
            {currentPage < total_pages && (
              <li
                className="page_next"
                onClick={() => handlePageClick(currentPage + 1)}
              >
                Next
              </li>
            )}
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default GuidePagination;
