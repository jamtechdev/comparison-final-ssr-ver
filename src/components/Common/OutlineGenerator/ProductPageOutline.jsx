import { getAttributeProductHalf } from "@/_helpers";
import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

function ProductPageOutline({ product, currentIndexId }) {
  const [outline, setOutline] = useState([]);
  const [activeParentIndex, setActiveParentIndex] = useState("Battery");
  const debouncedScrollHandler = useRef(null);

  useEffect(() => {
    // Define a debounced version of the scroll event handler
    debouncedScrollHandler.current = debounce((id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Adjust the debounce delay as needed

    return () => {
      // Cleanup the debounced function on unmount
      debouncedScrollHandler.current.cancel();
    };
  }, []);
  useEffect(() => {
    const headings = document
      ?.getElementById("attribute__card")
      ?.querySelectorAll("h3, h4");
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
      } else if (heading.tagName === "H5" && currentSubMain) {
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
    if (currentIndexId) {
      setActiveParentIndex(currentIndexId);
    }
  }, [currentIndexId]);

  const scrollToSection = (sectionId) => (e) => {
    // console.log(sectionId, "sectionId");
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  console.log(activeParentIndex);

  return (
    <>
      <ol>
        {product &&
          getAttributeProductHalf(product, "first") &&
          Object.keys(getAttributeProductHalf(product, "first")).map(
            (attribute, index) => {
              const mainNumber = index + 1;
              return (
                <>
                  {/* {console.log(
                            product?.attributes[attribute][0]
                          )} */}

                  <li
                    className={`outlineList ${
                      activeParentIndex === attribute ? "outline-active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setActiveParentIndex(attribute, index);
                      // debouncedScrollHandler.current(attribute);
                    }}
                  >
                    <a
                      className={`outlineLink ${
                        activeParentIndex === attribute ? "outline-active" : ""
                      }`}
                      href=""
                      onClick={scrollToSection(
                        attribute.trim().replace(/\s+/g, "-")
                      )}
                    >
                      {" "}
                      {`${mainNumber}. ${attribute}`}
                    </a>

                    {product.attributes[attribute].map(
                      (attributeValues, valueIndex) => {
                        const subMainNumber = `${mainNumber}.${valueIndex + 1}`;
                        return (
                          <React.Fragment>
                            {attributeValues?.text_part === "" ||
                            attributeValues?.text_part === null ? (
                              ""
                            ) : (
                              <ol key={valueIndex} className="ol-child">
                                <li
                                  className={`outlineList ${
                                    activeParentIndex ===
                                    attributeValues.attribute
                                      ? "outline-active"
                                      : ""
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setActiveParentIndex(
                                      attributeValues.attribute
                                    );
                                  }}
                                >
                                  <a
                                    href="#"
                                    onClick={scrollToSection(
                                      attributeValues.attribute
                                        .trim()
                                        .replace(/\s+/g, "-")
                                    )}
                                  >
                                    {" "}
                                    {`${subMainNumber}. ${attributeValues.attribute}`}
                                  </a>
                                </li>
                              </ol>
                            )}
                          </React.Fragment>
                        );
                      }
                    )}
                  </li>
                </>
              );
            }
          )}
        {product &&
          getAttributeProductHalf(product, "second") &&
          Object.keys(getAttributeProductHalf(product, "second")).map(
            (attribute, index) => {
              const mainNumber = index + 4;
              return (
                <>
                  <li
                    className={`outlineList ${
                      activeParentIndex === attribute ? "outline-active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setActiveParentIndex(attribute, index);
                      // debouncedScrollHandler.current(attribute);
                    }}
                  >
                    <a
                      href=""
                      onClick={scrollToSection(
                        attribute.trim().replace(/\s+/g, "-")
                      )}
                    >
                      {" "}
                      {`${mainNumber}. ${attribute}`}
                    </a>

                    {product.attributes[attribute].map(
                      (attributeValues, valueIndex) => {
                        const subMainNumber = `${mainNumber}.${valueIndex + 1}`;
                        return (
                          <React.Fragment>
                            {attributeValues?.text_part === "" ||
                            attributeValues?.text_part === null ? (
                              ""
                            ) : (
                              <ol key={valueIndex} className="ol-child">
                                <li
                                  className="outlineList"
                                  onClick={scrollToSection(
                                    attributeValues.attribute
                                      .trim()
                                      .replace(/\s+/g, "-")
                                  )}
                                >
                                  {`${subMainNumber}. ${attributeValues.attribute}`}
                                </li>
                              </ol>
                            )}
                          </React.Fragment>
                        );
                      }
                    )}
                  </li>
                </>
              );
            }
          )}
      </ol>
    </>
  );
}

export default ProductPageOutline;
