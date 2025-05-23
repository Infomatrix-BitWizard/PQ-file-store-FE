import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/redux/auth.slice";
import sslReducer from "../modules/ssl/ssl.slice";
import groupsReducer from "../modules/groups/redux/groups.slice";
import userReducer from "../modules/user/redux/user.slice";
import groupReducer from "../modules/group/redux/group.slice";
import filesTableReducer from "../modules/files-table/redux/files-table.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ssl: sslReducer,
    groups: groupsReducer,
    user: userReducer,
    group: groupReducer,
    filesTable: filesTableReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
