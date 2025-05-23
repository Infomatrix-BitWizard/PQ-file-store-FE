import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSsl } from "@/app/modules/ssl/ssl.slice";
import { axiosSslReq, axiosSslRes } from "@/app/modules/ssl/axiosSsl";
import { env } from "@/app/env";
import axios from "axios";
import { useMount } from "@/app/hooks/useMount";

export const useSslInit = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { isMount } = useMount();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMount && !isChecked) {
      init();
    }
  }, [isMount]);

  const init = async () => {
    try {
      const checkSslRes = await axios({
        method: "GET",
        url: `${env.url}/ssl/active-status`,
      });

      if (!checkSslRes.data.data.sslEnable) {
        return;
      }

      const serverPublicKey = await getServerPublicKey();

      // @ts-ignore
      const { encryptedKey, sharedSecret } = await window.electronAPI.encryptWithKyber(serverPublicKey);

      const sessionID = await setSessionOnServer(encryptedKey);

      axiosSslReq(sessionID, sharedSecret);
      axiosSslRes(sharedSecret);

      dispatch(setSsl({
        aesKey: sharedSecret,
        sessionID: sessionID,
      }));
    } catch (err) {
      console.info(err);
    } finally {
      setIsChecked(true);
    }
  };

  const getServerPublicKey = async () => {
    try {
      const res = await axios({
        url: `${env.url}/ssl/get-public-key`,
        method: "POST",
      });

      return res.data.data.publicKey;
    } catch (err) {
      console.info(err);
    }
  };

  const setSessionOnServer = async (encryptedKey: string) => {
    try {
      const res = await axios({
        url: `${env.url}/ssl/set-session`,
        method: "POST",
        data: { encryptedKey },
      });

      return res.data.data.id;
    } catch (err) {
      console.info(err);
    }
  };

  return { isChecked };
};
