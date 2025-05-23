import { env } from "@/app/env";
import axios from "axios";
import { fileToBase64 } from "@/app/helpers/fileToBase64";
import { AES } from "@/app/modules/ssl/helpers/aes";

export const encryptFile = async (file: File, aesKey: string) => {
  const newFile = await fileToBase64(file);

  if (typeof newFile !== "string") {
    return file;
  }

  const encodedFile = AES.encryptData(aesKey, newFile);
  const jsonContent = JSON.stringify(encodedFile);
  const blob = new Blob([jsonContent]);
  const encryptedFile = new File([blob], file.name);

  return encryptedFile;
};

export const uploadFileReq = async (file: File, { groupID, folderID }: { groupID?: string; folderID?: string }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (groupID) formData.append("groupID", groupID);
    if (folderID) formData.append("folderID", folderID);

    const customAxios = axios.create();

    const res = await customAxios({
      method: "POST",
      url: `${env.url}/files`,
      data: formData,
    });

    return res.data.data;
  } catch (err) {
    console.info(err);
  }
};
