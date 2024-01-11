import PageSwitch from "@/app/_components/PageSwitch";
import NotFound from "@/app/not-found";
export default async function Page({ params: { category, slug }, searchParams }) {
  try {
 const categoryslugType = await getSlugType(category);
    if (categoryslugType.error) {
      return <NotFound />
    }    
    const slugType = await getSlugType(slug);
    // Bypass for comparison page
    if (slugType.error && slug.includes("-vs-")) {
      const pageData = await fetchDataBasedOnPageType(
        slug,
        "Comparison",
        searchParams
      );
      return (
        <PageSwitch
          PageType="Comparison"
          slug={slug}
          pageData={pageData}
          searchParams={{}}
        />
      );
    }

    if (slugType.type) {
      const pageData = await fetchDataBasedOnPageType(
        slug,
        slugType.type,
        searchParams
      );

      if (pageData) {
        return (
          <PageSwitch
            PageType={slugType.type}
            slug={slug}
            pageData={pageData}
            searchParams={searchParams}
          />
        );
      }
    }
  } catch (error) {
    return <NotFound />;
    //console.error("Error:", error);
  }
  return <NotFound />;
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/check/${slug}`,
    {
      next: { revalidate: 600 },
      cache:"no-cache",
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
async function fetchDataBasedOnPageType(slug, pageType, searchParams) {
  let apiUrls = [];
  switch (pageType) {
    case "Guide":
      let productApiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }/guide/products/${slug}?query=${JSON.stringify(searchParams)}`;
      if (searchParams?.page) {
        productApiUrl += `&page=${searchParams.page}`;
      }
      apiUrls = [
        `${process.env.NEXT_PUBLIC_API_URL}/guide/${slug}`,
        productApiUrl,
      ];
      break;
    case "Blog":
      apiUrls = [
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
      ];
      break;
    case "Product":
      apiUrls = [
        `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`,
      ];
      break;
    case "Comparison":
      const permalinks = slug.split("-vs-");
      apiUrls = permalinks.map(
        (permalink) => `${process.env.NEXT_PUBLIC_API_URL}/product/${permalink}`
      );

      apiUrls.push(
        `${process.env.NEXT_PUBLIC_API_URL}/product/average?permalink1=${permalinks[0]}&permalink2=${permalinks[1]}`
      );

      break;
    default:
      return null;
  }

  const responses = await Promise.all(
    apiUrls.map(async (apiUrl) => {
      const response = await fetch(apiUrl, {
        next: { revalidate: 600 },
        cache:"no-cache",
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
