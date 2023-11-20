import contactIcon from "../assets/contacts.svg";
import macroBuilding from "../assets/contact/img.jpg";
import leftIcon from "../assets/left.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { contactData } from "../datas/data";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="lg:hidden flex items-center justify-between my-10 mx-5">
        <div className="flex items-end gap-3 text-lg lg:text-3xl font-bold">
          <img src={contactIcon} alt="icon" className="h-[24px] lg:h-[30px]" />
          {t("contact.title")}
        </div>
        <Link to={"/"}>
          <div className="flex items-center">
            <span className="text-3xl ml-2">
              <img src={leftIcon} alt="" className="width-[19px] " />
            </span>
          </div>
        </Link>
      </div>
      <div className="flex justify-between lg:pl-[30px] lg:my-10 gap-6 lg:flex-row flex-col-reverse">
        <div>
          <div className="hidden lg:flex items-end gap-3 text-lg lg:text-3xl font-bold">
            <img src={contactIcon} alt="icon" className="h-[24px] lg:h-[30px] mb-0.5" />
            {t("contact.title")}
          </div>
          <ul className="flex flex-col gap-10 lg:my-16 my-5 w-full -ml-1.5">
            {contactData.map((menuItem, index) => (
              <li key={index}>
                <a href={menuItem.href} className="text-[#000] font-semibold flex items-center ">
                  <div className="flex items-center justify-center rounded-full min-w-[40px] min-h-[40px] bg-[#F5F5F5] md:mr-10 mr-3">
                    <img src={menuItem.icon} alt="icon" className="h-6 w-6 inline-block" />
                  </div>
                  <span className="md:text-lg text-xs">{t(`contact.${menuItem.textKey}`)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-3/5 rounded-[30px] overflow-hidden">
          <img src={macroBuilding} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </>
  );
};

export default Contact;
