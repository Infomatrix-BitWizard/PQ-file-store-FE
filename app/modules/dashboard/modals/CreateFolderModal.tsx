"use client";

import React, { useState } from "react";
import { Modal } from "@/app/ui/modal/Modal";
import ModalContainer from "@/app/ui/modalContainer/ModalContainer";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { IFolder } from "@/app/modules/folders/folders.api";
import { env } from "@/app/env";

interface ICreateFolderModalProps {
  isOpen: boolean;
  onClose: (data: boolean) => void;
  created?: (data: any) => void
}

const CreateFolderModal = ({ onClose, isOpen, created }: ICreateFolderModalProps) => {
  const [nameValue, setNameValue] = useState("");

  const searchParams = useSearchParams();
  const paramsGroupID = searchParams.get("groupID");

  const handlerSubmit = async () => {
    try {
      if (!nameValue) {
        return;
      }

      const res = await axios<IResponseData<IFolder>>({
        method: "POST",
        url: `${env.url}/folders`,
        data: {
          name: nameValue,
          groupID: paramsGroupID ? paramsGroupID : undefined
        },
      });

      created && created({ id: res.data.data.id, name: res.data.data.name })

      onClose(false);
      setNameValue("");
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer
        title={"Create folder"}
        buttons={
          <>
            <Button onClick={handlerSubmit}>Submit</Button>
          </>
        }
      >
        <input
          placeholder={"name"}
          onChange={e => setNameValue(e.target.value)}
          value={nameValue}
        />
      </ModalContainer>
    </Modal>
  );
};

export default CreateFolderModal;
