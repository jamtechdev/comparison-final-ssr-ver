import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BottomBar = React.memo(
  ({
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
    const router = useRouter();
    let routeParts = [];
    const handleRoutes = (routes) => {
      routeParts = routes;
      if (routeParts.length >= 1) {
        router.push(`/comparison/${routeParts[0]?.permaLink}`);
        if (routeParts.length >= 2) {
          router.push(
            `/comparison/${routeParts[0]?.permaLink}-vs-${routeParts[1]?.permaLink}`
          );
        }

        if (routeParts.length >= 3) {
          router.push(
            `/comparison/${routeParts[0]?.permaLink}-vs-${routeParts[1]?.permaLink}-vs-${routeParts[2]?.permaLink}`
          );
        }
      }
    };
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
                        <p>{item.proName}</p>
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
                  {compareGuideData?.length < 3 && (
                    <span>
                      <i
                        className="ri-add-fill"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          handleRoutes(compareGuideData);
                        }}
                      ></i>
                    </span>
                  )}
                  {compareGuideData?.length == 1 && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        router.push(`/${compareGuideData[0]?.permaLink}`);
                      }}
                    >
                      {" "}
                      Compare
                    </button>
                  )}
                  {compareGuideData?.length > 1 && (
                    <button
                      className="btn btn-primary  "
                      onClick={(e) => {
                        handleRoutes(compareGuideData);
                      }}
                    >
                      {" "}
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
);
BottomBar.displayName = "BottomBar";

export default BottomBar;
