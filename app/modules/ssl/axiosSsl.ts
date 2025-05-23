import axios from "axios";
import { AES } from "@/app/modules/ssl/helpers/aes";

export const axiosSslReq = (sessionID: string, aesKey: string) => {
  axios.interceptors.request.use((config) => {
    const reqData = config.data;

    if (reqData) {
      const { data, iv } = AES.encryptData(aesKey, JSON.stringify(reqData));

      config.data = {
        data,
        iv,
        sessionID,
      };
    } else {
      config.data = {
        sessionID,
      };
    }

    config.params = {
      ...config.params,
      sessionID,
    };

    return config;
  }, function(error) {
    return Promise.reject(error);
  });
};

export const axiosSslRes = (aesKey: string) => {
  axios.interceptors.response.use((response) => {
    const resData = response.data.data; // {data / iv}

    if (!resData.data || !resData.iv) {
      return response;
    }

    const decryptStr = AES.decryptData(aesKey, resData.iv, resData.data);

    response.data.data = JSON.parse(decryptStr);

    return response;
  }, function(error) {
    return Promise.reject(error);
  });
};