import React from "react";

import CompareDiv from "@/components/Common/ComparisanComponent/CompareDiv";

function Comparison({
  slug,
  categorySlug,
  comparisonData,
  categroyAttributes,
  graphComparisonProsCons,
  getComparisonPhase
}) {
  return (
    <>
   
      <CompareDiv
        slug={slug}
        categorySlug={categorySlug}
        comparisonData={comparisonData}
        categroyAttributes={categroyAttributes?.data}
        graphComparisonProsCons={graphComparisonProsCons?.data}
        getComparisonPhase={getComparisonPhase}
      />
      
    </>
  );
}

export default Comparison;
