import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";

const GuidePagination = ({ pagination }) => {
  const { current_page, total_pages } = pagination;
  const [currentPage, setCurrentPage] = useState(current_page || 1); // Initialize currentPage to current_page or 1 if not provided
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = new URL(window.location.href);
    const pageParam = url.searchParams.get("page");
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }
  }, []);

  const handlePageClick = (page) => {
    const newPage = typeof page === "number" ? page : currentPage + 1;
    const currentParams = new URLSearchParams(searchParams.toString());
    const url = new URL(window.location.href);
    setCurrentPage(newPage);
    currentParams.set("page", newPage);
    url.searchParams.set("page", newPage);
    // Update the URL without triggering a page reload (hack)
    window.history.pushState({}, "", url.toString());
    router.push(`?${currentParams.toString()}`, { scroll: false });

    // Scroll to the top of the product list
    const productListElement = document.getElementById("scroll__top");
    if (productListElement) {
      productListElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  // Generate an array of page numbers
  const pagesArray = Array.from({ length: total_pages }, (_, i) => i + 1);

  return (
    <>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center text-center">
          <ul className="custom-pagination">
            {currentPage === 1 ? null : (
              <>
                <li onClick={() => handlePageClick(1)} className="page_first">
                  First
                </li>
                <li
                  onClick={() => handlePageClick(currentPage - 1)}
                  className="page_previous"
                >
                  Previous
                </li>
              </>
            )}
            {pagesArray.map((item, index) => (
              <li
                onClick={() => handlePageClick(item)}
                className={
                  item === currentPage
                    ? "page_active"
                    : item === 1
                    ? "page_default"
                    : ""
                }
                key={index}
              >
                {item}
              </li>
            ))}
            {currentPage < total_pages && (
              <li
                onClick={() => handlePageClick(currentPage + 1)}
                className="page_next"
              >
                Next
              </li>
            )}
            {currentPage === total_pages ? null : (
              <li
                onClick={() => handlePageClick(total_pages)}
                className="page_last"
              >
                Last
              </li>
            )}
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default GuidePagination;
