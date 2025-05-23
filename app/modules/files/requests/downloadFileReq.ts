import { env } from "@/app/env";
import { AES } from "@/app/modules/ssl/helpers/aes";
import { base64ToFile } from "@/app/helpers/base64ToFile";
import axios from "axios";

export const downloadFile = async (id: string, name: string, aesKey: string) => {
  try {
    const customAxios = axios.create();

    const response = await customAxios({
      method: "POST",
      url: `${env.url}/files/download`,
      data: { fileID: id },
      responseType: "blob",
    });

    const blob = await response.data;
    const text = await blob.text();
    const parsed = JSON.parse(text) as { data: string, iv: string };

    const decrypted = AES.decryptData(aesKey, parsed.iv, parsed.data);
    const decoded = base64ToFile(decrypted, name);

    const url = URL.createObjectURL(decoded);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);

  } catch (err) {
    console.info(err);
  }
};