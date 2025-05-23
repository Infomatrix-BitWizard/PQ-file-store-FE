import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { env } from '@/app/env';
import { IFolder } from '@/app/modules/folders/folders.api';
import { RootState } from "@/app/redux/store";

/** Описує і файл, і папку */
interface FileItem {
  id: string;
  name: string;
}

interface FilesState {
  files: FileItem[];
  folders: FileItem[];
  groupId?: string;
  folderId?: string;
}

const initialState: FilesState = {
  files: [],
  folders: [],
};

export const loadFiles = createAsyncThunk<FileItem[], void, { state: RootState }>(
  'files/loadFiles',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().filesTable;
    const { groupId, folderId } = state;

    const res = await axios.get(`${env.url}/files`, {
      params: {
        ...groupId && {groupID: groupId},
        ...folderId && {folderID: folderId},
      },
    });

    return res.data.data.map((item: any) => ({ id: item.id, name: item.name }));
  }
);

export const loadFolders = createAsyncThunk<FileItem[], void, { state: RootState }>(
  'files/loadFolders',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().filesTable;
    const { groupId, folderId } = state;

    // В папці нема папки
    if (folderId) {
      return [];
    }

    const res = await axios.get(`${env.url}/folders`, {
      params: {
        ...groupId && {groupID: groupId},
      }
    });
    return res.data.data.map((item: IFolder) => ({ id: item.id, name: item.name }));
  }
);

export const deleteFile = createAsyncThunk<string, string>(
  'files/deleteFile',
  async (id) => {
    await axios.delete(`${env.url}/files`, { data: { id } });
    return id;
  }
);

export const deleteFolder = createAsyncThunk<string, string>(
  'files/deleteFolder',
  async (id) => {
    await axios.delete(`${env.url}/folders`, { params: { folderID: id } });
    return id;
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setInitialState: () => initialState,
    setGroupId: (state, action: PayloadAction<string | undefined>) => {
      state.groupId = action.payload;
    },
    setFolderId: (state, action: PayloadAction<string | undefined>) => {
      state.folderId = action.payload;
    },
    addFolderSuccess: (state, action: PayloadAction<FileItem>) => {
      state.folders = [...state.folders, action.payload];
    },
    addFilesSuccess: (state, action: PayloadAction<FileItem>) => {
      state.files = [...state.files, action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFiles.fulfilled, (state, action: PayloadAction<FileItem[]>) => {
        state.files = action.payload;
      })
      .addCase(loadFolders.fulfilled, (state, action: PayloadAction<FileItem[]>) => {
        state.folders = action.payload;
      })
      .addCase(deleteFile.fulfilled, (state, action: PayloadAction<string>) => {
        state.files = state.files.filter(file => file.id !== action.payload);
      })
      .addCase(deleteFolder.fulfilled, (state, action: PayloadAction<string>) => {
        state.folders = state.folders.filter(folder => folder.id !== action.payload);
      });
  },
});

export const { setInitialState, addFolderSuccess, addFilesSuccess, setGroupId, setFolderId } = filesSlice.actions;
export default filesSlice.reducer;
