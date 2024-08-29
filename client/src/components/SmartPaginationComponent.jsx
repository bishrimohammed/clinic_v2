import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const SmartPaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const handlePageClick = (page) => {
    onPageChange(page);
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
    <div className="d-flex gap-2 align-items-center">
      <Pagination className="mb-0">
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => handlePageClick(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        />
        {renderPageNumbers()}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(totalPages)}
        />
      </Pagination>
      <span className="mb-0">
        page {currentPage} of {totalPages || 1}
      </span>
      <select
        style={{ outline: "none" }}
        className="p-1"
        value={searchParams.get("limit") || 10}
        onChange={(e) => {
          setSearchParams((prev) => {
            prev.set("page", 1);
            prev.set("limit", parseInt(e.target.value));
            return prev;
          });
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

export default SmartPaginationComponent;
