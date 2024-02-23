"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function OutlineGenerator({ blogData }) {
  const [outline, setOutline] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(null);
  const [activeChildSubChildIndex, setActiveChildSubChildIndex] =
    useState(null);

  useEffect(() => {
    // get all h2,h3,h4,h5,h6 elements
    const shortCodeTextElement = document.getElementById("shortCodeText");
    const headings = shortCodeTextElement.querySelectorAll("h2,h3,h4,h5");
    const newOutline = [];

    let currentMain = null;
    let currentSubMain = null;
    let currentSubSubMain = null;

    headings.forEach((heading) => {
      const id = heading.getAttribute("id");
      const dataId = heading.getAttribute("data-id");

      if (heading.tagName === "H2") {
        currentMain = {
          type: "main",
          text: heading.textContent,
          id,
          children: [],
        };
        newOutline.push(currentMain);
        currentSubMain = null;
        currentSubSubMain = null;
      } else if (heading.tagName === "H3" && currentMain) {
        currentSubMain = {
          type: "sub-main",
          text: heading.textContent,
          id,
          children: [],
        };
        currentMain.children.push(currentSubMain);
        currentSubSubMain = null;
      } else if (heading.tagName === "H4" && currentSubMain) {
        currentSubSubMain = {
          type: "sub-sub-main",
          text: heading.textContent,
          id,
        };
        currentSubMain.children.push(currentSubSubMain);
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

  const handleItemClick = (index, childIndex, childSubChildIndex, id) => {
    setActiveIndex(index);
    setActiveChildIndex(childIndex);
    setActiveChildSubChildIndex(childSubChildIndex);
    handleScrollTo(id);
  };
  console.log(outline);

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
            {section.children && (
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
                      handleItemClick(index, childIndex, "", child.id);
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
                    {child?.children && (
                      <ol>
                        {child?.children &&
                          child?.children?.map((subSubMain, subChildIndex) => {
                            return (
                              <li
                                key={subChildIndex}
                                className={`outlineList ${
                                  activeChildSubChildIndex === subChildIndex &&
                                  activeChildIndex === childIndex
                                    ? "outline-active"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation(); // Stop event propagation here
                                  setActiveChildSubChildIndex(subChildIndex); // Update activeChildIndex here
                                  handleItemClick(
                                    index,
                                    childIndex,
                                    subChildIndex,
                                    child.id
                                  );
                                }}
                              >
                                <Link
                                  href={`#${child?.id}`}
                                  className={`outlineLink ${
                                    activeChildSubChildIndex ===
                                      subChildIndex &&
                                    activeChildIndex === childIndex
                                      ? "outline-active"
                                      : ""
                                  }`}
                                >
                                  {subSubMain.text}
                                </Link>
                              </li>
                            );
                            //  {console.log(subSubMain?.text)}
                          })}
                      </ol>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}

export default OutlineGenerator;
