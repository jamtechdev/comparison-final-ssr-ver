import React from "react";
import MainPage from "./_components/MainPage";
import { homePage } from "@/_services";
export default async function Page() {
  const bannerCounts = await homePage.getMainPageBannerCounts();
  const favGuideSlider = await homePage.getFavouriteGuides();
  return (
    <React.Suspense fallback={<p>Loading....</p>}>
      <MainPage bannerCounts={bannerCounts} favSlider={favGuideSlider} />
    </React.Suspense>
  );
}
export async function generateMetadata(params) {
  return {
    title:  "Comparision web",
    generator: "Comparison web",
    applicationName: "Comparison web",
    referrer: "origin-when-cross-origin",
    keywords: ["compare", "product"],
    description:  "Comparision web",
  };
}