import GuidePage from "./GuidePage";
import BlogPage from "./BlogPage";
import ProductPage from "./ProductPage";
import CategoryArchive from "./CategoryArchive";
import ProductCategoryArchiv from "./ProductCategoryArchiv";
export default function PageSwitch({ PageType, slug, pageData }) {
  let PageToRender;
  console.log(PageType, "pageType");
  switch (PageType) {
    case "Guide":
      const guide = pageData[0].data;
      const attributes = getCategoryAttributes(guide?.category_id, slug);
      PageToRender = (
        <GuidePage
          slug={slug}
          guideData={pageData}
          filters={attributes?.data}
          attributesForTable={attributes?.attribute_categories}
        />
      );
      break;
    case "Blog":
      PageToRender = <BlogPage slug={slug} blogData={pageData} />;
      break;
    case "Product":
      PageToRender = <ProductPage slug={slug} productData={pageData} />;
      break;
    case "PrimaryAchiveCategory":
      PageToRender = <CategoryArchive slug={slug} ArchiveData={pageData} />;
      break;
    case "ProductCategory":
      PageToRender = (
        <ProductCategoryArchiv slug={slug} productArchiveData={pageData} />
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
