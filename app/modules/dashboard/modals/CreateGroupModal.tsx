"use client";

import React, { useState } from "react";
import { Modal } from "@/app/ui/modal/Modal";
import ModalContainer from "@/app/ui/modalContainer/ModalContainer";
import axios from "axios";
import { env } from "@/app/env";
import { AES } from "@/app/modules/ssl/helpers/aes";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addGroup } from "@/app/modules/groups/redux/groups.slice";

interface ICreateGroupModalProps {
  isOpen: boolean;
  onClose: (data: boolean) => void;
}

const CreateGroupModal = ({ onClose, isOpen }: ICreateGroupModalProps) => {
  const [nameValue, setNameValue] = useState("");
  const dispatch = useDispatch();

  const handlerSubmit = async () => {
    try {
      if (!nameValue) {
        return;
      }

      const res = await axios({
        method: "POST",
        url: `${env.url}/groups`,
        data: {
          name: nameValue,
          aesKey: AES.generateKey(),
        },
      });

      dispatch(addGroup({ id: res.data.data.id, name: res.data.data.name }));

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
        title={"Create group"}
        buttons={
          <>
            <Button onClick={handlerSubmit}>Submit</Button>
          </>
        }
      >
        <input placeholder={"name"} onChange={(e) => setNameValue(e.target.value)} value={nameValue} />
      </ModalContainer>
    </Modal>
  );
};

export default CreateGroupModal;