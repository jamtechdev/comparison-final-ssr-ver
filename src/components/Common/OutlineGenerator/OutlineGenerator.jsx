"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

function OutlineGenerator({ blogData }) {
  const [outline, setOutline] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeParentIndex, setActiveParentIndex] = useState(null);
  const [activeChildIndex, setActiveChildIndex] = useState(null);
  const [activeChildSubChildIndex, setActiveChildSubChildIndex] =
    useState(null);

  useEffect(() => {
    const headings = document
      ?.getElementById("shortCodeText")
      ?.querySelectorAll("h2, h3, h4, h5");
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

  const handleScrollTo = (id, index) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveParentIndex(index);
    }
  };

  const handleItemClick = (index, childIndex, childSubChildIndex, id) => {
    setActiveIndex(index);
    setActiveChildIndex(childIndex);
    setActiveChildSubChildIndex(childSubChildIndex);
    handleScrollTo(id, index);
    document.getElementById("shortCodeText").scrollTo(0, 0);
  };

  return (
    <>
      <ol>
        {outline.map((section, index) => {
          const mainNumber = index + 1;
          return (
            <li
              key={index}
              id={`parent${index}`}
              className={`outlineList ${
                activeParentIndex === section?.id ? "outline-active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveParentIndex(section?.id);
              }}
            >
              <Link
                href={`#${section?.id}`}
                className={`outlineLink ${
                  activeParentIndex === section?.id ? "outline-active" : ""
                }`}
              >
                {`${mainNumber}. ${section.text}`}
              </Link>
              {section.children && (
                <ol className="ol-child">
                  {section.children.map((child, childIndex) => {
                    const subMainNumber = `${mainNumber}.${childIndex + 1}`;
                    return (
                      <li
                        key={childIndex}
                        id={`${index}child${childIndex}`}
                        className={`outlineList ${
                          activeParentIndex === child?.id
                            ? "outline-active"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveParentIndex(child?.id);
                        }}
                      >
                        <Link
                          href={`#${child?.id}`}
                          className={`outlineLink ${
                            activeParentIndex === child?.id
                              ? "outline-active"
                              : ""
                          }`}
                        >
                          {`${subMainNumber}. ${child.text}`}
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
                                    id={`${index}subChild${subChildIndex}`}
                                    className={`outlineList ${
                                      activeParentIndex ===subSubMain?.id
                                        ? "outline-active"
                                        : ""
                                    }`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setActiveParentIndex(
                                        subSubMain?.id
                                      );
                                    }}
                                  >
                                    <Link
                                      href={`#${subSubMain?.id}`}
                                      className={`outlineLink ${
                                        activeParentIndex === subSubMain?.id
                                          ? "outline-active"
                                          : ""
                                      }`}
                                    >
                                      {`${subSubMainNumber}. ${subSubMain.text}`}
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
