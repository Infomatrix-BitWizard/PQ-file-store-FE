'use client';

import "./temporary.css";
import "./SignInPage.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

import { env } from "@/app/env";
import { signIn } from "@/app/modules/auth/redux/auth.slice";
import { parseToken } from "@/app/modules/auth/helpers/parseToken";
import {Button} from "@/app/ui/button/Button";
import {IResponseData} from '@/app/code/response';

interface FormValues {
  login: string;
  password: string;
}

const SingInPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      login: 'vitalii@gmail.com',
      password: '123456',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await axios<IResponseData<IAuthRes>>({
        method: 'POST',
        url: `${env.url}/auth/sing-in`, // TODO: Fix on server
        data: {
          login: data.login,
          password: data.password,
        },
      });

      const tokenPayload = parseToken(res.data.data.token);
      if (!tokenPayload) return;

      if (tokenPayload.data.mfa && !tokenPayload.data.mfaVerify) {
        dispatch(signIn({ token: res.data.data.token, isAuth: false }));
        router.push('/auth/totp');
      } else {
        dispatch(signIn({ token: res.data.data.token, isAuth: true }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="register-step-outer">
        <div className="register-step-inner">
          <div>
            <h1 className="register-text" style={{ fontSize: '60px' }}>Log in</h1>
            <h1 className="details-required" style={{ fontSize: '24px' }}>Your data is needed for industry regulation purposes.</h1>
          </div>

          <form>
            <div className="form-field-group">
              <label htmlFor="login">Login</label>
              <input
                className={errors.login ? 'invalid' : ''}
                id="login"
                type="text"
                placeholder={"Enter email address"}
                {...register('login', {
                  required: 'Email required'
                })}
              />
              {errors.login && <span className="errors">{errors.login.message}</span>}
            </div>

            <div className="form-field-group">
              <label htmlFor="password">Password</label>
              <input
                className={errors.password ? 'invalid' : ''}
                id="password"
                type="password"
                placeholder={"Enter password"}
                {...register('password', {
                  required: 'Password required',
                })}
              />
              {errors.password && <span className="errors">{errors.password.message}</span>}
            </div>

            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingInPage;
