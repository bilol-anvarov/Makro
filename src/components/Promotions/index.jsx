import { queryOptions } from "../../utils/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { MainLoading } from "../Loading";
import { useNavigate } from "react-router";
import PromotionCard from "./PromotionCard";
import { axiosClient } from "../../app/api";
import SectionHead from "../SectionHead/SectionHead";
import { useMainContext } from "../../context/MainContext";
import { promotions } from "../../datas/data";

const Promotions = () => {
  const navigate = useNavigate();
  const { activeLan } = useMainContext();

  const { data, isLoading, isRefetching } = useQuery(
    ["discount-list", activeLan],
    async () => {
      const res = await axiosClient().get(`/discount-list/`);
      return res.data;
    },
    queryOptions
  );

  return (
    <div className="flex flex-col mt-[24px] gap-[20px]">
      <SectionHead {...promotions} />

      {isLoading || isRefetching ? (
        <MainLoading />
      ) : (
        data?.map((item) => (
          <PromotionCard key={item.id} imgUrl={item?.photo_medium} onClick={() => navigate(`/promotions/${item.id}`)} />
        ))
      )}
    </div>
  );
};

export default Promotions;
