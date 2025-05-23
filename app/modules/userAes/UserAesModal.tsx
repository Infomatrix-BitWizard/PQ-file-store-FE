"use client";

import React, { useEffect, useRef, useState } from "react";
import "./user-aes-modal.css";
import { Modal } from "@/app/ui/modal/Modal";
import ModalContainer from "@/app/ui/modalContainer/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useMount } from "@/app/hooks/useMount";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { setUserAesKey } from "@/app/modules/auth/redux/auth.slice";
import { AES } from "@/app/modules/ssl/helpers/aes";
import axios from "axios";
import { env } from "@/app/env";
import { initUserData, updateUserData } from "@/app/modules/user/redux/user.slice";
import { Button } from "@/app/ui/button/Button";

const UserAesModal = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(true);

  const userAesKey = useSelector((state: RootState) => state.auth.userAesKey);
  const userStore = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { isMount } = useMount();

  useEffect(() => {
    if (userAesKey) {
      setIsOpen(false);
    } else {
      getUserData();
    }
  }, [isMount]);

  const getUserData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${env.url}/users`,
      });

      dispatch(initUserData({
        id: res.data.data.id,
        name: res.data.data.name,
        generatedAesKey: res.data.data.generated_aes_key,
      }));
    } catch (err) {
      console.info(err);
    }
  };

  const handlerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;
      if (e.target.files.length === 0) return;

      const readFileAsText = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (event) => {
            if (typeof event.target?.result === "string") {
              resolve(event.target.result);
            } else {
              reject("File content is not a string");
            }
          };

          reader.onerror = () => {
            reject(reader.error);
          };

          reader.readAsText(file);
        });
      };

      const fileData = await readFileAsText(e.target.files[0]);

      if (ref.current) {
        ref.current.value = "";
      }

      dispatch(setUserAesKey(fileData));
      setIsOpen(false);
    } catch (err) {
      console.info(err);
    }
  };

  const generateAESKey = async () => {
    try {
      const key = AES.generateKey(); // Припустимо, що це повертає рядок

      const blob = new Blob([key], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "aes-key.txt";
      a.click();

      URL.revokeObjectURL(url);

      await axios({
        method: "PUT",
        url: `${env.url}/users`,
        data: {
          generatedAesKey: true,
        },
      });

      dispatch(updateUserData(true))
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
      }}
    >
      <ModalContainer title={"Input AES Key"}>
        {
          userStore.generatedAesKey && (
            <Button componentType="label">
              <CloudUploadIcon />
              <div>Upload files</div>
              <input
                ref={ref}
                type="file"
                onChange={handlerChange}
                style={{
                  display: "none",
                }}
              />
            </Button>
          )
        }

        {
          !userStore.generatedAesKey && (
            <Button onClick={generateAESKey}>
              <CloudUploadIcon />
              Download AES Key
            </Button>
          )
        }
      </ModalContainer>
    </Modal>
  );
};

export default UserAesModal;
