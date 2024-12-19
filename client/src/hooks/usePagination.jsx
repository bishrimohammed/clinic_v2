import React, { useCallback, useState } from "react";

export default function usePagination(paginateSate) {
  const [paginate, setPagination] = useState(paginateSate);
  const handlePageChange = useCallback((page) => {
    setPagination((prev) => {
      return { ...prev, page: page };
    });
  }, []);
  const handleLimitChange = useCallback((limit) => {
    setPagination((prev) => {
      return { ...prev, limit: limit };
    });
  }, []);
  const handleSortByChange = useCallback((sortby) => {
    setPagination((prev) => {
      return {
        ...prev,
        sortBy: sortby,
        order:
          sortby === prev.sortBy
            ? prev.order === "asc"
              ? "desc"
              : "asc"
            : "desc",
      };
    });
  }, []);
  const handleOrderChange = useCallback((order) => {
    setPagination((prev) => {
      return { ...prev, order: order };
    });
  }, []);
  return {
    paginate,
    handleLimitChange,
    handleSortByChange,
    handleOrderChange,
    handlePageChange,
  };
}
