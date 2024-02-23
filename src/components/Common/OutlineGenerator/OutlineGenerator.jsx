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
    const shortCodeTextElement = document?.getElementById("shortCodeText");
    const headings = shortCodeTextElement?.querySelectorAll("h2,h3,h4,h5");
    const newOutline = [];

    let currentMain = null;
    let currentSubMain = null;
    let currentSubSubMain = null;

    headings?.forEach((heading) => {
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
    document.getElementById("shortCodeText").scrollTo(0, 0);
  };
  // console.log(outline);

  return (
    <>
      <ol>
        {outline.map((section, index) => {
          const mainNumber = index + 1;
          return (
            <li
              key={index}
              className={`outlineList ${
                activeIndex === index ? "outline-active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveIndex(index);
                setActiveChildIndex(null); // Reset activeChildIndex
                setActiveChildSubChildIndex(null); // Reset activeChildSubChildIndex
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
                <ol className="ol-child">
                  {section.children.map((child, childIndex) => {
                    const subMainNumber = `${mainNumber}.${childIndex + 1}`;
                    return (
                      <li
                        key={childIndex}
                        className={`outlineList ${
                          activeChildIndex === childIndex &&
                          activeIndex === index
                            ? "outline-active"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveChildIndex(childIndex);
                          setActiveChildSubChildIndex(null); // Reset activeChildSubChildIndex
                          handleItemClick(index, childIndex, "", child.id);
                        }}
                      >
                        <Link
                          href={`#${child?.id}`}
                          className={`outlineLink ${
                            activeChildIndex === childIndex &&
                            activeIndex === index
                              ? "outline-active"
                              : ""
                          }`}
                        >
                          {child.text}
                        </Link>
                        {child?.children && (
                          <ol className="ol-sub-child">
                            {child?.children.map(
                              (subSubMain, subChildIndex) => {
                                const subSubMainNumber = `${subMainNumber}.${
                                  subChildIndex + 1
                                }`;
                                return (
                                  <li
                                    key={subChildIndex}
                                    className={`outlineList ${
                                      activeChildSubChildIndex ===
                                        subChildIndex &&
                                      activeChildIndex === childIndex
                                        ? "outline-active"
                                        : ""
                                    }`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setActiveChildSubChildIndex(
                                        subChildIndex
                                      );
                                      handleItemClick(
                                        index,
                                        childIndex,
                                        subChildIndex,
                                        child.id
                                      );
                                    }}
                                  >
                                    <Link
                                      href={`#${subSubMain?.id}`}
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
                              }
                            )}
                          </ol>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}

export default OutlineGenerator;
