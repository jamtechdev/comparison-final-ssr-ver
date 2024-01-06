import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "react-loading-skeleton/dist/skeleton.css";
import ProductSkeleton from "./ProductSkeleton";
import Product from "./Product/Product";
import GuidePagination from "../../Common/Pagination/GuidePagination";

const ProductListing = React.memo(
  ({
    isInitialLoad,
    products,
    isLoading,
    setIsLoading,
    isCollapsed,
    setIsCollapsed,
    handleToggleCollapse,
    manageCollapsedDiv,
    setManageCollapsedDiv,
    handleManageCollapsedDiv,
    compareGuideData,
    setCompareGuideData,
    handleComparedProduct,
    guideComparePro,
  }) => {
    const [visibleProducts, setVisibleProducts] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 25;
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(25);
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, [products, setIsLoading]);
    console.log(isInitialLoad,"isInitialLoad")
    const generateProductsWithAttributes = () => {
      const productsWithAttributeGroup = {};
      products.forEach((product) => {
        const productCopy = { ...product };
        const productAttributes = {};
        product.attributes.forEach((attribute) => {
          const categoryName = attribute.attribute_category.name;
          if (!productAttributes[categoryName]) {
            productAttributes[categoryName] = [];
          }
          productAttributes[categoryName].push(attribute);
        });
        productCopy.attributes = productAttributes;
        productsWithAttributeGroup[product.name] = productCopy;
      });
      return Object.values(productsWithAttributeGroup);
    };

    const finalProducts = generateProductsWithAttributes();
    const totalPages = Math.ceil(finalProducts.length / productsPerPage);

    const loadMore = () => {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setEnd((end) => end + productsPerPage);
    };

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      setStart((pageNumber - 1) * productsPerPage);
      setEnd((pageNumber - 1) * productsPerPage + productsPerPage);
      window.scrollTo(0, 0);
    };

    const currentProducts = isInitialLoad ? products : finalProducts.slice(start, end);

    return (
      <div className="best-product-wrapper">
        {isLoading ? (
          Array.from({ length: 5 }, (_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          <>
            {currentProducts.map((product, index) => (
              <Product
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                productsPerPage={productsPerPage}
                product={product}
                key={index}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                handleToggleCollapse={handleToggleCollapse}
                manageCollapsedDiv={manageCollapsedDiv}
                setManageCollapsedDiv={setManageCollapsedDiv}
                handleManageCollapsedDiv={handleManageCollapsedDiv}
                handleComparedProduct={handleComparedProduct}
                compareGuideData={compareGuideData}
                setCompareGuideData={setCompareGuideData}
                guideComparePro={guideComparePro}
              />
            ))}
            {totalPages > 1 && (
              <section className="paginationSec pb-5">
                <Container>
                  <GuidePagination
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    setPageData={currentProducts}
                    loadMore={loadMore}
                    paginate={paginate}
                  />
                </Container>
              </section>
            )}
          </>
        )}

        <div className="text-center d-none">
          <Button className="see_all_btn_filled">
            Load More Products <i className="ri-arrow-down-s-line"></i>
          </Button>
        </div>
      </div>
    );
  }
);

ProductListing.displayName = "ProductListing";
export default ProductListing;
