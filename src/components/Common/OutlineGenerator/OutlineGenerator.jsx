"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function OutlineGenerator({ blogData }) {
  const [outline, setOutline] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(null);

  useEffect(() => {
    const container = document.getElementById("shortCodeText");
    const headings = container.querySelectorAll("h2, h3, h4");

    const newOutline = [];
    let mainIndex = -1;
    let subIndex = -1;

    headings.forEach((heading) => {
      const id = heading.getAttribute("id");
      const dataId = heading.getAttribute("data-id");

      if (heading.tagName === "H2") {
        newOutline.push({
          type: "main",
          text: heading.textContent,
          id,
          children: [],
        });
        mainIndex++;
        subIndex = -1;
      } else if (heading.tagName === "H3" && mainIndex >= 0) {
        newOutline[mainIndex].children.push({
          type: "sub-main",
          text: heading.textContent,
          id,
          children: [],
        });
        subIndex++;
      } else if (heading.tagName === "H4" && mainIndex >= 0 && subIndex >= 0) {
        newOutline[mainIndex].children[subIndex].children.push({
          type: "sub-sub-main",
          text: heading.textContent,
          id,
        });
      }
    });

    setOutline(newOutline);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemClick = (index, childIndex, id) => {
    setActiveIndex(index);
    setActiveChildIndex(childIndex);
    handleScrollTo(id);
  };
  return (
    <>
      <ol>
        {outline.map((section, index) => (
          <li
            key={index}
            className={`outlineList ${
              activeIndex === index ? "outline-active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Stop event propagation here
              setActiveIndex(index); // Update activeIndex here
              handleItemClick(index, section.id);
            }}
          >
            <Link
              href={`#${section?.id}`}
              className={`outlineLink ${
                activeIndex === index ? "outline-active" : ""
              }`}
            >
              {section.text}
            </Link>
            <ol>
              {section.children.map((child, childIndex) => (
                <li
                  key={childIndex}
                  className={`outlineList ${
                    activeChildIndex === childIndex && activeIndex === index
                      ? "outline-active"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Stop event propagation here
                    setActiveChildIndex(childIndex); // Update activeChildIndex here
                    handleItemClick(index, childIndex, child.id);
                  }}
                >
                  <Link
                    href={`#${child?.id}`}
                    className={`outlineLink ${
                      activeChildIndex === childIndex && activeIndex === index
                        ? "outline-active"
                        : ""
                    }`}
                  >
                    {child.text}
                  </Link>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}

export default OutlineGenerator;
