import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState: IGroupState = {
  id: "",
  name: "",
  users: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState: initState,
  reducers: {
    openGroup: (state, action: PayloadAction<IOpenGroup>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.users = action.payload.users;
    },
  }
});

export const { openGroup } = groupSlice.actions;

export default groupSlice.reducer;
