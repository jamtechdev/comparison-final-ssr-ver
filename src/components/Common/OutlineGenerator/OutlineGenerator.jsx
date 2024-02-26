"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

function OutlineGenerator({ blogData }) {
  const [outline, setOutline] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeParentIndex, setActiveParentIndex] = useState(null);
  const [activeChildIndex, setActiveChildIndex] = useState(null);
  const [activeChildSubChildIndex, setActiveChildSubChildIndex] = useState(null);

  const itemRefs = useRef([]);

  useEffect(() => {
    const headings = document?.getElementById("shortCodeText")?.querySelectorAll("h2, h3, h4, h5");
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex((ref) => ref === entry.target);
            setActiveIndex(index);
            setActiveParentIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((ref) => observer.observe(ref));

    return () => {
      itemRefs.current.forEach((ref) => observer.unobserve(ref));
    };
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
              ref={(ref) => (itemRefs.current[index] = ref)}
              id={`parent${index}`}
              className={`outlineList ${
                activeParentIndex === `parent${index}` ? "outline-active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveIndex(index);
                setActiveParentIndex(`parent${index}`);
                handleItemClick(index, section.id);
              }}
            >
              <Link
                href={`#${section?.id}`}
                className={`outlineLink ${
                  activeParentIndex === `parent${index}` ? "outline-active" : ""
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
                          activeParentIndex === `${index}child${childIndex}` ? "outline-active" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveParentIndex(`${index}child${childIndex}`);
                        }}
                      >
                        <Link
                          href={`#${child?.id}`}
                          className={`outlineLink ${
                            activeParentIndex === `${index}child${childIndex}` ? "outline-active" : ""
                          }`}
                        >
                          {`${subMainNumber}. ${child.text}`}
                        </Link>
                        {child?.children && (
                          <ol className="ol-sub-child">
                            {child?.children.map((subSubMain, subChildIndex) => {
                              const subSubMainNumber = `${subMainNumber}.${subChildIndex + 1}`;
                              return (
                                <li
                                  key={subChildIndex}
                                  id={`${index}child${childIndex}subChild${subChildIndex}`}
                                  className={`outlineList ${
                                    activeParentIndex === `${index}child${childIndex}subChild${subChildIndex}` ? "outline-active" : ""
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setActiveParentIndex(`${index}child${childIndex}subChild${subChildIndex}`);
                                  }}
                                >
                                  <Link
                                    href={`#${subSubMain?.id}`}
                                    className={`outlineLink ${
                                      activeParentIndex === `${index}child${childIndex}subChild${subChildIndex}` ? "outline-active" : ""
                                    }`}
                                  >
                                    {`${subSubMainNumber}. ${subSubMain.text}`}
                                  </Link>
                                </li>
                              );
                            })}
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
