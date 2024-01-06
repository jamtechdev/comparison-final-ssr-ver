import BlogPage from "./BlogPage";
import GuidePage from "./GuidePage";
import { arrangeProducts } from "@/_helpers";
import ProductPage from "./ProductPage";
export default function PageSwitch({ PageType, slug, pageData }) {
  let PageToRender;
  switch (PageType) {
    case "Guide":
      PageToRender = <GuidePage slug={slug} guideData={pageData} />;
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
