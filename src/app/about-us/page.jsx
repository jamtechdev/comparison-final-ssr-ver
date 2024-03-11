import React from "react";
import AboutPage from "../_components/AboutPage";
import { aboutUsService } from "@/_services";
import Head from "next/head";

export const metadata = {
  title: "About us",
  openGraph: {
    title: "Acme",
    description: "Acme is a...",
  },
};
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
