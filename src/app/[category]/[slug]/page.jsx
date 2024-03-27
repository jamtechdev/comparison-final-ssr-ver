import PageSwitch from "@/app/_components/PageSwitch";
import NotFound from "@/app/not-found";

export default async function Page({
  params: { category, slug },
  searchParams,
}) {
  try {
    const categoryslugType = await getSlugType(category);

    if (categoryslugType.error) {
      return <NotFound />;
    }
    const slugType = await getSlugType(slug);

    // if (slugType.error === "Permalink not found") {
    //   return <NotFound />;
    // }
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
          categorySlug={category}
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
            categorySlug={category}
            slug={slug}
            pageData={pageData}
            searchParams={searchParams}
          />
        );
      }
    }
  } catch (error) {
    return <NotFound />;
    console.error("Error:", error);
  }
  return <NotFound />;
}

async function getSlugMetaData(slug) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meta-data/${slug}`,
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

export async function generateMetadata({ params: { slug, category } }) {
  const capitalizeFirstLetter = (str) =>
    str.replace(/-/g, " ").replace(/\b(\w)/g, (match) => match.toUpperCase());

  const generateComparisonMetaData = (extractedUrls, category) => {
    const siteURL = "https://mondopedia.it";
    // console.log(category);
    const firstTitle = capitalizeFirstLetter(extractedUrls[0]);
    const secondTitle = capitalizeFirstLetter(extractedUrls[1]);
    const thirdTitle =
      extractedUrls.length > 2 ? capitalizeFirstLetter(extractedUrls[2]) : "";

    const title =
      extractedUrls.length > 2
        ? `${firstTitle} vs ${secondTitle} vs ${thirdTitle}`
        : `${firstTitle} vs ${secondTitle}`;
    return {
      title: title || "Comparison web",
      generator: "Comparison web",
      applicationName: "Comparison web",
      referrer: "origin-when-cross-origin",
      keywords: ["compare", "product"],
      lang: "en",
      description: "compare-page",
      openGraph: {
        type: "website",
      },
      alternates: {
        canonical: `${siteURL}/${category}/${extractedUrls}`,
      },
    };
  };

  if (slug.includes("-vs-")) {
    const extractedUrls = slug?.split("-vs-");
    return generateComparisonMetaData(extractedUrls, category);
  } else {
    const slugType = await getSlugType(slug);
    if (slugType.error === "Permalink not found") {
      return "";
    } else {
      const meta_data = await getSlugMetaData(slug);
      const siteURL = "https://mondopedia.it";
      if (meta_data && meta_data.data) {
        return {
          title: meta_data.data.title,
          description: meta_data.data.meta_description,
          generator: "Comparison web",
          applicationName: "Comparison web",
          referrer: "origin-when-cross-origin",
          lang: "en",
          keywords: ["compare", "product"],
          alternates: {
            canonical: `${siteURL}/${category}/${slug}`,
          },
          openGraph: {
            type: "website",
          },
        };
      } else {
        console.error("Invalid meta_data response:", meta_data);
        return "";
      }
      // console.log("test", meta_data?.data?.meta_description);
    }
  }
}
async function getSlugType(slug) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/check/${slug}`,
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

async function fetchDataBasedOnPageType(slug, pageType, searchParams) {
  // console.log("Abhay", JSON.stringify(searchParams));
  let apiUrls = [];
  switch (pageType) {
    case "Guide":
      let productApiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }/guide/products/${slug}?query=${JSON.stringify(searchParams)}`;
      // console.log(productApiUrl);

      if (searchParams?.page) {
        productApiUrl += `&page=${searchParams.page}`;
      }

      apiUrls = [
        `${process.env.NEXT_PUBLIC_API_URL}/guide/${slug}`,
        productApiUrl,
      ];

      break;
    case "Blog":
      apiUrls = [`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`];
      break;
    case "Product":
      apiUrls = [`${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`];
      break;
    case "Comparison":
      const permalinks = slug.split("-vs-");
      apiUrls = permalinks.map(
        (permalink) => `${process.env.NEXT_PUBLIC_API_URL}/product/${permalink}`
      );
      break;
    default:
      return null;
  }

  const responses = await Promise.all(
    apiUrls.map(async (apiUrl) => {
      const response = await fetch(apiUrl, {
        next: { revalidate: 10 },
        cache: "no-cache",
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
