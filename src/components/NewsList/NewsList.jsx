import { useQuery } from "@tanstack/react-query";
import NewsItem from "./NewsItem";
import { queryOptions } from "./../../utils/queryOptions";
import { axiosClient } from "../../app/api";
import Pagination from "../Pagination";
import { MainLoading } from "../Loading";
import { getOffset } from "../../utils/helpers";
import { useState } from "react";
import { useMainContext } from "../../context/MainContext";

const NewsList = ({ year, month }) => {
  const { activeLan } = useMainContext();

  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isError, isLoading } = useQuery(
    ["news-list", page, year, month, activeLan],
    async () => {
      const res = await axiosClient().get("/news-list/", {
        params: {
          ...(month && { date: `${year}-${month}-01` }),
          offset: getOffset(page, limit),
          limit,
          p: true,
        },
      });
      return res.data;
    },
    { ...queryOptions, keepPreviousData: true }
  );
  if (isLoading) return <MainLoading />;

  if (isError) return <div>Error</div>;

  const { count: totalItems } = data;

  const paginate = (pageNumber) => setPage(pageNumber);

  return (
    <div>
      {data.results.map((item) => (
        <NewsItem key={item.id} {...item} />
      ))}
      <Pagination
        className="lg:m-0 lg:ml-auto m-auto"
        totalItems={totalItems}
        itemsPerPage={limit}
        paginate={paginate}
      />
    </div>
  );
};
export default NewsList;
