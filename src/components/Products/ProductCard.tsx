import React from "react";
import { useTranslation } from "react-i18next";

const ProductCard = ({ item, id }) => {
  const { t } = useTranslation();

  return (
    <div
      className={` ${
        id === 0 ? "catalog-wrapper-first col-span-2 flex justify-between items-start " : "catalog-wrapper"
      }`}
      key={id}
    >
      {id === 0 ? (
        <>
          <div>
            <p className={`title`}>{item.title}</p>
            <span className="subTitle">
              {t("products.activeTo")} {item.endDate}
            </span>
          </div>
          <div className={`flex justify-between ${id === 0 ? "flex-row-reverse" : ""} xl:mt-[19px] mt-[15px]`}>
            <div className="img-wrapper ">{item?.photo_medium && <img src={item.photo_medium} alt="" />}</div>
            <div className="rotate">
              <div className={`price`}>
                <div className="flex gap-[3px]">
                  <div className="sm:text-[20px] text-[16px] font-black">
                    {item.newPrice.toString().substring(0, item.newPrice.toString()?.length - 3)}
                  </div>
                  <div className="flex flex-col gap-[2px] items-start mt-[3px]">
                    <div className="h-[10px] sm:text-[12px] text-[10px]  font-black">
                      {item.newPrice.toString().slice(-3)}
                    </div>
                    <div className="h-[10px] sm:text-[9px] text-[8px]">so&#39;m</div>
                  </div>
                </div>

                {item.status === 1 && <div className="percent">-{item.percent}%</div>}
              </div>
              {item.status === 1 && (
                <span>
                  <div className="oldPrice">
                    {item.oldPrice.toString().substring(0, item.oldPrice.toString()?.length - 3)}
                    <div>{item.oldPrice.toString().slice(-3)}</div>
                  </div>
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className={`title`}>{item.title}</p>
          <span className="subTitle">
            {t("products.activeTo")} {item.endDate}
          </span>
          <div className={`flex justify-between ${id === 0 ? "flex-row-reverse" : ""} xl:mt-[19px] mt-[15px]`}>
            <div className="img-wrapper">{item?.photo_medium && <img src={item.photo_medium} alt="" />}</div>
            <div className="rotate">
              <div className={`price`}>
                <div className="flex gap-[3px]">
                  <div className="sm:text-[20px] text-[16px] font-black">
                    {item.newPrice.toString().substring(0, item.newPrice.toString()?.length - 3)}
                  </div>
                  <div className="flex flex-col gap-[2px] items-start mt-[3px]">
                    <div className="h-[10px] sm:text-[12px] text-[10px]  font-black">
                      {item.newPrice.toString().slice(-3)}
                    </div>
                    <div className="h-[10px] sm:text-[9px] text-[8px]">so&#39;m</div>
                  </div>
                </div>

                {item.status === 1 && <div className="percent">-{item.percent}%</div>}
              </div>
              {item.status === 1 && (
                <span>
                  <div className="oldPrice">
                    {item.oldPrice.toString().substring(0, item.oldPrice.toString()?.length - 3)}
                    <div>{item.oldPrice.toString().slice(-3)}</div>
                  </div>
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
