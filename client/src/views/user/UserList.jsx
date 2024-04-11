import { Button, Container, Spinner, Table } from "react-bootstrap";
import { BiSearch, BiEdit } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetUsers } from "./hooks/useGetUsers";
import { useActivateUser } from "./hooks/useActivateUser";
import { useDeactivateUser } from "./hooks/useDeactivateUser";
import SearchInput from "../../components/inputs/SearchInput";
import UserListTable from "./UserListTable";
import UserDeactivateModal from "./UserDeactivateModal";
import { useMemo, useState } from "react";
import ViewUser from "./ViewUser";
import EditUserModel from "./EditUserModel";

const UserList = () => {
  //const [users, setUser] = useState([]);
  const { data: users, isPending, error } = useGetUsers();
  const navigate = useNavigate();
  const [showDeactivateModal, setShowDeactivateModal] = useState({
    isShow: false,
    userId: null,
    selectedFor: "",
  });
  const [showViewUser, setShowViewUser] = useState({
    isShow: false,
    user: null,
  });
  const [showViewEdit, setShowViewEdit] = useState({
    isShow: false,
    user: null,
  });
  const rowData = useMemo(() => users || [], [users]);
  const { mutate: activateMut } = useActivateUser();
  const { mutate } = useDeactivateUser();

  if (isPending) return <Spinner animation="grow" />;
  if (error) return <div>error {error.message}</div>;
  // console.log(users);

  return (
    <>
      <Container className="p-3">
        <div className="d-flex justify-content-between p-1 mb-2">
          <h4>Users</h4>
          {/* <div className="   ">
          <Button
            variant="success"
            type="button"
            onClick={() => navigate("newuser")}
          >
            + Add User
          </Button>
        </div> */}
        </div>
        <UserListTable
          users={rowData}
          isPending={isPending}
          setShowDeactivateModal={setShowDeactivateModal}
          setShowViewUser={setShowViewUser}
          setShowViewEdit={setShowViewEdit}
        />
        {/* <SearchInput /> */}
      </Container>
      {showDeactivateModal.isShow && (
        <UserDeactivateModal
          show={showDeactivateModal.isShow}
          userId={showDeactivateModal.userId}
          handleClose={setShowDeactivateModal}
          action={showDeactivateModal.selectedFor}
        />
      )}
      {showViewUser.isShow && showViewUser.user && (
        <ViewUser
          show={showViewUser.isShow}
          user={showViewUser.user}
          handleClose={setShowViewUser}
        />
      )}
      {showViewEdit.isShow && showViewEdit.user && (
        <EditUserModel
          show={showViewEdit.isShow}
          user={showViewEdit.user}
          handleClose={setShowViewEdit}
        />
      )}
    </>
  );
};

export default UserList;
