// import useGetImagingStudies, {
//   useGetImagingStudiesTests,
// } from "../../../patient/hooks/useGetImagingStudies";
import { useNavigate } from "react-router-dom";
import { UsePagination } from "../../../hooks/UsePagination";
import PaginationComponent from "../../../../components/PaginationComponent";
import { Button, Table } from "react-bootstrap";
import { useGetImagingStudies } from "../hooks/useImagingService";

const ImagingServiceList = () => {
  const { data, isFetching, isError, error } = useGetImagingStudies();
  const [page, pageChangeHandler, totalPage, startIndex, endIndex] =
    UsePagination(
      //props.itemslength
      data?.length
    );
  const navigate = useNavigate();
  if (isFetching) return <div>fetching</div>;
  if (isError) return <div>error : {error.message}</div>;
  // console.log(data);
  // return;
  return (
    <>
      <Table striped bordered className="mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>status</th>
            <th>Price</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.slice(startIndex, endIndex).map((lab, index) => (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() =>
                //console.log("hello")
                navigate(`/administrations/services/${lab.id}/editlab`, {
                  state: lab,
                })
              }
            >
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{lab.service_name}</td>
              <td>{lab.serviceCategory.name}</td>
              <td>{lab.price}</td>
              <td>
                {lab.status ? (
                  <span className="py-0 px-1 text-center text-white bg-success">
                    active
                  </span>
                ) : (
                  <span className="py-0 px-1 text-center text-white bg-danger">
                    inactive
                  </span>
                )}
              </td>

              <td>
                <button className="btn btn-outline-success py-0">edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr />
      {data?.length > 10 && (
        <PaginationComponent
          page={page}
          totalPage={totalPage}
          pageChangeHandler={pageChangeHandler}
        />
      )}
      <div className="d-flex w-100 border-top border-1 p-1  justify-content-end">
        <Button
          variant="success"
          type="button"
          onClick={() =>
            navigate("/administrations/services/createimagingservice")
          }
        >
          + Add Imaging study Service
        </Button>
      </div>
    </>
  );
};

export default ImagingServiceList;
