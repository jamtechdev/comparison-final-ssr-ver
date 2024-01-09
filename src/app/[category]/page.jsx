import PageSwitch from "@/app/_components/PageSwitch";

// export default async function Page({ params: { category } }) {
//   return <h1>{category}</h1>;
// }
export default async function Page({ params: { category } }) {
  const slugType = await getSlugType(category);
  const pageData = await fetchDataBasedOnPageType(category, slugType.type);

  return (
    <PageSwitch PageType={slugType.type} slug={category} pageData={pageData} />
  );
}
async function getSlugType(category) {
  console.log(category, "category");
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
    description: "Category page powered by comparision web",
  };
}
async function fetchDataBasedOnPageType(slug, pageType) {
  let apiUrls = [];
  switch (pageType) {
    case "PrimaryAchiveCategory":
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
