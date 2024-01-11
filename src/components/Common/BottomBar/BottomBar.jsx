import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function BottomBar({
  isCollapsed,
  handleToggleCollapse,
  manageCollapsedDiv,
  handleManageCollapsedDiv,
}) {
  const compareGuideData = useSelector((state) => state.comparePro.guideCompareProduct);
  const router = useRouter();
  const handelComparison = () => {
    const categoryInURL = compareGuideData[0]?.category_url
        const sortedPermalinksArray = [...compareGuideData].sort((a, b) => a.permalink.localeCompare(b.permalink));
        const permalinks = sortedPermalinksArray.map(item => item.permalink);
        const permalinkSlug = permalinks.join('-vs-');
        router.push(`/${categoryInURL}/${permalinkSlug}`, undefined, { scroll: false });
}
  return (
    <>
      {manageCollapsedDiv && (
        <section className="bottom_bar">
          <div
            className="bottom_bar_head"
            //  onClick={handleToggleCollapse}
            onClick={(e) => {
              handleToggleCollapse(e);
              handleManageCollapsedDiv(e);
            }}
          >
            <div className="bottom_bar_header_content">
              <Image src="/images/vs.svg" width={40} height={40} alt="" />
              <div className="bottom_bar_heading">
                <div>Comparison</div>
                <span>{compareGuideData?.length}</span>
              </div>
              <i className="ri-arrow-up-s-line"></i>
            </div>
          </div>
          {!isCollapsed && (
            <div className="bottom_bar_body">
              <ul className="bottom_bar_compare_list">
                {compareGuideData?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Image
                        src={item.image ? item.image : "/images/vs.svg"}
                        width={0}
                        height={0}
                        alt=""
                      />
                      <p>{item.name}</p>
                      <i className="ri-close-fill"></i>
                    </li>
                  );
                })}
              </ul>
              <div className="bottom_bar_compare_list_footer">
                {compareGuideData?.length == 3 && (
                  <span>
                    <i
                      className="ri-add-fill "
                      style={{ cursor: "not-allowed" }}
                    ></i>
                  </span>
                )}
              {compareGuideData?.length > 1 && (
                  <button
                    className="btn btn-primary"
                    onClick={handelComparison}
                  >
                    Compare
                  </button>
                )}
     
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
