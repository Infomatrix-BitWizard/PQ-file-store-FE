import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initState: IAuthState = {
  token: "",
  isAuth: false,
  userAesKey: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setUserAesKey: (state, action: PayloadAction<string>) => {
      state.userAesKey = action.payload;
    },

    signIn: (state, action: PayloadAction<IAuthMainData>) => {
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;

      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers.common["Authorization"] = action.payload.token;
    },

    singOut: state => {
      state.token = "";
      state.isAuth = false;

      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});

export const { signIn, singOut, setUserAesKey } = authSlice.actions;

export default authSlice.reducer;
