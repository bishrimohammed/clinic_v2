import { Pagination } from "react-bootstrap";

import PropTypes from "prop-types";

const PaginationComponent = ({ page, pageChangeHandler, totalPage }) => {
  PaginationComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pageChangeHandler: PropTypes.func.isRequired,
    totalPage: PropTypes.number.isRequired,
  };

  let items = [];
  //const totalpage = Math.ceil(itemslength / 10);
  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item
        onClick={() => pageChangeHandler(number)}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default PaginationComponent;
