import "./FilesTable.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popup from "@/app/ui/popup/Popup";
import PopupContainer from "@/app/ui/popupContainer/popupContainer";
import PopupButton from "@/app/ui/popupButton/PopupButton";
import { AppDispatch, RootState } from "@/app/redux/store";
import { deleteFile, deleteFolder, loadFiles, loadFolders, setFolderId, setGroupId, setInitialState } from "@/app/modules/files-table/redux/files-table.slice";
import { useRouter, useSearchParams } from "next/navigation";
import { downloadFile } from "@/app/modules/files/requests/downloadFileReq";

/**
 Компонент для відображення файлів і папок
 Базується на сторі files-table.slice
 */

export default function FilesTable() {
  const dispatch = useDispatch<AppDispatch>();
  const userAesKey = useSelector((state: RootState) => state.auth.userAesKey);
  const { folders, files } = useSelector((state: RootState) => state.filesTable);
  const router = useRouter();

  const searchParams = useSearchParams();
  const paramsGroupID = searchParams.get("groupID");
  const paramsFolderID = searchParams.get("folderID");

  useEffect(() => {
    dispatch(setInitialState());

    dispatch(setFolderId(paramsFolderID ?? undefined));
    dispatch(setGroupId(paramsGroupID ?? undefined));

    dispatch(loadFiles());
    dispatch(loadFolders());
  }, [dispatch, paramsGroupID, paramsFolderID]);

  return (
    <div className="files-table">
      <div className="files-table__header">
        <div className="files-table__header-row">
          <div className="files-table__header-cell--icon"></div>
          <div className="files-table__header-cell" style={{flex: 3}}>Name</div>
          <div className="files-table__header-cell">Last changes</div>
          <div className="files-table__header-cell">File size</div>
          <div className="files-table__header-cell--actions">Select</div>
        </div>
      </div>
      <div className="files-table__body">
        {folders.map((item, i) => (
          <div className="files-table__row" key={`folder-${item.id}`} onDoubleClick={() => router.push(`/dashboard/folder?folderID=${item.id}`)}>
            <div className="files-table__cell--icon">
              <img src={"/FolderNotch.png"} width="14" height="14" alt="" />
            </div>
            <div className="files-table__cell" style={{flex: 3}}>
              <span className="files-table__cell-text">{item.name}</span>
            </div>
            <div className="files-table__cell">05 Feb. 2025</div>
            <div className="files-table__cell">0 kb</div>
            <div className="files-table__cell--actions">
              <Checkbox />
              <Popup
                content={
                  <PopupContainer>
                    <PopupButton onClick={() => dispatch(deleteFolder(item.id))}>Delete</PopupButton>
                  </PopupContainer>
                }
              >
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Popup>
            </div>
          </div>
        ))}

        {files.map((item, i) => (
          <div className="files-table__row" key={`file-${item.id}`}>
            <div className="files-table__cell--icon">
              <img src={"/File.png"} width="14" height="14" alt="" />
            </div>
            <div className="files-table__cell" style={{flex: 3}}>
              <span className="files-table__cell-text">{item.name}</span>
            </div>
            <div className="files-table__cell">05 Feb. 2025</div>
            <div className="files-table__cell">0 kb</div>
            <div className="files-table__cell--actions">
              <Checkbox />
              <Popup
                content={
                  <PopupContainer>
                    <PopupButton onClick={() => downloadFile(item.id, item.name, userAesKey)}>Download</PopupButton>
                    <PopupButton onClick={() => dispatch(deleteFile(item.id))}>Delete</PopupButton>
                  </PopupContainer>
                }
              >
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Popup>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
