import { useEffect, useState } from "react";
import { AppContent, AppFooter, AppHeader } from "../components/index";
import Sidebar from "../components/Sidebar";

import { useSelector } from "react-redux";
import useScreenWidth from "../hooks/useScreenWidth";

const DefaultLayout = () => {
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  const [showSidebar, setShowSidebar] = useState(
    window.innerWidth > 768 ? true : false
  );
  const screenwidth = useScreenWidth();
  // console.log(screenwidth);
  const showSidebarHandler = (value) => {
    setShowSidebar(value);
  };
  //useEffect(() => {}, []);
  // console.log(showSidebar);
  return (
    <>
      {/* <div className="">
        <Sidebar isVisibile={showSidebar} showHandler={showSidebarHandler} />
        <div
          // style={{ paddingLeft: showSidebar ? "16rem" : 0 }}
          style={{
            position: "relative",
            paddingLeft: showSidebar ? "16rem" : 0,
          }}
          className="d-flex  flex-column min-vh-100 bg-light"
        >
          {showSidebar && (
            <div
              onClick={() => showSidebarHandler(false)}
              className="d-md-none d-block"
              style={{
                zIndex: 4,
                width: "100vw",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            ></div>
          )}
         
          <AppHeader
            isVisibile={showSidebar}
            showHandler={showSidebarHandler}
          />
          <div
            // style={{ position: "relative", overflow: "hidden" }}
            className="body flex-grow-1  ps-1  bg-hrun-content"
          >
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div> */}
      <div>
        <Sidebar />
        <div
          style={{ paddingLeft: sidebarShow ? "17rem" : 0 }}
          className="d-flex flex-column min-vh-100 bg-light"
        >
          <AppHeader />
          <div className="body flex-grow-1  ps-1  bg-hrun-content">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
