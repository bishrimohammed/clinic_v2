import { useState } from "react";

export const UsePagination = (itemsLenght) => {
  // console.log("usePag");
  const Items_Per_page = 10;
  const [page, setPage] = useState(1);
  const pageChangeHandler = (val) => {
    setPage(val);
  };
  const totalPage = Math.ceil(itemsLenght / Items_Per_page);
  const startIndex = (page - 1) * Items_Per_page;
  const endIndex = page * Items_Per_page;
  // console.log(startIndex, endIndex);
  return [page, pageChangeHandler, totalPage, startIndex, endIndex];
};
