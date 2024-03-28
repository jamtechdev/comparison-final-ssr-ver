import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import "../../public/font/font.css";
import Layout from "@/components/Layout";
import { getterService } from "@/_services";
import Head from "next/head";

export default async function RootLayout({ children }) {
  const footerData = await getterService.getFooterData();
  const headerData = await getterService.getTopNavBarData();
  // Function to construct the canonical URL dynamically
  // console.log(footerData);
  return (
    <html lang="en">
      <link
        rel="icon"
        href={`https://panel.mondopedia.it/logos/app_favicon.ico`}
        sizes="any"
      />
      {/* <head dangerouslySetInnerHTML={{ __html: footerData?.head_tag_code }}></head> */}
      <body>
        <Layout footerData={footerData} headerData={headerData}>
          {children}
          {/* <div
            dangerouslySetInnerHTML={{ __html: footerData?.body_tag_code }}
          ></div>
          <div
            dangerouslySetInnerHTML={{ __html: footerData?.footer_tag_code }}
          ></div> */}
        </Layout>
      </body>
    </html>
  );
}
