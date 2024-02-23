"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function OutlineGenerator({ blogData }) {
  const [outline, setOutline] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(null);

  useEffect(() => {
    // get all h1,h2,h3,h4,span elements
    const headings = document.querySelectorAll("h1, h2,h3,h4,h5,h6,span");
    const newOutline = [];

    headings.forEach((heading) => {
      // Get the id attribute of the heading
      const id = heading.getAttribute("id");
      // Get the data-id attribute of the heading
      const dataId = heading.getAttribute("data-id");
      // If the heading has both id and data-id attributes and they match
      if (id && dataId && id === dataId) {
        // Push a new main section to the outline with the heading text and id
        newOutline.push({
          type: "main",
          text: heading.textContent,
          id,
          children: [], // Initialize an empty array for children
        });
      } else if (dataId && newOutline.length > 0) {
        // If the heading has a data-id attribute and the outline is not empty
        const lastMain = newOutline[newOutline.length - 1];
        if (lastMain.id === dataId) {
          // Push a new sub-main section to the last main section's children
          lastMain.children.push({
            type: "sub-main",
            text: heading.textContent,
            id,
          });
        }
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

  // console.log(outline);

  const handleItemClick = (index, childIndex, id) => {
    // console.log(childIndex);
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
                    activeChildIndex === childIndex ? "outline-active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Stop event propagation here
                    setActiveChildIndex(childIndex); // Update activeChildIndex here
                    handleItemClick(index,childIndex, child.id);
                  }}
                >
                  <Link
                    href={`#${child?.id}`}
                    className={`outlineLink ${
                      activeChildIndex === childIndex ? "outline-active" : ""
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
