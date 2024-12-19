import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useURLPagination = (defaultURL) => {
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("page", defaultURL?.page);
      prev.set("limit", defaultURL?.limit);
      prev.set("sortBy", defaultURL?.sortBy);
      prev.set("order", defaultURL?.order);
      return prev;
    });
  }, []);
  //   useCallback(,[])

  const changePage = useCallback((page) => {
    setSearchParams((prev) => {
      prev.set("page", parseInt(page));

      return prev;
    });
  }, []);
  const changePageOrder = useCallback((order) => {
    setSearchParams((prev) => {
      prev.set("order", order);

      return prev;
    });
  }, []);
  const changePageLimit = useCallback((limit) => {
    setSearchParams((prev) => {
      prev.set("limit", parseInt(limit));

      return prev;
    });
  }, []);
  const changePageSortBy = useCallback((sortBy) => {
    if (searchParams.get("sortBy") === sortBy) {
      const currentOrder = searchParams.get("order");
      const newOrder = currentOrder === "asc" ? "desc" : "asc";
      setSearchParams((prev) => {
        prev.set("order", newOrder);

        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("sortBy", sortBy);

        return prev;
      });
    }
  }, []);
  return {
    page: searchParams.get("page"),
    order: searchParams.get("order"),
    sortBy: searchParams.get("sortBy"),
    limit: searchParams.get("limit"),
    changePage,
    changePageLimit,
    changePageSortBy,
  };
};
