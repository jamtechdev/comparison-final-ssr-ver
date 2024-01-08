import BlogPage from "./BlogPage";
import GuidePage from "./GuidePage";
import { arrangeProducts } from "@/_helpers";
import ProductPage from "./ProductPage";
import CategoryArchive from "./CategoryArchive";
import ProductCategoryArchiv from "./ProductCategoryArchiv";
export default function PageSwitch({ PageType, slug, pageData }) {
  let PageToRender;
  console.log(PageType, "pageType");
  switch (PageType) {
    case "Guide":
      PageToRender = <GuidePage slug={slug} guideData={pageData} />;
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
