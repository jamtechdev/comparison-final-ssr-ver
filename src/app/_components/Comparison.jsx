import React from "react";

import CompareDiv from "@/components/Common/ComparisanComponent/CompareDiv";

function Comparison({ comparisonData, categroyAttributes }) {
  return (
    <>
      <CompareDiv
        comparisonData={comparisonData}
        categroyAttributes={categroyAttributes?.data}
      />
    </>
  );
}

export default Comparison;
