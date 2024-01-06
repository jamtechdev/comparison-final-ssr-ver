import React from "react";
import AboutPage from "../_components/AboutPage";
import { aboutUsService } from "@/_services";

export default async function Page() {
  const aboutData = await aboutUsService.aboutUsAPi();
  return (
    <React.Suspense fallback={<p>Loading....</p>}>
      <AboutPage aboutData={aboutData} />
    </React.Suspense>
  );
}
