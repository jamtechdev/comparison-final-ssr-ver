import GuidePage from "./GuidePage";
import BlogPage from "./BlogPage";
import ProductPage from "./ProductPage";
import CategoryArchive from "./CategoryArchive";
import ProductCategoryArchivePage from "./ProductCategoryArchivePage";
export default async function PageSwitch({
  PageType,
  slug,
  pageData,
  searchParams,
}) {
  let PageToRender;

  switch (PageType) {
    case "Guide":
      const guide = pageData[0]?.data;
      const attributes = await getCategoryAttributes(guide?.category_id, slug);
      PageToRender = (
        <GuidePage
          slug={slug}
          guideData={pageData}
          filters={attributes?.data}
          attributesForTable={attributes?.attribute_categories}
          searchParams={searchParams}
        />
      );
      break;
    case "Blog":
      PageToRender = <BlogPage slug={slug} blogData={pageData} />;
      break;
    case "Product":
      const product = pageData[0]?.data;
      const productCatAttribute = await getProductCategroyAttributes(
        product?.category_id
      );
      const getProductCompare = await getCompareProductByCatID(
        product?.category_id
      );
      PageToRender = (
        <ProductPage
          slug={slug}
          productData={pageData}
          productCatAttribute={productCatAttribute?.attribute_categories}
          compareByCatID={getProductCompare}
        />
      );
      break;
    case "PrimaryArchiveCategory":
      PageToRender = <CategoryArchive slug={slug} ArchiveData={pageData} />;
      break;
    case "ProductCategory":
      PageToRender = (
        <ProductCategoryArchivePage slug={slug} categoryData={pageData} />
      );
      break;
    default:
      PageToRender = () => <div>No Page Found</div>;
      break;
  }

  return PageToRender;
}

async function getCategoryAttributes(category_id, slug) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/guide/${category_id}/${slug}/attributes`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
  }
  return response.json();
}

async function getProductCategroyAttributes(category_id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${category_id}/attributes`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
  }
  return response.json();
}

async function getCompareProductByCatID(category_id) {
  // ${process.env.NEXT_PUBLIC_API_URL}/product/compare-product/${id}`
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/compare-product/${category_id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
  }
  return response.json();
}
