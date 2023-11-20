import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { sliderSettings } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

const NewsItem = ({ title, description, created_at, photo_small: imgUrl, videoURL, id }) => {
  const date = new Date(created_at).toLocaleDateString("ru-RU");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10 my-6 justify-center ">
        <Slider {...sliderSettings} className="w-[100%] h-[100%] lg:min-w-[350px] lg:max-w-[350px] lg:h-[310px]">
          {imgUrl && (
            <img
              src={imgUrl}
              alt=""
              className="rounded-[40px] w-[100%] lg:w-[350px] lg:h-[310px] h-[100%] lg:min-h-[200px]"
            />
          )}
          {videoURL && (
            <video className="rounded-[40px] lg:w-full lg:h-[310px] min-h-[200px]" controls>
              <source src={videoURL} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          )}
        </Slider>
        <div className="flex flex-col h-auto w-full gap-5">
          <div className="flex flex-col  w-full h-full justify-center lg:gap-2.5 gap-5">
            <div className="lg:text-2xl text-lg font-semibold flex justify-between items-center flex-wrap ">
              {truncate(title, 150)}
              <div className="lg:hidden font-normal text-[#808080]">{date}</div>
            </div>
            <div className="text-base">{truncate(description, 500)}</div>
          </div>
          <div className="flex gap-6 items-center justify-self-end mt-auto">
            <button
              className="lg:text-xl text-base px-[70px] py-[19px]  rounded-[20px] bg-[#77d256] text-white active:bg-[#6cb84c] lg:max-w-fit w-full"
              onClick={() => navigate(`/news/${id}`, "_self")}
            >
              {t("view")}
            </button>
            <div className="lg:block hidden text-[#808080] text-xl">{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
