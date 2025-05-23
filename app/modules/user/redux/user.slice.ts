import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState: IUserState = {
  id: '',
  name: '',
  generatedAesKey: false,
};

const userSlice = createSlice({
  name: "files",
  initialState: initState,
  reducers: {
    initUserData: (state, action: PayloadAction<IUserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.generatedAesKey = action.payload.generatedAesKey;
    },

    updateUserData: (state, action: PayloadAction<boolean>) => {
      state.generatedAesKey = action.payload;
    },
  },
});

export const { initUserData, updateUserData } = userSlice.actions;

export default userSlice.reducer;
