import { createSlice } from "@reduxjs/toolkit";

interface ISslState {
  aesKey: string;
  sessionID: string;
}

const initState: ISslState = {
  aesKey: "",
  sessionID: "",
};

const sslSlice = createSlice({
  name: "ssl",
  initialState: initState,
  reducers: {
    setSsl: (state, action: ReduxPayload<ISslState>) => {
      state.aesKey = action.payload.aesKey;
      state.sessionID = action.payload.sessionID;
    },

    unsetSsl: (state) => {
      state.aesKey = '';
      state.sessionID = '';
    },
  }
})

export const {setSsl, unsetSsl} = sslSlice.actions;

export default sslSlice.reducer;