"use client";

import "./sidebar.css";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import React, { useState } from "react";
import CreateGroupModal from "@/app/modules/dashboard/modals/CreateGroupModal";
import TesseractModal from "@/app/modules/tesseract/TesseractModal";
import CreateFolderModal from "@/app/modules/dashboard/modals/CreateFolderModal";
import { addFilesSuccess, addFolderSuccess, deleteFolder } from "@/app/modules/files-table/redux/files-table.slice";
import UploadFileModal from "@/app/modules/dashboard/modals/UploadFileModal";
import PopupContainer from "@/app/ui/popupContainer/popupContainer";
import PopupButton from "@/app/ui/popupButton/PopupButton";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popup from "@/app/ui/popup/Popup";
import GroupUsersModal from "@/app/modules/group/GroupUsersModal";

export default function SidebarMenu() {
  const [isGroupUsersModalOpen, setIsGroupUsersModalOpen] = useState(false);
  const [isOpenCreateGroupModal, setIsOpenCreateGroupModal] = useState(false);
  const [isOpenCreateFolderModal, setIsOpenCreateFolderModal] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isOpenTesseractModal, setIsOpenTesseractModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.groups);
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const paramsFolderID = searchParams.get("folderID");

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar__logo-block">
          <img className="sidebar__logo-box" src={'/logo.png'}  alt='logo'/>
          <div className="sidebar__logo-text">
            Quantum Information<br />Science
          </div>
        </div>

        <nav className="sidebar__menu">
          <Link href="/dashboard">
            <div className={`sidebar__menu-item ${pathname === "/dashboard" ? "active" : ""}`}>
              Dashboard
            </div>
          </Link>

          <Link href="/dashboard/profile">
            <div className={`sidebar__menu-item ${pathname === "/dashboard/profile" ? "active" : ""}`}>
              Profile
            </div>
          </Link>

          <Link href="#">
            <div
              className={'sidebar__menu-item'}
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload files
            </div>
          </Link>

          <Link href="#">
            <div
              className={'sidebar__menu-item'}
              onClick={() => setIsOpenTesseractModal(true)}
            >
              Get text with image
            </div>
          </Link>

          <Link href="#">
            <div
              className={'sidebar__menu-item'}
              onClick={() => setIsOpenCreateGroupModal(true)}
            >
              Create group
            </div>
          </Link>

          {!paramsFolderID &&
            <Link href="#">
              <div
                className={'sidebar__menu-item'}
                onClick={() => setIsOpenCreateFolderModal(true)}
              >
                Create folder
              </div>
            </Link>
          }

          <div className="sidebar__group-label">Groups</div>

          {groups.list.map((group) => (
            <div key={group.id} className="sidebar__menu-item sidebar__group-item">
              <Link href={`/dashboard/group?groupID=${group.id}`}>{group.name}</Link>
              <FiMoreVertical className="sidebar__group-icon" onClick={() => setIsGroupUsersModalOpen(true)} />
            </div>
          ))}
        </nav>
      </aside>

      <CreateGroupModal
        isOpen={isOpenCreateGroupModal}
        onClose={setIsOpenCreateGroupModal}
      />

      <CreateFolderModal
        isOpen={isOpenCreateFolderModal}
        onClose={setIsOpenCreateFolderModal}
        created={item => dispatch(addFolderSuccess(item))}
      />

      <UploadFileModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        uploaded={item => dispatch(addFilesSuccess(item))}
      />

      <TesseractModal
        isOpen={isOpenTesseractModal}
        onClose={setIsOpenTesseractModal}
      />

      <GroupUsersModal
        isOpen={isGroupUsersModalOpen}
        onClose={() => setIsGroupUsersModalOpen(false)}
      />
    </>
  );
}
