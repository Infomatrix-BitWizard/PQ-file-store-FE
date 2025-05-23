"use client";

import React, { useEffect, useState } from "react";
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
}

const GroupUserModal = ({ isOpen, onClose }: IGroupUserModalProps) => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [listOpened, setListOpened] = useState<boolean>(false);
  const [group, setGroup] = useState<any>();

  const searchParams = useSearchParams();
  // const paramsGroupID = searchParams.get("groupID");

  useEffect(() => {
    if (isOpen && paramsGroupID) {
      getGroupInfo(paramsGroupID);
    }
  }, [isOpen, paramsGroupID]);

  const getGroupInfo = async (id: string) => {
    try {
      const resp = await axios<IResponseData<any>>({
        method: "GET",
        url: `${env.url}/groups/id?groupID=${id}`
      });
      setGroup(resp.data.data);
      console.log(resp.data.data.users);
    } catch (err) {
      console.error(err);
    }
  }

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

      getGroupInfo(paramsGroupID);

      setEmailValue("");
    } catch (err) {
      console.info(err);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      if (!id) {
        return;
      }

      await axios({
        method: "DELETE",
        url: `${env.url}/groups/share`,
        data: {
          groupID: paramsGroupID,
          shareUserID: id
        },
      });

      setGroup({
        ...group,
        users: group.users.filter((u: any) => u.id !== id)
      });

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContainer>
        <div style={{width: "540px", margin: "20px", display: "flex", flexDirection: "column", gap: "30px"}}>
          <div style={{fontSize: "22px", fontWeight: "bold", fontFamily: "Inter", opacity: "0.7"}}>Share the group</div>

          <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
            <InputText appearance="clear" value={emailValue} placeholder="example@email.com" label="User email" onChange={setEmailValue} />
            <div style={{display: "flex", gap: "8px", cursor: "pointer"}} onClick={() => setListOpened(!listOpened)}>
              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <img width="17" height="15" src={"/add-icn.png"} alt=""/>
              </div>
              <div style={{fontSize: "15px", fontWeight: "500", fontFamily: "Inter"}}>select a group member</div>
            </div>
          </div>

          {listOpened && <div>
            <div style={{fontSize: "24px", fontWeight: "bold", fontFamily: "Inter"}}>Recent users</div>
            {group?.users && group.users.map((user: any) => (
              <div key={user.id} className="grid grid-cols-[2fr_3fr_1fr_auto] items-center gap-4 w-full text-sm font-semibold border-b py-2">
                <div>{user.name}</div>
                <div className="font-normal underline">{user.login ? user.login : ''}</div>
                <div>{user.role}</div>
                <div className="flex justify-end pr-1" style={{cursor: "pointer"}}>
                  <img src="/feather-icons/trash-2.svg" width="13" height="13" alt="Delete" onClick={() => deleteItem(user?.id)} />
                </div>
              </div>
            ))}
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
