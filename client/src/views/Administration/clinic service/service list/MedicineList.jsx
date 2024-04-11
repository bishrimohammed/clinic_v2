import React from "react";
import { useGetMedicines } from "../../../hooks/useGetMedicines";
import {
  Button,
  Container,
  Form,
  InputGroup,
  NavLink,
  Table,
} from "react-bootstrap";
import { BiEdit, BiSearch } from "react-icons/bi";
import PaginationComponent from "../../../../components/PaginationComponent";
import { UsePagination } from "../../../hooks/UsePagination";
import { useNavigate } from "react-router-dom";

const MedicineList = () => {
  const {
    data: medications,
    isLoading,
    isPending,
    isError,
    error,
  } = useGetMedicines();
  const [page, pageChangeHandler, totalPage, startIndex, endIndex] =
    UsePagination(
      //props.itemslength
      medications?.length
    );
  const navigate = useNavigate();
  if (isPending) return <div>fetching</div>;
  if (isError) return <div>error : {error.message}</div>;
  return (
    <Container>
      {/*  <div className="mb-2">
        <h4>Medicines</h4>
      </div>
      <hr className="bg-primary" />
      <Container>
        <div className="search w-50">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button
              variant="outline-secondary"
              className="border-1"
              id="button-addon2"
            >
              <BiSearch />
            </Button>
          </InputGroup>
        </div>
      </Container> */}
      {/* <div className="d-flex justify-content-between mb-2">
        <h4>Users</h4>
        <div className="   ">
          <Button
            variant="success"
            type="button"
            onClick={() => navigate("/administrations/user/newuser")}
          >
            + Add User
          </Button>
        </div>
      </div>
 */}
      <div className="my-2 me-2  d-flex align-items-center justify-content-end">
        <div className="search border border-2 border-color borderRadius7px">
          <input placeholder="Search..." className="border-0 p-2" />
          <button
            //variant="outline-secondary"
            className="border-0 py-2 px-3 bg-white"
            id="button-addon2"
          >
            <BiSearch size={20} />
          </button>
        </div>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Drug name</th>
            <th>description</th>
            <th>price</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medications?.slice(startIndex, endIndex).map((medicine, index) => (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() =>
                //console.log("hello")
                navigate(
                  `/administrations/services/${medicine._id}/editmedicine`,
                  {
                    state: medicine,
                  }
                )
              }
            >
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{medicine.drugname}</td>

              <td>{medicine.description}</td>
              <td>{medicine.price}</td>

              <td>
                <NavLink to={`/medicine/edit/${medicine._id}`}>
                  <BiEdit size={20} />
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
      <div className="d-flex justify-content-between mb-2">
        <div className="flex-grow-1">
          <PaginationComponent
            page={page}
            totalPage={totalPage}
            pageChangeHandler={pageChangeHandler}
            //itemslength={data?.length}
          />
        </div>

        <div className="   ">
          <Button
            variant="success"
            type="button"
            onClick={() => navigate("/administrations/services/addmedicine")}
          >
            + Add Medicine
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default MedicineList;
