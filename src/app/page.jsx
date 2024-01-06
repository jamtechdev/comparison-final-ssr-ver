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
