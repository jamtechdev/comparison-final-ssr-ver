export const filterArrayOfObject = (obj, sortRangeAttributeArray) => {
  let uniq = [];
  // console.log(obj.algorithm);
  if (obj.algorithm == "absolute_value") {
    for (let i = 0; i < obj.values.length; i++) {
      if (
        !uniq.includes(obj.values[i].name) &&
        obj.values[i].name != "" &&
        obj.values[i].name != "-" &&
        obj.values[i].name != "?"
      ) {
        uniq.push(obj.values[i].name);
      }
    }
    // if uniq contain yes or no one of them only then add second one automatically
    if (uniq.includes("no") || uniq.includes("yes")) {
      uniq = ["yes"];
    }
    // else if (uniq.includes('yes') && !uniq.includes('no')) {
    //   uniq.push('no');
    // }

    if (uniq.length > 0)
      return {
        type: "dropdown",
        values: uniq,
      };
  } else if (
    obj.algorithm == "highest_to_lowest" ||
    obj.algorithm == "lowest_to_highest"
  ) {
    // console.log(obj.values)
    for (let i = 0; i < obj.values.length; i++) {
      if (
        !uniq.includes(obj.values[i].name) &&
        obj.values[i].name != "" &&
        obj.values[i].name != "-"
      ) {
        uniq.push(obj.values[i].name);
      }
    }
    let numberedUniq = uniq
      .map((ele) => Number(ele))
      .filter((element) => !isNaN(element));
    let sortedArray = numberedUniq.sort(function (a, b) {
      return a - b;
    });
    if (sortedArray.length <= 4) {
      if (sortedArray.length > 0)
        return {
          type: "dropdown",
          values: sortedArray,
        };
    } else {
      if (
        !sortRangeAttributeArray.some(
          (item) =>
            item.algo === obj.algorithm && item.rangeAttributes === obj.name
        )
      )
        sortRangeAttributeArray.push({
          algo: obj.algorithm,
          rangeAttributes: obj.name,
        });
      return {
        type: "range",
        values: sortedArray,
        minValue: Math.min(...sortedArray),
        maxValue: Math.max(...sortedArray),
        unit: obj.unit || "",
      };
    }
  }
};

export const removeDecimalAboveNine = (value) => {
  if (value > 9) {
    return Math.floor(value);
  } else {
    return value.toFixed(1);
  }
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const getAttributeHalf = (product, half) => {
  if (!product?.attributes) {
    return null;
  }
  const attributeKeys = Object.keys(product.attributes_new);
  const halfLength = Math.ceil(attributeKeys.length / 2);
  if (half === "first") {
    const firstHalfKeys = attributeKeys.slice(0, halfLength);
    const firstHalfAttributes = {};
    firstHalfKeys.forEach((key) => {
      firstHalfAttributes[key] = product.attributes_new[key];
    });
    return firstHalfAttributes;
  } else if (half === "second") {
    const secondHalfKeys = attributeKeys.slice(halfLength);
    const secondHalfAttributes = {};
    secondHalfKeys.forEach((key) => {
      secondHalfAttributes[key] = product.attributes_new[key];
    });
    return secondHalfAttributes;
  } else {
    throw new Error("Invalid 'half' argument. Use 'first' or 'second'.");
  }
};

export const handleFilterValueChange = (
  filterObj,
  setFilterObj,
  category,
  attribute,
  value,
  e
) => {
  let obj = { ...filterObj };
  if (!obj[category]) {
    obj[category] = {};
  }
  if (!obj[category][attribute]) {
    obj[category][attribute] = [];
  }

  if (e.target.checked) {
    // for handling yes no in filterObj if yes no are radio buttons
    // if (value === "yes" && obj[category][attribute].includes("no")) {
    //   // Remove "no" if it exists
    //   obj[category][attribute] = obj[category][attribute].filter(item => item !== "no");
    // }
    // else if (value === "no" && obj[category][attribute].includes("yes")) {
    //   // Remove "yes" if it exists
    //   obj[category][attribute] = obj[category][attribute].filter(item => item !== "yes");
    // }

    // Push the new value
    obj[category][attribute].push(value);
  } else {
    // Remove value if it is in obj[category][attribute]
    obj[category][attribute] = obj[category][attribute].filter(
      (item) => item !== value
    );

    // Remove the object key if it becomes empty
    if (obj[category][attribute].length === 0) {
      delete obj[category][attribute];
    }
    // Remove obj[category] if no any obj[category][attribute]
    if (Object.keys(obj[category]).length === 0) {
      delete obj[category];
    }
  }
  setFilterObj({ ...obj });
  // console.log(obj);
};

export const isCheckboxChecked = (filterObj, category, attribute, value) => {
  const categoryFilter = filterObj[category];
  if (categoryFilter && categoryFilter[attribute]) {
    return categoryFilter[attribute].includes(value);
  }
  return false;
};

export const filterProducts = (
  filterObject,
  products,
  sortBy = { algo: "", rangeAttributes: "Overall" }
) => {
  // if (Object.entries(filterObject).length == 0) return products;
  const filterdProducts = products.filter((product) => {
    // Iterate over the filter categories
    for (const categoryName in filterObject) {
      // Find the attribute category within the product
      const categoryAttributes = product.attributes.filter(
        (attr) => attr.attribute_category.name == categoryName
      );

      if (categoryAttributes.length > 0) {
        // Iterate over the attributes and their values within the category
        for (const attributeName in filterObject[categoryName]) {
          const attributeValues = filterObject[categoryName][attributeName].map(
            // (value) => String(value)
            (value) => {
              if (typeof value === "object") {
                return value;
              } else return String(value);
            }
          );

          // Find the corresponding attribute within the categoryAttributes
          const attribute = categoryAttributes.find(
            (attr) => attr.attribute == attributeName
          );

          if (attribute) {
            // console.log(attribute.attribute_value)
            // Check if the attribute value matches any of the filter values
            if (typeof attributeValues[0] == "object") {
              if (
                attributeValues[0].min <= attribute.attribute_value &&
                attributeValues[0].max >= attribute.attribute_value
              )
                continue;
              else return false;
            } else if (attributeValues.includes(attribute.attribute_value)) {
              continue;
            } else {
              return false; // At least one attribute did not match, so skip this product
            }
          } else {
            return false; // Attribute not found, skip this product
          }
        }
      } else {
        return false; // Category not found, skip this product
      }
    }

    return true; // All filter conditions matched, include this product
  });

  if (sortBy.algo == "") {
    return [...filterdProducts];
  } else {
    // console.log(sortBy.algo)
    const sortedProducts = [...filterdProducts];
    if (sortBy.algo == "highest_to_lowest") {
      sortedProducts.sort((a, b) => {
        const productAattr = a.attributes.find(
          (attribute) => attribute.attribute === sortBy.rangeAttributes
        );
        const productBattr = b.attributes.find(
          (attribute) => attribute.attribute === sortBy.rangeAttributes
        );

        if (productAattr && productBattr) {
          const valueA = Number(productAattr.attribute_value);
          const valueB = Number(productBattr.attribute_value);

          // Sort in descending order
          return valueB - valueA;
        } else {
          return 0;
        }
      });
    } else if (sortBy.algo == "lowest_to_highest") {
      sortedProducts.sort((a, b) => {
        const productAattr = a.attributes.find(
          (attribute) => attribute.attribute == sortBy.rangeAttributes
        );
        const productBattr = b.attributes.find(
          (attribute) => attribute.attribute == sortBy.rangeAttributes
        );
        // console.log(productAattr)
        if (productAattr && productBattr) {
          const valueA = Number(productAattr.attribute_value);
          const valueB = Number(productBattr.attribute_value);

          // Sort in ascending order
          return valueA - valueB;
        } else {
          return 0;
        }
      });
    } else if (sortBy.algo == "high-low") {
      sortedProducts.sort((a, b) => {
        if (b[sortBy.rangeAttributes] && a[sortBy.rangeAttributes])
          return b[sortBy.rangeAttributes] - a[sortBy.rangeAttributes];
        else return 0;
      });
    } else if (sortBy.algo == "low-high") {
      sortedProducts.sort((a, b) => {
        if (b[sortBy.rangeAttributes] && a[sortBy.rangeAttributes])
          return a[sortBy.rangeAttributes] - b[sortBy.rangeAttributes];
        else return 0;
      });
    }
    return sortedProducts;
  }
};

export const arrangeProducts = (apiGuideData) => {
  let topCounts;
  let priceRangeAndBrandsArray;
  let guides;
  const productListing = [...apiGuideData?.product_listing];
  const products = [...apiGuideData?.products];

  const sortedProducts = [];
  productListing.forEach((productName, index) => {
    const product = products.find((p) => p.name === productName);
    if (product) {
      product.position = index + 1;
      sortedProducts.push(product);
    }
  });
  const newApiGuideData = { ...apiGuideData, products: sortedProducts };
  let priceArray = [];
  products.forEach((product, index) => {
    priceArray.push(product.highest_price);
  });
  //final guide
  guides = newApiGuideData;
  priceRangeAndBrandsArray = {
    priceRange: { min: Math.min(...priceArray), max: Math.max(...priceArray) },
    brands: [...apiGuideData.brands],
  };
  topCounts = { ...newApiGuideData.top_guide_counts };

  return { guides, priceRangeAndBrandsArray, topCounts };
};

export const arrangeCategories = (apiCategoryData, setCategoryAttributes) => {
  const sortedCategoryData = [...apiCategoryData].sort(
    (a, b) => a.position - b.position
  );
  // console.log(sortedCategoryData)
  setCategoryAttributes(sortedCategoryData);
};

export const productsLastFilter = (
  filterObjPriceBrand,
  products,
  isInitialLoad
) => {
  if (!Object.keys(filterObjPriceBrand).length) {
    return products; // No filters, return the original products array
  } else {
    let finalProducts = [...products]; // Copy the original products array

    if (filterObjPriceBrand.price) {
      finalProducts = finalProducts.filter(
        (product) =>
          filterObjPriceBrand.price.min <= product.highest_price &&
          product.highest_price <= filterObjPriceBrand.price.max
      );
    }

    if (filterObjPriceBrand.available) {
      finalProducts = finalProducts.filter(
        (product) => product.price_websites.length > 0
      );
    }

    if (filterObjPriceBrand.brand && filterObjPriceBrand.brand.length > 0) {
      finalProducts = finalProducts.filter((product) =>
        filterObjPriceBrand.brand.includes(product.brand)
      );
    }

    return finalProducts;
  }
};
