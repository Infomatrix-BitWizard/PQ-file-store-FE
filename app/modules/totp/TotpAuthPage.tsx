"use client";

import "./temporary.css";
import "./SignInPage.css";
import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { env } from "@/app/env";
import { signIn } from "@/app/modules/auth/redux/auth.slice";
import { Button } from "@/app/ui/button/Button";
import { useForm } from "react-hook-form";

const TotpAuthPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{totp: string}>({
    defaultValues: {
      totp: ""
    },
  });

  const onSubmit = async (data: { totp: string }) => {
    try {
      const res = await axios<IResponseData<IAuthRes>>({
        method: "POST",
        url: `${env.url}/mfa/totp/get-token`,
        data: {
          code: data.totp,
        },
      });

      dispatch(
        signIn({
          token: res.data.data.token,
          isAuth: true,
        }),
      );
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
              <label htmlFor="login">TOTP</label>
              <input
                className={errors.totp ? 'invalid' : ''}
                id="totp"
                type="text"
                placeholder={"Enter the code"}
                {...register('totp', {
                  required: 'Field required'
                })}
              />
              {errors.totp && <span className="errors">{errors.totp.message}</span>}
            </div>

            <Button className={"primary"} onClick={handleSubmit(onSubmit)}>Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TotpAuthPage;
