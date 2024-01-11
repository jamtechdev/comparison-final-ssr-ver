import React from "react";

import CompareDiv from "@/components/Common/ComparisanComponent/CompareDiv";

function Comparison({
  comparisonData,
  categroyAttributes,
  graphComparisonProsCons,
}) {
  return (
    <>
      

      <CompareDiv
        comparisonData={comparisonData}
        categroyAttributes={categroyAttributes?.data}
        graphComparisonProsCons={graphComparisonProsCons?.data}
      />
    </>
  );
}

export default Comparison;
