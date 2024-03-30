import { getAttributeProductHalf } from "@/_helpers";
import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

function ProductPageOutline({ product, currentIndexId }) {
  const [outline, setOutline] = useState([]);
  const [activeParentIndex, setActiveParentIndex] = useState(null);
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

  return (
    <>
      {product &&
        getAttributeProductHalf(product, "first") &&
        Object.keys(getAttributeProductHalf(product, "first")).map(
          (attribute, index) => {
            return (
              <>
                {/* {console.log(
                            product?.attributes[attribute][0]
                          )} */}
                <div>
                  <ol className="ol-child">
                    <li
                      className={`outlineList ${
                        activeParentIndex === attribute ? "outline-active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveParentIndex(attribute, index);
                        debouncedScrollHandler.current(attribute);
                      }}
                    >
                      <a href={`#${attribute.trim().replace(/\s+/g, "-")}`}>
                        {attribute}
                      </a>
                      {product.attributes[attribute].map(
                        (attributeValues, valueIndex) => (
                          <React.Fragment>
                            {attributeValues?.text_part === "" ||
                            attributeValues?.text_part === null ? (
                              ""
                            ) : (
                              <ol key={valueIndex} className="ol-child">
                                <li className="outlineList">
                                  <a
                                    href={`#${attributeValues.attribute
                                      .trim()
                                      .replace(/\s+/g, "-")}`}
                                  >
                                    {attributeValues.attribute}
                                  </a>
                                </li>
                              </ol>
                            )}
                          </React.Fragment>
                        )
                      )}
                    </li>
                  </ol>
                </div>
              </>
            );
          }
        )}
      {product &&
        getAttributeProductHalf(product, "second") &&
        Object.keys(getAttributeProductHalf(product, "second")).map(
          (attribute, index) => {
            return (
              <>
                {/* {console.log(
                            product?.attributes[attribute][0]
                          )} */}
                <div>
                  <ol className="ol-child">
                    <li
                      className={`outlineList ${
                        activeParentIndex === attribute ? "outline-active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveParentIndex(attribute, index);
                        debouncedScrollHandler.current(attribute);
                      }}
                    >
                      <a href={`#${attribute.trim().replace(/\s+/g, "-")}`}>
                        {attribute}
                      </a>

                      {product.attributes[attribute].map(
                        (attributeValues, valueIndex) => (
                          <React.Fragment>
                            {attributeValues?.text_part === "" ||
                            attributeValues?.text_part === null ? (
                              ""
                            ) : (
                              <ol key={valueIndex} className="ol-child">
                                <li className="outlineList">
                                  <a
                                    href={`#${attributeValues.attribute
                                      .trim()
                                      .replace(/\s+/g, "-")}`}
                                  >
                                    {attributeValues.attribute}
                                  </a>
                                </li>
                              </ol>
                            )}
                          </React.Fragment>
                        )
                      )}
                    </li>
                  </ol>
                </div>
              </>
            );
          }
        )}
    </>
  );
}

export default ProductPageOutline;
