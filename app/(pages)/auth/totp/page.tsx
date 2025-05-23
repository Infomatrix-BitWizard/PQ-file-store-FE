"use client";

import React from "react";
import TotpAuthPage from "@/app/modules/totp/TotpAuthPage";
import Toolbar from "@/app/components/Toolbar/Toolbar";

const Page = () => {
  return (
    <>
      <Toolbar/>
      <TotpAuthPage />
    </>
  );
};

export default Page;
