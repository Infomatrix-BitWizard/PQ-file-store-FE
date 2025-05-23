"use client";

import "./Toolbar.css";
import React from "react";
import { Badge } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Toolbar() {
  const pathname = usePathname();

  function isSignInActive() {
    return pathname === "/auth/sign-in" || pathname === "/auth/totp";
  }

  return (
    <header>
      {(() => {
        console.log(pathname);
        return <div></div>
      })()}
      <div className="toolbar">
        <div className={'company'}>
          <Badge badgeContent={'Beta'} color="primary">
            <img src={"/logo.png"} width={70} height={47} alt={''} />
          </Badge>
          <span className={'company-name'}>Quantum Information Science</span>
        </div>

        <nav className="menu">
          <Link href="/"
                className={`menu-item ${pathname === "/" ? "selected" : ""}`}
          >Home</Link>

          <Link href="/about"
            className={`menu-item ${pathname === "/about" ? "selected" : ""}`}
          >About Us</Link>

          {pathname === "/auth/sign-up" && <Link href="/auth/sign-in"
            className={`menu-item ${isSignInActive() ? "selected" : ""}`}
          >Sign In</Link>}

          {pathname !== "/auth/sign-up" && <Link href="/auth/sign-up"
                className={`menu-item ${pathname === "/auth/sign-up" ? "selected" : ""}`}
          >Sign Up</Link>}

          {/*<Link href="/auth/totp"*/}
          {/*      className={`menu-item ${pathname === "/" ? "selected" : ""}`}*/}
          {/*>Totp</Link>*/}
        </nav>
      </div>
    </header>
  );
}
