import PageSwitch from "@/app/_components/PageSwitch";
import NotFound from "../not-found";
export default async function Page({ params: { category } }) {
  const slugType = await getSlugType(category);
  if (slugType.type) {
    const pageData = await fetchDataBasedOnPageType(category, slugType.type);
    console.log(slugType, "slug check by sir___________" ,category);
    if (pageData != null) {
      return (
        <PageSwitch
          PageType={slugType.type}
          slug={category}
          pageData={pageData}
        />
      );
    } else {
      return <NotFound />;
    }
  } else {
    return <NotFound />;
  }
}
async function getSlugType(category) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/check/${category}`,
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
export async function generateMetadata() {
  return {
    title: "Category Page",
    generator: "Comparison web",
    applicationName: "Comparison web",
    referrer: "origin-when-cross-origin",
    keywords: ["compare", "product"],
    description: "Category page powerb by comparision web",
  };
}
async function fetchDataBasedOnPageType(slug, pageType) {
  console.log(pageType, "_____sir check")
  let apiUrls = [];
  switch (pageType) {
    
    case "PrimaryArchiveCategory":
      apiUrls = [
        `${process.env.NEXT_PUBLIC_API_URL}/guide/archive-page/${slug}`,
      ];
      break;
    case "ProductCategory":
      apiUrls = [
        `${process.env.NEXT_PUBLIC_API_URL}/category/archive-page/${slug}`,
      ];
      break;
    default:
      return null;
  }

  const responses = await Promise.all(
    apiUrls.map(async (apiUrl) => {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      });
      if (!response.ok) {
      }
      return response.json();
    })
  );
  return responses;
}
