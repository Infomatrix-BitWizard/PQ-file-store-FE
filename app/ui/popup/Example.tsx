'use client'

import React from "react";
import Popup from "@/app/ui/popup/Popup";
import PopupContainer from "@/app/ui/popupContainer/popupContainer";
import PopupButton from "@/app/ui/popupButton/PopupButton";
import { Button } from "@/app/ui/button/Button";
import Icon from "@/app/ui/icon/Icon";
import { useRouter } from "next/navigation";

const Example = () => {
  const router = useRouter();

  return (
    <Popup
      content={
        <PopupContainer>
          <PopupButton onClick={() => router.push("/dashboard/profile")}>Profile</PopupButton>
          <PopupButton onClick={() => {}}>Log out</PopupButton>
        </PopupContainer>
      }
    >
      <Button className={"header__right-buttons-button"}>
        <Icon
          className={"header__right-buttons-button-icon"}
          size={24}
        >
          {/*<Svg />*/}
        </Icon>

        <span className={"header__right-buttons-button-text"}>Vlad</span>
      </Button>
    </Popup>
  );
};

export default Example;