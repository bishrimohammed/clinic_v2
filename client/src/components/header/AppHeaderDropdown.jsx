import userFemale from "./../../assets/user-female.png";
import userMale from "./../../assets/user-male.png";
import { useDispatch, useSelector } from "react-redux";
import { setlogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import "./header.css";
import { CiLock, CiUser } from "react-icons/ci";
const AppHeaderDropdown = () => {
  // const user = JSON.parse(localStorage.getItem("currentUser"));
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Dropdown variant="nav-item">
      {/* <Dropdown.Toggle placement="bottom-end"  className="py-0" caret={true}>
        <CAvatar
          src={user.gender === "female" ? userFemale : userMale}
          size="md"
        />
      </Dropdown.Toggle> */}
      <Dropdown.Toggle placement="bottom-end" className="py-0">
        {/* <DropdownButton className="btn-secondary" variant="secondary">
          gcgfcg
        </DropdownButton>{" "} */}
        <Image
          src={user.gender === "female" ? userFemale : userMale}
          size=""
          width={37}
          fluid
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className="pt-0" placement="bottom-end">
        <Dropdown.Header className="bg-light fw-semibold py-2">
          {user.username}
        </Dropdown.Header>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <Dropdown.Divider />
        <Dropdown.Header className="bg-light fw-semibold py-2">
          Settings
        </Dropdown.Header>
        <Dropdown.Item
          // className="curserpointer"
          className="d-flex align-items-center curserpointer"
          onClick={() => {
            navigate("/profile/changepassword");
          }}
        >
          {/* <CIcon icon={cilLockLocked} className="me-2" /> */}
          <CiLock size={18} className="me-1" />
          Change password
        </Dropdown.Item>
        <Dropdown.Item href="#" className="d-flex align-items-center">
          {/* <CIcon icon={cilUser} className="me-2" /> */}
          <CiUser size={18} className="me-1" />
          Profile
        </Dropdown.Item>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem> */}

        <Dropdown.Divider />

        <Dropdown.Item
          // className="curserpointer"
          className="d-flex align-items-center curserpointer"
          onClick={() => {
            dispatch(setlogout());
            navigate("/login");
          }}
        >
          {/* <CIcon icon={cilLockLocked} className="me-2" /> */}
          <CiLock size={18} className="me-1" />
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppHeaderDropdown;
