import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ tableInstance }) => {
  // console.log(tableInstance.getState().pagination.pageIndex);
  const currentPage = parseInt(
    tableInstance.getState().pagination.pageIndex + 1
  );
  const totalPages = parseInt(tableInstance.getPageCount());
  const handlePageClick = (page) => {
    tableInstance.setPageIndex(page - 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={currentPage === i}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(currentPage + 2, totalPages);

      if (currentPage - 2 > 1) {
        pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={currentPage === i}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage + 2 < totalPages) {
        pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="d-flex gap-2 align-items-center">
        <Pagination className="mb-0">
          <Pagination.First
            onClick={() => tableInstance.firstPage()}
            disabled={!tableInstance.getCanPreviousPage()}
          />
          <Pagination.Prev
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
          />
          {renderPageNumbers()}
          <Pagination.Next
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
          />
          <Pagination.Last
            onClick={() => tableInstance.lastPage()}
            disabled={!tableInstance.getCanNextPage()}
          />
        </Pagination>
        <span className="mb-0">
          page {currentPage} of {totalPages || 1}
        </span>
        <select
          style={{ outline: "none" }}
          className="p-1"
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
      {/* <div
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
    </div> */}
    </>
  );
};

export default PaginationComponent;
