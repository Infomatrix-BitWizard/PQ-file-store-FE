import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState = {
  list: [] as IGroupsState[],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState: initState,
  reducers: {
    initGroups: (state, action: PayloadAction<IGroupsState[]>) => {
      state.list = action.payload;
    },

    addGroup: (state, action: PayloadAction<IGroupsState>) => {
      state.list = [...state.list, {
        id: action.payload.id,
        name: action.payload.name,
      }];
    },
  },
});

export const { initGroups, addGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
