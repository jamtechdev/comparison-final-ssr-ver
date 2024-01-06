import { Pagination, Col, Row, Button } from "react-bootstrap";

const GuidePagination = ({
  totalPages,
  setCurrentPage,
  currentPage,
  loadMore,
  paginate,
}) => {
  //   const handlePageClick = (pageNumber) => {
  //     paginate(pageNumber);
  //   };
  //   const handleLoadMoreClick = () => {
  //     setLoadMore(true);
  //     setCurrentPage(currentPage + 1);
  //   };

  const pagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <Row>
        <Col md={12} className="text-center">
          <Button className="view-blog load-more" onClick={loadMore}>
            Load more <i className="ri-arrow-right-s-line"></i>
          </Button>
        </Col>

        <Col className="d-flex justify-content-center text-center">
          <ul className="custom-pagination">
            {pagesArray.map((item, index) => {
              return (
                <li
                  onClick={() => paginate(item)}
                  className={item == currentPage ? "page_active" : ""}
                  key={index}
                >
                  {item}
                </li>
              );
            })}
            {currentPage === totalPages ? null : (
              <li
                className="page_next"
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </li>
            )}
            <li className="page_last" onClick={() => paginate(totalPages)}>
              Last
            </li>
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default GuidePagination;
