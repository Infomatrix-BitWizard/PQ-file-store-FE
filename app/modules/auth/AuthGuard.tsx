"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useRouter, usePathname } from "next/navigation";
import { useMount } from "@/app/hooks/useMount";
import axios from "axios";
import { env } from "@/app/env";
import { signIn } from "@/app/modules/auth/redux/auth.slice";
import { parseToken } from "@/app/modules/auth/helpers/parseToken";

interface IAuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: IAuthGuardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isMount } = useMount();

  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isMount) return;

    getTokenWithStore();
  }, [isMount]);

  useEffect(() => {
    if (!isMount) return;
    if (isLoading) return;

    redirectUser();
  }, [authState, pathname, router, isMount, isLoading]);

  const getTokenWithStore = async () => {
    try {
      const tokenInStore = localStorage.getItem("token");
      if (!tokenInStore) return;

      const tokenPayload = parseToken(tokenInStore);
      if (!tokenPayload) return;

      await axios({
        method: "POST",
        url: `${env.url}/auth/check-token`,
        headers: {
          authorization: tokenInStore,
        },
      });

      if (tokenPayload.data.mfa && !tokenPayload.data.mfaVerify) {
        dispatch(
          signIn({
            token: tokenInStore,
            isAuth: false,
          }),
        );

        router.push("/auth/totp");
      } else {
        dispatch(
          signIn({
            token: tokenInStore,
            isAuth: true,
          }),
        );
      }
    } catch (err) {
      console.info(err);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectUser = () => {
    if (authState.isAuth && pathname.includes("auth")) {
      router.push("/dashboard");
    }

    if (authState.isAuth && pathname === '/') {
      router.push("/dashboard");
    }

    if (!authState.isAuth && !pathname.includes("auth")) {
      router.push("/auth/sign-in");
    }
  };

  if (isLoading) {
    return <>loading</>;
  }

  return <>{children}</>;
};

export default AuthGuard;
