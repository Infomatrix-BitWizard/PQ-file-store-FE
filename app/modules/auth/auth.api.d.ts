interface IAuthRes {
  token: string;
}

interface ITokenData {
  data: {
    mfa: boolean;
    mfaVerify: boolean;
    tokenID: string;
    userID: string;
  }
  exp: number;
  iat: number;
}