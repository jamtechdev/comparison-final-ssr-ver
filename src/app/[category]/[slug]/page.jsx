import PageSwitch from "@/app/_components/PageSwitch";
export default async function Page({ params: { slug } }) {
  const slugType = await getSlugType(slug);
  const pageData = await fetchDataBasedOnPageType(slug, slugType.type);

  return (
    <PageSwitch PageType={slugType.type} slug={slug} pageData={pageData} />
  );
}
export async function generateMetadata({ params: { slug } }) {
  return {
    title: slug,
    generator: "Comparison web",
    applicationName: "Comparison web",
    referrer: "origin-when-cross-origin",
    keywords: ["compare", "product"],
    description: "Blog page powerb by comparision web",
  };
}

async function getSlugType(slug) {
  console.log(slug, "slug");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/check/${slug}`,
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
async function fetchDataBasedOnPageType(slug, pageType) {
  let apiUrls = [];
  switch (pageType) {
    case "Guide":
      apiUrls = [
        `${process.env.NEXT_PUBLIC_API_URL}/guide/${slug}`,
        `${process.env.NEXT_PUBLIC_API_URL}/guide/products/${slug}`,
      ];
      break;
    case "Blog":
      apiUrls = [
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
        // `${process.env.NEXT_PUBLIC_API_URL}/additionalBlogData`,
      ];
      break;
    case "Product":
      apiUrls = [
        `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`,
        // `${process.env.NEXT_PUBLIC_API_URL}/product/${id}/attributes`,,
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
