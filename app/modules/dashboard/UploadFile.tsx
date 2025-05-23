"use client";

import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { encryptFile, uploadFileReq } from "@/app/modules/files/requests/uploadFileReq";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface IUploadFileProps {
  groupID?: string;
  folderID?: string;
  uploaded?: (data: any) => void
}

const UploadFile = ({ groupID, folderID, uploaded }: IUploadFileProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const userAesKey = useSelector((state: RootState) => state.auth.userAesKey);

  const handlerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;
      if (e.target.files.length === 0) return;

      const encryptedFile = await encryptFile(e.target.files[0], userAesKey);
      const res = await uploadFileReq(encryptedFile, { groupID, folderID });

      if (ref.current) {
        ref.current.value = "";
      }

      uploaded && uploaded(res);
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <input
        ref={ref}
        type="file"
        onChange={handlerChange}
        // multiple
        style={{
          display: "none",
        }}
      />
    </Button>
  );
};

export default UploadFile;
