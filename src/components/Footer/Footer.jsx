import logo from "../../assets/logo.svg";
import appstore from "../../assets/appstore.svg";
import youtube from "../../assets/youtube.svg";
import instagram from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.svg";
import telegram from "../../assets/telegram.svg";
import googleplay from "../../assets/googleplay.svg";
import mbTelegram from "../../assets/mb-telegram.svg";
import mbInstagram from "../../assets/mb-instagram.svg";
import mbFacebook from "../../assets/mb-facebook.svg";
import mbYoutube from "../../assets/mb-youtube.svg";
import { useTranslation } from "react-i18next";
import loyaltyFile from "../../assets/files/loyalty.pdf";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="flex py-4 justify-between items-center flex-wrap gap-5 mt-40">
      <a href="#">
        <img src={logo} alt="logo" className="h-[30px] lg:h-[40px]" />
      </a>
      <div className="hidden lg:block">
        <p className="text-lg text-gray-400 text-center mb-4">{t("footer.download")}</p>
        <div className="flex gap-6 items-center justify-center">
          <a href="https://apps.apple.com/uz/app/makro-app/id6443717445">
            <img src={appstore} alt="app store" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.makro.hive_dart&pli=1">
            <img src={googleplay} alt="google play " />
          </a>
        </div>
        <p className="text-lg text-gray-400 text-center mt-3">
          <a href={loyaltyFile} target="_blank" rel="noreferrer" download="Правила программы лояльности">
            {t("footer.download2")}
          </a>
        </p>
      </div>
      <div className="hidden lg:block">
        <p className="text-lg text-gray-400 text-center mb-4">{t("footer.subscribe")}</p>
        <div className="flex items-center justify-between">
          <a href="https://www.youtube.com/@makrosupermarket4102">
            <img src={youtube} alt="youtube" className="h-12" />
          </a>
          <a href="https://www.instagram.com/makro_supermarket/">
            <img src={instagram} alt="instagram" className="h-12" />
          </a>
          <a href="https://www.facebook.com/makromarket.uz?mibextid=LQQJ4d">
            <img src={facebook} alt="facebook" className="h-12" />
          </a>
          <a href="https://t.me/makrosupermarket_uz">
            <img src={telegram} alt="telegram" className="h-12" />
          </a>
        </div>
      </div>
      <div className="flex flex-col lg:hidden justify-center items-center gap-3">
        <div className="flex items-center justify-between w-full">
          <a href="https://www.facebook.com/makromarket.uz?mibextid=LQQJ4d">
            <img src={mbFacebook} alt="mbFacebook" className="h-6" />
          </a>
          <a href="https://www.youtube.com/@makrosupermarket4102">
            <img src={mbYoutube} alt="mbYoutube" className="h-6" />
          </a>
          <a href="https://t.me/makrosupermarket_uz">
            <img src={mbTelegram} alt="mbTelegram" className="h-6" />
          </a>
          <a href="https://www.instagram.com/makro_supermarket/">
            <img src={mbInstagram} alt="mbInstagram" className="h-6" />
          </a>
        </div>
        <div className="flex gap-2">
          <a href="https://apps.apple.com/uz/app/makro-app/id6443717445">
            <img src={appstore} alt="app store" className="w-[60px]" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.makro.hive_dart&pli=1">
            <img src={googleplay} alt="google play " className="w-[60px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
