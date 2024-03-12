import React from "react";

function SinglePage({ singlePageData }) {
//   console.log(singlePageData);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: singlePageData?.description }}
    ></div>
  );
}

export default SinglePage;
