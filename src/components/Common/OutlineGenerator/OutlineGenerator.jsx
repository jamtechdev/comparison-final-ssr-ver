"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import debounce from "lodash.debounce";

function OutlineGenerator({ blogData, currentIndexId }) {
  const [outline, setOutline] = useState([]);
  const [activeParentIndex, setActiveParentIndex] = useState(null);
  const debouncedScrollHandler = useRef(null);

  // useEffect(() => {
  //   // Define a debounced version of the scroll event handler
  //   debouncedScrollHandler.current = debounce((id) => {
  //     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  //   }, 200); // Adjust the debounce delay as needed

  //   return () => {
  //     // Cleanup the debounced function on unmount
  //     debouncedScrollHandler.current.cancel();
  //   };
  // }, []);

  useEffect(() => {
    if (currentIndexId) {
      setActiveParentIndex(currentIndexId);
    }
  }, [currentIndexId]);

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
  // console.log(outline);

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
              {/* {console.log(section.text)} */}
              <span
                className={`outlineLink ${
                  activeParentIndex === section?.id ? "outline-active" : ""
                }`}
              >
                {`${mainNumber}. ${section.text}`}
              </span>
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
                          // debouncedScrollHandler.current(child?.id);
                        }}
                      >
                        <span
                          className={`outlineLink ${
                            activeParentIndex === child?.id
                              ? "outline-active"
                              : ""
                          }`}
                        >
                          {`${subMainNumber}. ${child.text}`}
                        </span>
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
                                      activeParentIndex === subSubMain?.id
                                        ? "outline-active"
                                        : ""
                                    }`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setActiveParentIndex(subSubMain?.id);
                                      // debouncedScrollHandler.current(
                                      //   subSubMain?.id
                                      // );
                                    }}
                                  >
                                    <span
                                      className={`outlineLink ${
                                        activeParentIndex === subSubMain?.id
                                          ? "outline-active"
                                          : ""
                                      }`}
                                    >
                                      {`${subSubMainNumber}. ${subSubMain.text}`}
                                    </span>
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
