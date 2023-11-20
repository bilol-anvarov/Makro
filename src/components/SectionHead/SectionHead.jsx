import { Link } from "react-router-dom";
import rightIcon from "../../assets/right.svg";
import leftIcon from "../../assets/left.svg";
import { useTranslation } from "react-i18next";

const SectionHead = ({ textKey, icon, link, backwardIcon, additonalText, noRightSide, additionMargin }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between sm:my-6 my-5 sm:mt-10 mt-5 mx-5">
      <div className="flex items-end gap-3 text-lg lg:text-3xl font-bold">
        <img src={icon} alt="icon" className={`h-[24px] lg:h-[30px] mb-0.5 ${additionMargin ? "mb-[2px]" : ""}`} />
        {t(`${textKey}.title`)}
        <span className="lg:inline hidden text-gray-400 text-base lg:text-2xl ml-2">{additonalText}</span>
      </div>
      {!noRightSide && (
        <Link to={link}>
          <div className="flex items-center">
            <span className="hidden text-xl lg:inline">{t(`${textKey}.linkText`)}</span>
            <span className="text-3xl ml-2 flex">
              {backwardIcon ? (
                <img src={leftIcon} alt="" className="width-[19px] " />
              ) : (
                <img src={rightIcon} alt="" className="width-[19px]" />
              )}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};
export default SectionHead;
