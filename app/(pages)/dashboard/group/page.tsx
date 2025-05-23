"use client";

import { Suspense } from "react";
import GroupPage from "@/app/modules/group/GroupPage";

const Page = () => {
  return (
    <Suspense>
      <GroupPage />
    </Suspense>
  );
};

export default Page;
