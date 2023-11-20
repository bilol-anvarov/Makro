import { useEffect, useState } from "react";
import Map from "./Map";
import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "../../utils/queryOptions";
import { MainLoading } from "../Loading";
import "./style.scss";
import { axiosClient } from "../../app/api";
import SectionHead from "../SectionHead/SectionHead";
import { useLocation } from "react-router-dom";
import { shops } from "../../datas/data";
import { useTranslation } from "react-i18next";
import { useMainContext } from "../../context/MainContext";

const defaultCenter = { lat: 41.311081, lng: 69.240562 };

const Shops = () => {
  const { activeLan } = useMainContext();

  const location = useLocation();
  const { t } = useTranslation();

  const isShopsPage = location.pathname === "/shops";
  const [activePlace, setActivePlace] = useState("all");
  const [activeRegion, setActiveRegion] = useState("all");
  const [regions, setRegions] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 41.311081, lng: 69.240562 });
  const [activeShop, setActiveShop] = useState(null);
  const [zoom, setZoom] = useState(7);

  const {
    data: places,
    isLoading: isPlacesLoading,
    isRefetching: isPlacesRefetching,
  } = useQuery(
    ["location-region-list", activeLan],
    async () => {
      const res = await axiosClient().get(`/location-region-list/`);
      return res.data;
    },
    queryOptions
  );

  const {
    data: locations,
    isLoading: isLocationsLoading,
    isRefetching: isLocationsRefetching,
  } = useQuery(
    ["location-list", activeRegion, activePlace, activeLan],
    async () => {
      const res = await axiosClient().get(`/location-list/`, {
        params: {
          ...(activePlace && activePlace !== "all" && { region: activePlace }),
          ...(activeRegion && activeRegion !== "all" && { district: activeRegion }),
        },
      });
      const coordinates = [];
      res.data?.forEach((item) => {
        if (item.latitude) coordinates.push({ lat: +item.latitude, lng: +item.longitude });
      });
      setMarkers(coordinates);
      setActiveShop(null);
      if (activePlace !== "all" || activeRegion !== "all") {
        setCenter(coordinates[0] || null);
        setZoom(11);
      }
      return res.data;
    },
    queryOptions
  );

  const setAllRegions = () => {
    setCenter(defaultCenter);
    setZoom(7);
    setActivePlace("all");
    setActiveRegion("all");
    const allRegions = [];
    places?.forEach((item) => {
      item.districts?.forEach((i) => allRegions.push(i));
    });

    setRegions(allRegions);
  };

  const addRegions = (item) => {
    setActivePlace(item.id);
    setActiveRegion("all");
    setRegions(item.districts);
  };

  const selectShop = (shop) => {
    setActiveShop(shop);
    setCenter({ lat: +shop.latitude, lng: +shop.longitude });
    setZoom(15);
  };

  useEffect(() => {
    if (places) setAllRegions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  return (
    <div>
      <SectionHead {...shops} noRightSide={!isShopsPage} />

      <div className="divide-y divide-slate-100 flex flex-col gap-[24px]">
        <div className="flex flex-wrap gap-[15px] mt-[24px]">
          <button onClick={setAllRegions} className={`btn btn-${activePlace === "all" ? "active" : "no-active"}`}>
            {t("all")}
          </button>
          {isPlacesLoading || isPlacesRefetching ? (
            <MainLoading />
          ) : (
            places?.map((item) => (
              <button
                key={item.id}
                className={`btn btn-${activePlace === item.id ? "active" : "no-active"}`}
                onClick={() => addRegions(item)}
              >
                {item.title}
              </button>
            ))
          )}
        </div>

        <div className="mt-[24px]">
          <div className="title mt-[24px]">{t("region")}</div>

          <div className="flex flex-wrap gap-[15px] mt-[24px]">
            <button
              onClick={() => setActiveRegion("all")}
              className={`btn btn-${activeRegion === "all" ? "active" : "no-active"}`}
            >
              {t("all")}
            </button>
            {regions?.map((item) => (
              <button
                className={`btn btn-${activeRegion === item.id ? "active" : "no-active"}`}
                key={item.id}
                onClick={() => setActiveRegion(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {isLocationsLoading || isLocationsRefetching ? (
          <MainLoading />
        ) : locations?.length > 0 ? (
          <div className="flex flex-col h-[400px] overflow-auto pr-[10px] custom-scroll gap-[24px]">
            {locations?.map((item) => (
              <div
                key={item.id}
                className={`btn ${
                  activeShop?.id === item.id ? "btn-active" : "btn-no-active"
                } w-[100%] flex extra900:flex-row flex-col justify-between extra900:items-center items-start gap-[15px] cursor-pointer`}
                onClick={() => selectShop(item)}
              >
                <div className="extra900:font-normal font-bold text-[19px]">{item.title}</div>
                <div className="extra900:text-end text-start  w-[100%] flex extra900:flex-row flex-col w-[fit-content] gap-[10px]">
                  <div className="text-[13px] extra900:text-[19px] font-normal">{item.address}</div>
                  <div className="extra900:block hidden">|</div>
                  <div className="extra900:font-normal font-bold text-[19px]">
                    {item.open.substring(0, 5)} - {item.close.substring(0, 5)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col gap-[24px] mt-[24px]">
        <div className="title">{t("map")}</div>
        <Map locations={markers} center={center} zoom={zoom} />
      </div>
    </div>
  );
};

export default Shops;
