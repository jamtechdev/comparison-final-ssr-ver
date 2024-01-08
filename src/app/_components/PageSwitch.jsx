import GuidePage from './GuidePage';
import BlogPage from "./BlogPage";
import ProductPage from "./ProductPage";
export default async function PageSwitch({ PageType, slug, pageData,searchParams }) {
  let PageToRender;
  switch (PageType) {
    case 'Guide':
      const guide = pageData[0].data;
      const attributes = await getCategoryAttributes(guide?.category_id, slug)
      PageToRender = <GuidePage slug={slug} guideData={pageData} filters={attributes?.data
      } attributesForTable={attributes?.attribute_categories} searchParams={searchParams}/>;
      break;
    case "Blog":
      PageToRender = <BlogPage slug={slug} blogData={pageData} />;
      break;
    case "Product":
      PageToRender = <ProductPage slug={slug} productData={pageData} />;

    default:
      PageToRender = () => <div>No Page Found</div>;
      break;
  }

  return PageToRender;
}

async function getCategoryAttributes(category_id, slug) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guide/${category_id}/${slug}/attributes`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    }
  });
  if (!response.ok) {
  }
  return response.json()
}