import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import "../../public/font/font.css";
import Layout from "@/components/Layout";
import { getterService } from "@/_services";

export default async function RootLayout({ children }) {
  const footerData = await getterService.getFooterData();
  const headerData = await getterService.getTopNavBarData();
  // Function to construct the canonical URL dynamically

  return (
    <html lang="en">
      <link
        rel="icon"
        href={`https://panel.mondopedia.it/logos/app_favicon.ico`}
        sizes="any"
      />

      <body>
        <Layout footerData={footerData} headerData={headerData}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
