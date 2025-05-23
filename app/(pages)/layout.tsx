"use client";

import { useSslInit } from "@/app/modules/ssl/useSslInit";
import AuthGuard from "@/app/modules/auth/AuthGuard";
import Footer from "@/app/components/Footer/Footer";

export default function Layout({ children }: ILayout) {
  const { isChecked } = useSslInit();

  if (!isChecked) {
    return <>Loading...</>;
  }

  return (
    <AuthGuard>
      <div className="flex flex-col grow">{children}</div>

      <Footer></Footer>

      <div id="modal-root" />
    </AuthGuard>
  );
}
