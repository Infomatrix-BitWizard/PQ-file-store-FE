"use client";

import { Suspense } from "react";
import FolderPage from "@/app/modules/folder/FolderPage";

const Page = () => {
  return (
    <Suspense>
      <FolderPage />
    </Suspense>
  );
};

export default Page;
