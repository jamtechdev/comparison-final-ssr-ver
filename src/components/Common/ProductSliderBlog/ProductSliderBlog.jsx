"use client";
import { useState } from "react";
export default function ProductSliderBlog({ favSlider }) {
  const [showFullData, setShowFullData] = useState(false);
  console.log(favSlider);

  const toggleShowFullData = () => {
    setShowFullData(!showFullData);
  };

  return (
    <section className="product-slider single-blog">
      {favSlider &&
        favSlider
          ?.slice(0, showFullData ? favSlider?.length : 2)
          .map(function (item, index) {
            return (
              <div className="product-card mb-3" key={index}>
                <img
                  src={
                    item.bannerImage === null
                      ? item?.bannerImage
                      : `/images/nofound.png`
                  }
                  width={0}
                  height={0}
                  sizes="100%"
                  alt=""
                />
                <span>
                  {" "}
                  <a
                    href={`/${item?.category_url}/${item?.permalink}`}
                    style={{ color: "#27304e" }}
                  >
                    {item?.short_name || item?.guide_name}
                  </a>
                </span>
              </div>
            );
          })}
    </section>
  );
}
