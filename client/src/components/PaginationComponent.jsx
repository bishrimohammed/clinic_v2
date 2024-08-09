import { Pagination } from "react-bootstrap";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

const PaginationComponent = ({ tableInstance }) => {
  // console.log(tableInstance.getState().pagination.pageIndex);
  return (
    <div
      style={{ zIndex: 0 }}
      className="d-flex flex-wrap justify-content-center mt-md-1 mt-2 align-items-center gap-2"
    >
      <button
        className="border-0"
        style={{ outline: "none" }}
        onClick={() => tableInstance.firstPage()}
        disabled={!tableInstance.getCanPreviousPage()}
      >
        &lt;&lt;
      </button>
      <button
        // className="btn  px-2 btn-sm"
        onClick={() => tableInstance.previousPage()}
        disabled={!tableInstance.getCanPreviousPage()}
      >
        &lt;
        {/* <FaLessThan /> */}
      </button>
      <button
        // className="btn btn-outline-secondary"
        onClick={() => tableInstance.nextPage()}
        disabled={!tableInstance.getCanNextPage()}
      >
        &gt;
      </button>
      <button
        // className="btn btn-outline-secondary"
        onClick={() => tableInstance.lastPage()}
        disabled={!tableInstance.getCanNextPage()}
      >
        &gt;&gt;
      </button>
      <span className="d-flex align-items-center gap-1">
        <div>Page</div>
        <strong className="d-flex align-items-center gap-1">
          {tableInstance.getState().pagination.pageIndex + 1} of{" "}
          {tableInstance.getPageCount().toLocaleString()}
        </strong>
      </span>
      <span className="d-flex align-items-center gap-1">
        | Go to page:
        <input
          type="number"
          value={tableInstance.getState().pagination.pageIndex + 1}
          // defaultValue={tableInstance.options.state.pagination.pageIndex}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            tableInstance.setPageIndex(page);
          }}
          className="form-control w-25"
        />
      </span>
      <select
        value={tableInstance.getState().pagination.pageSize}
        // value={tableInstance.options.state.pagination.pageIndex}
        onChange={(e) => {
          tableInstance.setPageSize(Number(e.target.value));
        }}
        // className="form-select"
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaginationComponent;
