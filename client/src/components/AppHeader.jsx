/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppHeaderDropdown } from "./header/index";
import { changeSidebarShow } from "../store/sidebarSlice";
import { Container } from "react-bootstrap";
import { TfiMenu } from "react-icons/tfi";
const AppHeader = ({ showHandler, isVisibile }) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  //const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 3,
        backgroundColor: "white",
      }}
      className="mb-2 p-1 border-bottom border-bottom-1"
    >
      <Container fluid className="d-flex align-items-center p-2">
        <div
          className="ps-1 me-2"
          onClick={() => {
            //dispatch({ type: "set", sidebarShow: !sidebarShow })
            dispatch(changeSidebarShow(!sidebarShow));
            //showHandler(!isVisibile);
          }}
        >
          {/* <CIcon icon={cilMenu} size="lg" /> */}
          <TfiMenu style={{ cursor: "pointer" }} />
        </div>

        <div className="d-none d-md-flex  ms-2 text-dark mt-1">
          <Link to="/">
            <span style={{ color: "black" }}>Dashboard</span>
          </Link>
        </div>

        <div className="ms-auto">
          <AppHeaderDropdown />
        </div>
      </Container>
      {/* <CHeaderDivider /> */}
    </div>
  );
};

export default AppHeader;
