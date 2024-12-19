import React from "react";
// import { CFooter } from "@coreui/react";

const AppFooter = ({ sidebarShow }) => {
  return (
    <div
      className="footer"
      style={{
        zIndex: 1000,
        position: "fixed",
        bottom: 0,
        left: sidebarShow ? "17rem" : 0,
        width: sidebarShow ? "calc(100% - 17rem)" : "100%",
        backgroundColor: "#f8f9fa",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <span className="ms-1">
          &copy; {new Date().getFullYear()} All rights reserved.
        </span>
      </div>
      <div className="">
        <span className="me-1">Powered by</span>
        Bishri
      </div>
    </div>
  );
};

const MemoizedAppFooter = React.memo(AppFooter);

export default MemoizedAppFooter;
