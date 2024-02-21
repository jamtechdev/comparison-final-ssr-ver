"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function OutlineGenerator({ blogData }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const regex = /<h[1-2][^>]*>.*?<\/h[1-2]>/gi;
  // Extract all <h1> and <h2> headings from the HTML string
  const headings = blogData?.match(regex);
  //   console.log(headings)
  const headingsWithoutTags = headings?.map((heading) =>
    heading.replace(/<\/?h[1-2]>/g, "")
  );

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemClick = (index, id) => {
    setActiveIndex(index);
    handleScrollTo(id);
  };

  useEffect(() => {
    const headings = document.querySelectorAll(".outline-section li a");
    headings.forEach((heading, index) => {
      heading.addEventListener("click", (e) => {
        e.preventDefault();
        const id = heading.getAttribute("href").slice(1);
        handleItemClick(index, id);
      });
    });

    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <>
      {" "}
      <ol>
        {headingsWithoutTags?.map((heading, index) => (
          <li
            key={index}
            className={`outlineList ${
              activeIndex === index ? "outline-active" : ""
            }`}
          >
            <Link
              href={`#${heading.replace(/\s/g, "-").toLowerCase()}`}
              className={`outlineList ${
                activeIndex === index ? "outline-active" : ""
              }`}
            >
              {heading}
            </Link>
          </li>
        ))}
        {/* <li>Technical</li>
        <li>VS Average</li>
        <li className="outline-active">
          Review
          <ol>
            <li>Subtile</li>
            <li>Subtile</li>
          </ol>
        </li>
        <li>Pros/Cons</li> */}
      </ol>{" "}
    </>
  );
}

export default OutlineGenerator;
