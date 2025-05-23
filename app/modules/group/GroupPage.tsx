"use client";

import React, { useEffect } from "react";
import FilesTable from "@/app/components/FilesTable/FilesTable";
import axios from "axios";
import { env } from "@/app/env";
import { useSearchParams } from "next/navigation";

const GroupPage = () => {
  const searchParams = useSearchParams();
  const paramsGroupID = searchParams.get("groupID");

  useEffect(() => {
    if (paramsGroupID) {
      getGroupInfo(paramsGroupID);
    }
  }, []);

  const getGroupInfo = async (id: string) => {
    try {
      const resp = await axios<IResponseData<any>>({
        method: "GET",
        url: `${env.url}/groups/id?groupID=${id}`
      });
      console.log(resp.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <FilesTable/>
    </>
  );
};

export default GroupPage;
