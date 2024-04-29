import { useEffect, useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import ProductListing from "../ProductListing/ProductListing";

const GuidePagination = ({ pagination }) => {
  const { current_page, total_pages } = pagination;
  const [currentPage, setCurrentPage] = useState(current_page || 1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productListRef = useRef(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const pageParam = url.searchParams.get("page");
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }
  }, []);

  const handlePageClick = (page) => {
    const newPage = typeof page === 'number' ? page : currentPage + 1;
    const currentParams = new URLSearchParams(searchParams.toString());
    const url = new URL(window.location.href);
    setCurrentPage(newPage);
    currentParams.set("page", newPage);
    url.searchParams.set("page", newPage);
    window.history.pushState({}, "", url.toString());
    router.push(`?${currentParams.toString()}`, { scroll: false });

    // Fetch data without async/await
    fetch(`https://your-api-url.com/data?page=${newPage}`)
      .then(response => response.json())
      .then(data => {
        // Handle the fetched data
        console.log(data);
        // Scroll to the top of the product list
        if (productListRef.current) {
          productListRef.current.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  const pagesArray = Array.from({ length: total_pages }, (_, i) => i + 1);

  return (
    <>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center text-center">
          <ul className="custom-pagination">
            {currentPage === 1 ? null : (
              <>
                <li
                  className="page_first"
                  onClick={() => handlePageClick(1)}
                >
                  First
                </li>
                <li
                  className="page_previous"
                  onClick={() => handlePageClick(currentPage - 1)}
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
                className="page_next"
                onClick={() => handlePageClick(currentPage + 1)}
              >
                Next
              </li>
            )}
            {currentPage === total_pages ? null : (
              <li
                className="page_last"
                onClick={() => handlePageClick(total_pages)}
              >
                Last
              </li>
            )}
          </ul>
        </Col>
      </Row>
      <div ref={productListRef}>
        <ProductListing />
      </div>
    </>
  );
};

export default GuidePagination;
