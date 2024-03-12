import React from "react";
import AboutPage from "../_components/AboutPage";
import { aboutUsService } from "@/_services";
import Head from "next/head";

export default async function Page() {
  const aboutData = await aboutUsService.aboutUsAPi();
  return (
    <>
      {" "}
      <Head>
        <title>{aboutData?.title}</title>
        {/* <meta name="description" content={metadata.openGraph.description} /> */}
      </Head>
      <React.Suspense fallback={<p>Loading....</p>}>
        <AboutPage aboutData={aboutData} />
      </React.Suspense>
    </>
  );
}
export const generateMetadata = async (router) => {
  const aboutData = await aboutUsService.aboutUsAPi();
  const title = aboutData?.title;
  const description = aboutData?.meta_description;

  return {
    title,
    description,
    // Add other metadata properties as needed
  };
};
