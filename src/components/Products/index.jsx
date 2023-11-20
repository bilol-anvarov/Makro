import { useQuery } from "@tanstack/react-query";
import "./style.scss";
import { queryOptions } from "../../utils/queryOptions";
import { useState } from "react";
import { axiosClient } from "../../app/api";
import Pagination from "../Pagination";
import { getOffset } from "../../utils/helpers";
import { MainLoading } from "../Loading";
import SectionHead from "../SectionHead/SectionHead";
import ProductCard from "./ProductCard";
import { products } from "../../datas/data";
import { useTranslation } from "react-i18next";
import { useMainContext } from "../../context/MainContext";

const Products = () => {
  const { activeLan } = useMainContext();

  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 19;

  const {
    data,
    isLoading: isLoadingProducts,
    isRefetching: isRefetchingProducts,
  } = useQuery(
    ["product-list", activeCategory, page, activeLan],
    async () => {
      const res = await axiosClient().get(`/product-list/`, {
        params: {
          category: activeCategory === "all" ? "" : activeCategory,
          offset: getOffset(page, limit),
          limit,
          p: true,
        },
      });
      return res.data;
    },
    queryOptions
  );

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isRefetching: isRefetchingCategories,
  } = useQuery(
    ["category", activeLan],
    async () => {
      const res = await axiosClient().get(`/category-list/`);
      return res.data;
    },
    { ...queryOptions, keepPreviousData: true }
  );

  const { data: topCategories } = useQuery(
    ["category-top", activeLan],
    async () => {
      const res = await axiosClient().get(`/category-top-list/`);
      return res.data;
    },
    { ...queryOptions, keepPreviousData: true }
  );

  const paginate = (pageNumber) => setPage(pageNumber);

  const { t } = useTranslation();

  return (
    <div className="mt-[40px]">
      <SectionHead {...products} />

      <div className="flex flex-wrap gap-[15px] sm:gap-[10px] mt-[24px]">
        {topCategories?.map((item) => (
          <button
            className={`btn btn-${activeCategory === item.id ? "active" : "no-active"}`}
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-[15px] sm:gap-[10px] mt-[24px]">
        <button
          onClick={() => setActiveCategory("all")}
          className={`btn btn-${activeCategory === "all" ? "active" : "no-active"}`}
        >
          {t("all")}
        </button>
        {isLoadingCategories || isRefetchingCategories ? (
          <MainLoading />
        ) : (
          [...(categories || []), ...(topCategories || [])]?.map((item) => (
            <button
              className={`btn btn-${activeCategory === item.id ? "active" : "no-active"}`}
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
            >
              {item.title}
            </button>
          ))
        )}
      </div>

      <div className="grid lg:gap-[24px] sm:gap-[15px] gap-[8px] xl:grid-cols-4 lg:grid-cols-3  grid-cols-2 mt-[40px]">
        {isLoadingProducts || isRefetchingProducts ? (
          <MainLoading />
        ) : (
          (data?.results || [])?.map((item, index) => <ProductCard item={item} id={index} key={item.id} />)
        )}
      </div>

      <div className="mt-[24px]">
        <Pagination
          className="lg:m-0 lg:ml-auto m-auto"
          totalItems={data?.count}
          itemsPerPage={limit}
          paginate={paginate}
        />
      </div>
    </div>
  );
};
export default Products;
