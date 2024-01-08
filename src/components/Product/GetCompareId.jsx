"use client"
import React  from "react";

export const GetCompareId = ({ finalProducts }) => {
  const [getDataByCompareId, setCompareId] = useState(null);

  const fetchData = async () => {
    const compareByCatID = await productService?.getCompareProductByCatID(
      finalProducts[0]?.category_id
    );
    setCompareId(compareByCatID);
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    getDataByCompareId &&
    getDataByCompareId?.data && (
      <section>
        <Container>
          <Row className="table-section-mobile">
            <Col md={12}>
              <h2 className="site-main-heading pt-5">
                Comparing Samsung New VR Headset Oculus 2.0 with best robot
                vacuum cleaners
              </h2>
            </Col>
            <Col md={12}>
              <ProductCompareTable
                products={getDataByCompareId.data?.data}
                categoryAttributes={categoryAttribute?.data?.data}
              />
            </Col>
          </Row>
        </Container>
      </section>
    )
  );
};
