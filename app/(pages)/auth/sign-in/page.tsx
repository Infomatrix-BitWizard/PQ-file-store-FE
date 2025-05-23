"use client";

import SingInPage from "@/app/modules/auth/SingInPage";
import Toolbar from "@/app/components/Toolbar/Toolbar";

export default function Home() {
  return (
    <>
      <Toolbar></Toolbar>
      <SingInPage />
    </>
  );
}
