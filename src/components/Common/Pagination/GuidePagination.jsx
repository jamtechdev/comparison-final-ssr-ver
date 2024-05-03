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
    let newPage;

    if (page === "Previous") {
      newPage = currentPage - 1;
    } else if (page === "Next") {
      newPage = currentPage + 1;
    } else {
      newPage = page;
    }

    const currentParams = new URLSearchParams(searchParams.toString());
    const url = new URL(window.location.href);
    setCurrentPage(newPage);
    currentParams.set("page", newPage);
    url.searchParams.set("page", newPage);
    window.history.pushState({}, "", url.toString());
    router.push(`?${currentParams.toString()}`, { scroll: false });

    // Scroll to the top of the product list
    const productListElement = document.getElementById("scroll__top");
    if (productListElement) {
      productListElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  let pagesArray = [];

  if (total_pages > 0) {
    pagesArray.push(currentPage);

    for (let i = 1; i <= 2; i++) {
      if (currentPage - i > 1) {
        pagesArray.unshift(currentPage - i);
      }
      if (currentPage + i < total_pages) {
        pagesArray.push(currentPage + i);
      }
    }

    if (currentPage - 3 > 1) {
      pagesArray.unshift("...");
    }

    if (currentPage + 3 < total_pages) {
      pagesArray.push("...");
    }

    if (currentPage !== 1) {
      pagesArray.unshift("Previous");
    }

    if (currentPage !== total_pages) {
      pagesArray.push("Next");
    }
  }

  return (
    <>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center text-center">
          <ul className="custom-pagination">
            {pagesArray.map((item, index) => (
              <li
                onClick={() => handlePageClick(item)}
                className={
                  item === currentPage
                    ? "page_active"
                    : item === "..." || item === "Previous" || item === "Next"
                    ? "page_default"
                    : ""
                }
                key={index}
              >
                {item}
              </li>
            ))}
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
