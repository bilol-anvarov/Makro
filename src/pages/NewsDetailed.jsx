import SectionHead from "../components/SectionHead/SectionHead";
import { useParams } from "react-router-dom";
import { axiosClient } from "../app/api";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import { useMainContext } from "../context/MainContext";
import { newsById } from "../datas/data";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: "slick-dots slick-thumb",
  arrows: false,
};

const NewsDetailed = () => {
  const { activeLan } = useMainContext();

  const { id } = useParams();
  const { data } = useQuery(
    ["news-detail", id, activeLan],
    async () => {
      const res = await axiosClient().get("/news-detail/" + id + "/");
      return res.data;
    },
    { refetchOnWindowFocus: false }
  );

  const { title, description, created_at, photo_medium: imgUrl, videoURL } = data || {};
  const date = new Date(created_at).toLocaleDateString("ru-RU");

  return (
    <>
      <SectionHead {...newsById} additonalText={date} />
      <div className="flex flex-col mb-10">
        <Slider {...sliderSettings} className="w-[100%]  lg:rounded-[30px]  rounded-[16px] ">
          {imgUrl && (
            <img
              src={imgUrl}
              alt=""
              className="lg:rounded-[30px] rounded-[16px] "
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {videoURL && (
            <video className="w-[100%] min-h-[250px] lg:rounded-[30px]  rounded-[16px] " controls>
              <source src={videoURL} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          )}
        </Slider>

        <div className="lg:hidden text-gray-400 font-bold text-xl my-5">{date}</div>
        <div className="flex flex-col lg:my-10 gap-10">
          <div className="lg:text-3xl font-bold text-xl">{title}</div>
          <div className="lg:text-base text-sm whitespace-pre-wrap">{description}</div>
        </div>
      </div>
    </>
  );
};
export default NewsDetailed;
