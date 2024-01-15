import {
  removeCompareProductForGuide,
  resetGuideCompareProduct,
} from "@/redux/features/compareProduct/compareProSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
export default function BottomBar({
  isCollapsed,
  handleToggleCollapse,
  manageCollapsedDiv,
  handleManageCollapsedDiv,
}) {
  const compareGuideData = useSelector(
    (state) => state.comparePro.guideCompareProduct
  );
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const dispatch = useDispatch();
  // this function will remove item from compare list
  const removeItem = (id) => {
    dispatch(removeCompareProductForGuide(id));
  };

  const handelComparison = () => {
    setIsLoading(true)
    const categoryInURL = compareGuideData[0]?.category_url;
    const sortedPermalinksArray = [...compareGuideData].sort((a, b) =>
      a.permalink.localeCompare(b.permalink)
    );
    const permalinks = sortedPermalinksArray.map((item) => item.permalink);
    const permalinkSlug = permalinks.join("-vs-");
    dispatch(resetGuideCompareProduct());
    router.push(`/${categoryInURL}/${permalinkSlug}`, undefined, {
      scroll: false,
    });
  };
  return (
    <>
      {compareGuideData?.length > 0 && (
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
              {isCollapsed ? (
                <i className="ri-arrow-down-s-line"></i>
              ) : (
                <i className="ri-arrow-up-s-line"></i>
              )}
            </div>
          </div>
          <div
            className={
              isCollapsed === true
                ? "bottom_bar_body bottom_bar_body_collapse"
                : "bottom_bar_body"
            }
          >
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
                    <i
                      className="ri-close-fill"
                      onClick={() => removeItem(item.id)}
                    ></i>
                  </li>
                );
              })}
            </ul>
            <div className="bottom_bar_compare_list_footer">
              {compareGuideData?.length > 1 && compareGuideData?.length < 3 && (
                <span>
                  <i
                    className="ri-add-fill"
                    style={{
                      cursor:
                        compareGuideData?.length < 3
                          ? "pointer"
                          : "not-allowed",
                    }}
                  ></i>
                </span>
              )}

              {compareGuideData?.length > 1 && (
                <button disabled={isLoading} className="btn btn-primary" onClick={handelComparison}>
                  {isLoading && <>
                    <RotatingLines
                      visible={true}
                      height="20"
                      width="20"
                      strokeColor="#fff"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </>}
                  Compare
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
