import GuidePage from "./GuidePage";
import BlogPage from "./BlogPage";
import ProductPage from "./ProductPage";
import CategoryArchive from "./CategoryArchive";
import ProductCategoryArchivePage from "./ProductCategoryArchivePage";
import Comparison from "./Comparison";
import SinglePage from "./SinglePage";
import AboutPage from "./AboutPage";
import ProductPageSSR from "./ProductPageSSR";
export default async function PageSwitch({
  PageType,
  slug,
  categorySlug,
  pageData,
  searchParams,
}) {
  let PageToRender;
  // (PageType,slug);
  // decode html string
  function searchCharts(text) {
    const regex = /\[(.*?)\]/g;
    let matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[0]);
    }
    return matches;
  }
  function replaceTextPart(matchShortCode, third_text) {
    for (let i = 0; i < matchShortCode?.length; i++) {
      third_text = third_text?.replace(matchShortCode[i], `hello navneet`);
    }

    return third_text;
  }

  switch (PageType) {
    case "Guide":
      const guide = pageData[0]?.data;

      // (pageData[0],"neetx")
      // (pageData[1]?.data,"neets");
      const attributes = await getCategoryAttributes(guide?.category_id, slug);
      const productTable = await getProductForTable(guide?.category_url, slug);
      const third_text = pageData[0]?.data?.text_third_part_main;
      const matchShortCode = searchCharts(third_text);
      // (replaceTextPart(matchShortCode, third_text));

      // (replacedTexts, "hello");

      // (categorySlug)
      PageToRender = (
        <GuidePage
          slug={slug}
          categorySlug={categorySlug}
          guideData={pageData}
          filters={attributes?.data}
          attributesForTable={attributes?.data?.attribute_categories}
          productForTable={productTable?.data}
          searchParams={searchParams}
          matchShortCode={matchShortCode}
        />
      );
      break;
    case "Blog":
      PageToRender = (
        <BlogPage slug={slug} categorySlug={categorySlug} blogData={pageData} />
      );
      break;
    case "Product":
      const product = pageData[0]?.data;
      const productCatAttribute = await getProductCategroyAttributes(
        product?.category_id
      );

      // (productCatAttribute , "productCatAttribute");
      const getProductCompare = await getCompareProductByCatID(
        product?.category_id,
        slug
      );

      const getProConsForAccordion = await getProsConsForAccidion(
        categorySlug,
        slug
      );
      productCatAttribute;
      PageToRender = (
        <ProductPageSSR
          slug={slug}
          categorySlug={categorySlug}
          productData={pageData}
          productCatAttributes={productCatAttribute}
          compareByCatID={getProductCompare}
          prosConsAccordion={getProConsForAccordion?.data}
        />
      );
      break;
    case "PrimaryArchiveCategory":
      PageToRender = <CategoryArchive slug={slug} ArchiveData={pageData} />;
      break;
    case "ProductCategory":
      // (pageData);
      PageToRender = (
        <ProductCategoryArchivePage slug={slug} categoryData={pageData} />
      );
      break;
    case "Compare":
      const compareData = pageData[0]?.data;
      pageData[0], "compareData";
      pageData[1], "xxx";

      // (compareData?.category_url)

      const graphComparisonProsCons = await getGraphComparisonProsCons(
        pageData,
        categorySlug
      );

      const compareDataCatAttribute = await getProductCategroyAttributes(
        compareData?.category_id
      );
      const getComparisonPhase = await getComparePhaseData(categorySlug, slug);
      // console.log(getComparisonPhase?.data?.page_phases)
      PageToRender = (
        <Comparison
          slug={slug}
          categorySlug={categorySlug}
          comparisonData={pageData}
          categroyAttributes={compareDataCatAttribute}
          graphComparisonProsCons={graphComparisonProsCons}
          getComparisonPhase={getComparisonPhase?.data}
        />
      );
      break;
    case "SinglePage":
      PageToRender = (
        <SinglePage
          slug={slug}
          categorySlug={categorySlug}
          singlePageData={pageData[0]?.data}
        />
      );

      break;
    case "AboutUs":
      PageToRender = (
        <AboutPage
          slug={slug}
          categorySlug={categorySlug}
          aboutData={pageData[0]?.data}
        />
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
      next: { revalidate: 10 },
      cache: "no-cache",
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

async function getComparePhaseData(category_id, slug) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/compare/products?slug=${slug}`,
    {
      next: { revalidate: 10 },
      cache: "no-cache",
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
async function getProductForTable(category_url, slug) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/guide/products-table/${category_url}/${slug}`,
    {
      next: { revalidate: 10 },
      cache: "no-cache",
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
  // (category_id);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${category_id}/attributes`,
    {
      next: { revalidate: 10 },
      cache: "no-cache",
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

async function getCompareProductByCatID(category_id, slug) {
  // (slug,category_id);
  // ${process.env.NEXT_PUBLIC_API_URL}/product/compare-product/${id}`
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/compare-product/${category_id}?product=${slug}`,
    {
      next: { revalidate: 10 },
      cache: "no-cache",
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

async function getGraphComparisonProsCons(data, categorySlug) {
  if (data.length === 2) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/average/${categorySlug}?permalink1=${data[0]?.data?.permalink}&permalink2=${data[1]?.data?.permalink}`,
      {
        next: { revalidate: 10 },
        cache: "no-cache",
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
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/average/${categorySlug}?permalink1=${data[0]?.data?.permalink}&permalink2=${data[1]?.data?.permalink}&permalink3=${data[2]?.data?.permalink}`,
      {
        next: { revalidate: 10 },
        cache: "no-cache",
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
}

async function getProsConsForAccidion(categorySlug, slug) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/generate-chart/${categorySlug}?permalink2=${slug}&permalink1=average`,
    {
      next: { revalidate: 10 },
      cache: "no-cache",
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
