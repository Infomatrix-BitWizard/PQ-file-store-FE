"use client";

import React, { useState } from "react";
import { Modal } from "@/app/ui/modal/Modal";
import ModalContainer from "@/app/ui/modalContainer/ModalContainer";
import { useSearchParams } from "next/navigation";
import { Button } from "@/app/ui/button/Button";
import { InputText } from "@/app/ui/inputText/InputText";
import axios from "axios";
import { env } from "@/app/env";

interface IGroupUserModalProps {
  isOpen: boolean;
  onClose: (closed: boolean) => void;
  uploaded?: (data: any) => void;
}

const GroupUserModal = ({ isOpen, onClose, uploaded }: IGroupUserModalProps) => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [listOpened, setListOpened] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const paramsGroupID = searchParams.get("groupID");

  const handlerSubmit = async () => {
    try {
      if (!emailValue || !paramsGroupID) {
        return;
      }

      const res = await axios({
        method: "POST",
        url: `${env.url}/groups/share`,
        data: {
          groupID: paramsGroupID,
          shareUserEmail: emailValue,
          role: "viewer"
        },
      });

      // dispatch(addGroup({ id: res.data.data.id, name: res.data.data.name }));

      setEmailValue("");
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContainer>
        <div style={{width: "540px", margin: "20px", display: "flex", flexDirection: "column", gap: "30px"}}>
          <div style={{fontSize: "22px", fontWeight: "bold", fontFamily: "Inter", opacity: "0.7"}}>Share the group</div>

          <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
            <InputText appearance="clear" value={emailValue} placeholder="example@email.com" label="User email" onChange={setEmailValue} />
            <div style={{display: "flex", gap: "8px"}} onClick={() => setListOpened(!listOpened)}>
              <img width="17" height="15" src={"/add-icn.png"} alt=""/>
              <div style={{fontSize: "15px", fontWeight: "500", fontFamily: "Inter"}}>select a group member</div>
            </div>
          </div>

          {listOpened && <div>
            <div style={{fontSize: "24px", fontWeight: "bold", fontFamily: "Inter"}}>Recent users</div>
            <div className="grid grid-cols-[2fr_3fr_1fr_auto] items-center gap-4 w-full text-sm font-semibold border-b py-2">
              <div>Shawn Stone</div>
              <div className="font-normal underline">memberemail@gmail.com</div>
              <div>Owner</div>
              <div className="flex justify-end pr-1">
                <img src="/feather-icons/trash-2.svg" width="13" height="13" alt="Delete" />
              </div>
            </div>
            <div className="grid grid-cols-[2fr_3fr_1fr_auto] items-center gap-4 w-full text-sm font-semibold border-b py-2">
              <div>Shawn Stone</div>
              <div className="font-normal underline">longlongmemberemail@gmail.com</div>
              <div>Owner</div>
              <div className="flex justify-end pr-1">
                <img src="/feather-icons/trash-2.svg" width="13" height="13" alt="Delete" />
              </div>
            </div>
          </div>}

          <div style={{display: "flex", flexDirection: "row", justifyContent: "end"}}>
            <Button style={{flexBasis: "120px"}} onClick={handlerSubmit}>Share</Button>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default GroupUserModal;
