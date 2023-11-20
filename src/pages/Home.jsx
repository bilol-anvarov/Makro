import { queryOptions } from "../utils/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { MainLoading } from "../components/Loading";
import { useNavigate } from "react-router";
import PromotionCard from "../components/Promotions/PromotionCard";
import { axiosClient } from "../app/api";
import SectionHead from "../components/SectionHead/SectionHead";
import Slider from "react-slick";
import { sliderSettings } from "../utils/helpers";
import Shops from "../components/Shops";
import { useMainContext } from "../context/MainContext";
import { homeProducts, homePromotions } from "../datas/data";
import ProductCard from "../components/Products/ProductCard";

const Home = () => {
  const { activeLan } = useMainContext();
  const navigate = useNavigate();
  const { data, isLoading, isRefetching } = useQuery(
    ["home-discount-list", activeLan],
    async () => {
      const res = await axiosClient().get(`/discount-list/`, {
        params: { p: true, limit: 3 },
      });
      return res.data;
    },
    queryOptions
  );

  const { data: news } = useQuery(
    ["home-news-list", activeLan],
    async () => {
      const res = await axiosClient().get(`/news-list/`, {
        params: { p: true, limit: 2 },
      });
      return res.data?.results;
    },
    queryOptions
  );

  const promotions = data?.results;

  const {
    data: products,
    isLoading: isLoadingProducts,
    isRefetching: isRefetchingProducts,
  } = useQuery(
    ["home-product-list", activeLan],
    async () => {
      const res = await axiosClient().get(`/product-list/`, {
        params: { limit: 7, p: true },
      });
      return res.data;
    },
    queryOptions
  );

  return (
    <>
      <SectionHead {...homePromotions} />
      <div className="flex flex-col gap-[24px]">
        {isLoading || isRefetching ? (
          <MainLoading />
        ) : promotions ? (
          <Slider {...sliderSettings} className="w-[100%]">
            {promotions?.map((promotion) => (
              <PromotionCard
                key={promotion.id}
                imgUrl={promotion?.photo_medium}
                onClick={() => navigate(`/promotions/${promotion.id}`)}
              />
            ))}
            {news?.map((item) => (
              <PromotionCard key={item.id} imgUrl={item?.photo_medium} onClick={() => navigate(`/news/${item.id}`)} />
            ))}
          </Slider>
        ) : (
          <></>
        )}
        <div>
          <SectionHead {...homeProducts} />
          <div className="grid sm:gap-[15px] gap-[8px] xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 mt-[24px]">
            {isLoadingProducts || isRefetchingProducts ? (
              <MainLoading />
            ) : (
              products?.results?.map((item, index) => <ProductCard item={item} id={index} key={item.id} />)
            )}
          </div>
        </div>
        <Shops />
      </div>
    </>
  );
};
export default Home;
