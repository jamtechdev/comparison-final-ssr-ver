import React from "react";
import AuthorPage from "@/app/_components/AuthorPage";
import { aboutUsService } from "@/_services";

export default async function Page(props) {
  const { params } = props;
  const authorData = await aboutUsService.getAuthorById(params?.author);
  return (
    <React.Suspense fallback={<p>Loading....</p>}>
      <AuthorPage authorData={authorData} />
    </React.Suspense>
  );
}
