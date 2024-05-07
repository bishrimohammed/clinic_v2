import React from "react";
// import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <div className="footer" style={{ zIndex: 1000 }}>
      <div>
        <span className="ms-1">
          &copy; {new Date().getFullYear()} All rights reserved.
        </span>
      </div>
      <div className="">
        <span className="me-1">Powered by</span>
        Softnet
      </div>
    </div>
  );
};

const MemoizedAppFooter = React.memo(AppFooter);

export default MemoizedAppFooter;
