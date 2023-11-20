import { useEffect, useState } from "react";
import SectionHead from "../components/SectionHead/SectionHead";
import NewsList from "../components/NewsList/NewsList";
import { months, news } from "../datas/data";
import { useTranslation } from "react-i18next";

const News = () => {
  const { t } = useTranslation();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [month, setMonth] = useState(months[currentMonth]);
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    if (year == currentYear) setMonth(months[currentMonth]);
    else setMonth(months[0]);
  }, [year, currentYear, currentMonth]);

  return (
    <div>
      <SectionHead {...news} backwardIcon />
      <div className="flex gap-6 items-stretch fex-wrap flex-col lg:flex-row">
        <div className="flex justify-center lg:p-8 p-7 flex-col h-initial bg-[#F5F5F5] !rounded-[20px] lg:!rounded-[36px] w-full lg:w-[300px]  min-w-[350px]">
          <div className="font-semibold lg:text-2xl text-lg text-black  lg:mb-3 ">{t("news.archive")}</div>
          <div className="flex">
            <input
              type="number"
              className="text-black  lg:text-2xl text-lg font-semibold border-none outline-none bg-[#F5F5F5] w-18"
              min="2000"
              max={currentYear}
              step="1"
              value={year}
              onChange={(e) => setYear(e.target.value.slice(0, 4))}
            />
            {/* <span className="font-semibold text-gray-400  lg:text-2xl text-lg">
              - {new Date().getFullYear() + 1}
            </span> */}
          </div>
        </div>
        <div className="grid grid-cols-2  lg:grid-cols-6 gap-3 justify-between items-center ">
          {months.map((item, index) => (
            <button
              className={`btn  ${
                month == item ? "btn-active " : "btn-no-active !text-[#B3B3B3]"
              } flex justify-center items-center !rounded-[35px]  lg:!text-xl !px-9 !py-5 !font-[500]`}
              key={index}
              onClick={() => setMonth(item)}
              disabled={year == currentYear && index > new Date().getMonth()}
            >
              {t(`month.${item}`)}
            </button>
          ))}
        </div>
      </div>
      <NewsList year={year} month={months.indexOf(month) + 1} />
    </div>
  );
};

export default News;
