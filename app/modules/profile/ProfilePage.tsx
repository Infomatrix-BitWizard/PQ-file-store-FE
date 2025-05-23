"use client";

import React, { useState } from "react";
import axios from "axios";
import { env } from "@/app/env";
import { InputText } from "@/app/ui/inputText/InputText";
import { Button } from "@/app/ui/button/Button";

const ProfilePage = () => {
  const [codeValue, setCodeValue] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  const [newNameValue, setNewNameValue] = useState("");

  const handlerSubmitTotpStart = async () => {
    try {
      const res = await axios<IResponseData<IAuthRes>>({
        method: "POST",
        url: `${env.url}/mfa/totp/set-start`,
      });

      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlerSubmitTotpEnd = async () => {
    try {
      const res = await axios<IResponseData<IAuthRes>>({
        method: "POST",
        url: `${env.url}/mfa/totp/set-end`,
        data: {
          code: codeValue,
        },
      });

      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlerSubmitChangePassword = async () => {
    try {
      if (newPassword !== newPasswordRepeat) {
        return;
      }

      const res = await axios<IResponseData<any>>({
        method: "POST",
        url: `${env.url}/users/change-password`,
        data: {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
      });

      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlerSubmitNewName = async () => {
    try {
      const res = await axios<IResponseData<any>>({
        method: "PUT",
        url: `${env.url}/users`,
        data: {
          name: newNameValue,
        },
      });

      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 style={{fontSize: "32px", fontWeight: "bold"}}>Set MFA</h2>

      <div className="flex flex-col gap-4">
        <div>
          <InputText
            value={codeValue}
            onChange={setCodeValue}
            placeholder={"Code"}
          />
        </div>

        <div className="flex flex-row gap-4">
          <Button onClick={handlerSubmitTotpStart}>Start Set totp</Button>
          <Button onClick={handlerSubmitTotpEnd}>End Set totp</Button>
        </div>
      </div>

      <h2 style={{fontSize: "32px", fontWeight: "bold"}}>Change password</h2>

      <div className="flex flex-col gap-4">
        <div>
          <InputText
            placeholder={"Current password"}
            value={currentPassword}
            onChange={setCurrentPassword}
          />
        </div>
        <div>
          <InputText
            placeholder={"New password"}
            value={newPassword}
            onChange={setNewPassword}
          />
        </div>
        <div>
          <InputText
            placeholder={"New password repeat"}
            value={newPasswordRepeat}
            onChange={setNewPasswordRepeat}
          />
        </div>

        <div>
          <Button onClick={handlerSubmitChangePassword}>Update password</Button>
        </div>
      </div>

      <h2 style={{fontSize: "32px", fontWeight: "bold"}}>Change name</h2>

      <div className="flex flex-col gap-4">
        <div>
          <InputText
            placeholder={"New name"}
            value={newNameValue}
            onChange={setNewNameValue}
          />
        </div>

        <div>
          <Button onClick={handlerSubmitNewName}>Update name</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
