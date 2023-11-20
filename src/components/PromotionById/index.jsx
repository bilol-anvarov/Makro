import { useParams } from "react-router-dom";
import fileIcon from "../../assets/file.svg";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../app/api";
import SectionHead from "../SectionHead/SectionHead";
import { useState } from "react";
import PromotionCard from "../Promotions/PromotionCard";
import { useMainContext } from "../../context/MainContext";
import { offers, promotionsById } from "../../datas/data";

const PromotionById = () => {
  const { activeLan } = useMainContext();

  const { id } = useParams();
  const [sectionData, setSectionData] = useState(promotionsById);
  const linkIndexes = [];

  const { data } = useQuery(
    ["discount-detail", activeLan],
    async () => {
      const res = await axiosClient().get(`/discount-detail/${id}`);
      setSectionData({ ...sectionData, additonalText: res.data.startDate });
      return res.data;
    },
    { refetchOnWindowFocus: false }
  );

  const allWords = data?.description.split(" ");

  return (
    <div className="flex flex-col md:gap-[30px] gap-[20px]">
      <SectionHead {...sectionData} />
      <PromotionCard imgUrl={data?.photo_medium} />

      <div className="title font-bold uppercase">{data?.title}</div>

      <div className="flex flex-col gap-[20px] whitespace-pre-wrap">
        <p>
          {data?.description.split(" ").map((word, index) => {
            if (word.startsWith("http://") || word.startsWith("https://") || word.endsWith(".uz")) {
              linkIndexes.push(index + 1);
              return (
                <a
                  key={index}
                  href={word}
                  className="text-blue-500 underline hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* {word}{" "} */}
                  {allWords[index + 1]}{" "}
                </a>
              );
            } else {
              return <span key={index}>{linkIndexes.includes(index) ? "" : word} </span>;
            }
          })}
        </p>
      </div>

      {data?.file && (
        <>
          <SectionHead {...offers} />

          <div className="btn btn-no-active flex justify-between lg:flex-nowrap flex-wrap lg:gap-[0px] gap-[10px]">
            <div>{data?.titleFile}</div>
            <div className="flex gap-[40px] items-center">
              <div>{data?.endDateFile}</div>
              <a href={data?.file} target="_blank" rel="noreferrer">
                <img src={fileIcon} alt="" className="w-[32px] cursor-pointer" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PromotionById;
