"use client";

import React, { useRef } from "react";
import { Modal } from "@/app/ui/modal/Modal";
import ModalContainer from "@/app/ui/modalContainer/ModalContainer";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { encryptFile, uploadFileReq } from "@/app/modules/files/requests/uploadFileReq";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useSearchParams } from "next/navigation";

interface IUploadFileModalProps {
  isOpen: boolean;
  onClose: (closed: boolean) => void;
  uploaded?: (data: any) => void;
}

const UploadFileModal = ({ isOpen, onClose, uploaded }: IUploadFileModalProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const userAesKey = useSelector((state: RootState) => state.auth.userAesKey);

  const searchParams = useSearchParams();
  const paramsGroupID = searchParams.get("groupID");
  const paramsFolderID = searchParams.get("folderID");

  const handlerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      const encryptedFile = await encryptFile(e.target.files[0], userAesKey);
      const res = await uploadFileReq(encryptedFile, {
        ...paramsGroupID && {groupID: paramsGroupID},
        ...paramsFolderID && {folderID: paramsFolderID}
      });

      ref.current && (ref.current.value = "");
      uploaded && uploaded(res);
      onClose(false); // Закрити модалку після завантаження
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContainer title="Upload file">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Select file
          <input
            ref={ref}
            type="file"
            onChange={handlerChange}
            style={{ display: "none" }}
          />
        </Button>
      </ModalContainer>
    </Modal>
  );
};

export default UploadFileModal;
