"use client";

import UserAesModal from "@/app/modules/userAes/UserAesModal";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import './dashboard-layout.css'
import axios from "axios";
import { env } from "@/app/env";
import { initGroups } from "@/app/modules/groups/redux/groups.slice";
import SidebarMenu from "@/app/components/SidebarMenu/SidebarMenu";

export default function Layout({ children }: ILayout) {
  const dispatch = useDispatch();

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    try {
      const res = await axios<IResponseData<IGroup[]>>({
        method: "GET",
        url: `${env.url}/groups`,
      });

      dispatch(
        initGroups(
          res.data.data.map(item => ({
            id: item.id,
            name: item.name,
          })),
        ),
      );
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <>
      <div className={"dashboard-layout"}>
        <div className={'dashboard-layout__content'}>
          <SidebarMenu />

          <div>{children}</div>
        </div>
      </div>

      <UserAesModal />
    </>
  );
}
