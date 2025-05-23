"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { env } from "@/app/env";
import axios from "axios";
import { InputText } from "@/app/ui/inputText/InputText";
import { Button } from "@/app/ui/button/Button";
import { useRouter } from "next/navigation";
import { IResponseData } from "@/app/models/response";

const SignUpPage = () => {
  const [nameValue, setNameValue] = useState("Vlad");
  const [loginValue, setLoginValue] = useState("Vlad@email.com");
  const [passwordValue, setPasswordValue] = useState("P@ssword1");

  const router = useRouter();
  const dispatch = useDispatch();

  const handlerClick = async () => {
    try {
      const res = await axios<IResponseData<any>>({
        method: "POST",
        // TODO: fix (rename) on server
        url: `${env.url}/auth/sing-up`,
        data: {
          name: nameValue,
          login: loginValue,
          password: passwordValue,
        },
      });

      console.log(res.data);

      // axios.defaults.headers.common['Authorization'] = res.data.data.token;

      // dispatch(signIn({ isAuth: true, token: res.data.data.token }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>sing up</h1>
      <div>
        <Button onClick={() => router.push("/auth/sign-in")}>Go to sing in</Button>
      </div>

      <div>
        <InputText
          label={'Name'}
          value={nameValue}
          onChange={setNameValue}
        />
      </div>

      <div>
        <InputText
          label={'Login'}
          value={loginValue}
          onChange={setLoginValue}
        />
      </div>
      <div>
        <InputText
          label={'Password'}
          value={passwordValue}
          onChange={setPasswordValue}
        />
      </div>

      <div>
        <Button onClick={handlerClick}>Submit</Button>
      </div>
    </div>
  );
};

export default SignUpPage;
