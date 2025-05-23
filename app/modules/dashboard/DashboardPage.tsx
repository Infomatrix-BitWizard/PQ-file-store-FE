"use client";

import "./ProfileCaption.css";
import FilesTable from "@/app/components/FilesTable/FilesTable";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const DashboardPage = () => {
  const userNameState = useSelector((state: RootState) => state.user.name);

  return (
    <>
      <main className="flex flex-col flex-1 gap-5 overflow-hidden">
        <div className="profile-caption">
          <img src={"avatar_circle.png"} width="143" height="143" alt="" />
          <div className="profile-caption__credentials">
            <div className="profile-caption__credentials-name">{userNameState}</div>
            <div className="profile-caption__credentials-role">Owner</div>
          </div>
          <img src={"flying_files.png"} alt="" style={{marginLeft: "auto", marginRight: "50px"}} />
        </div>

        <FilesTable/>
      </main>
    </>
  );
};

export default DashboardPage;
