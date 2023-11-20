import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import burgerIcon from "../../assets/burger.svg";
import closeIcon from "../../assets/close.svg";
import macroInidactor from "../../assets/macroIndicator.svg";
import macroTextIcon from "../../assets/macro.svg";
import newsIcon from "../../assets/news.svg";
import actionsIcon from "../../assets/actions.svg";
import catalogIcon from "../../assets/catalog.svg";
import shopsIcon from "../../assets/shops.svg";
import contactsIcon from "../../assets/contacts.svg";
import workIcon from "../../assets/work.svg";
import uzIcon from "../../assets/lan/uz.svg";
import ruIcon from "../../assets/lan/ru.svg";
import { useEffect, useState } from "react";
import leftIcon from "../../assets/left.svg";
import { useMainContext } from "../../context/MainContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { activeLan, changeLan } = useMainContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openLan, setOpenLan] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { t } = useTranslation();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleClickOpen = () => setOpenLan(!openLan);
  const selectLan = (val) => {
    changeLan(val);
    handleClickOpen();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { to: "news", icon: newsIcon },
    { to: "promotions", icon: actionsIcon },
    { to: "products", icon: catalogIcon },
    { to: "shops", icon: shopsIcon },
    { to: "contacts", icon: contactsIcon },
    {
      to: "https://t.me/makro_hr_bot",
      icon: workIcon,
      bot: true,
    },
  ];

  return (
    <div className="flex flex-row justify-between items-center pt-1  sticky top-0 z-10 px-5">
      {mobileMenuOpen && <div className="fixed top-0 left-0 w-full h-screen bg-white z-1"></div>}
      <div className="hidden lg:flex lg:flex-row p-5 rounded-[100px] bg-[#F5F5F5]/[0.5] backdrop-blur-3xl h-full">
        <Link to="/">
          <img src={logo} alt="logo" className="h-[40px]" />
        </Link>
      </div>
      <Link to="/">
        <div className="lg:hidden flex flex-row items-center h-[40px] rounded-[100px] bg-[#F5F5F5]/[0.5] backdrop-blur-3xl p-3 gap-3">
          <img src={macroInidactor} alt="logo" className="w-6" />
          <img src={macroTextIcon} alt="logo" className="w-[54px] mb-1" />
        </div>
      </Link>

      <div className="flex items-center gap-[20px]">
        <div className="relative block lg:hidden">
          <button
            type="button"
            className="relative w-[55px] h-[55px] cursor-default rounded-full bg-white flex justify-center items-center text-left text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={handleClickOpen}
          >
            <span className="flex items-center">
              {activeLan === "uz" ? (
                <span className="font-normal block truncate">
                  <img src={uzIcon} alt="" />
                </span>
              ) : (
                <span className="font-normal block truncate">
                  <img src={ruIcon} alt="" />
                </span>
              )}
            </span>
          </button>

          {openLan && (
            <ul
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <li
                className="text-gray-900 relative cursor-default select-none py-2 hover:bg-slate-100 cursor-pointer"
                id="listbox-option-0"
                role="option"
                onClick={() => selectLan("uz")}
              >
                <div className="flex items-center">
                  <span className="font-normal ml-3 block truncate">
                    <img src={uzIcon} alt="" />
                  </span>
                </div>
              </li>
              <li
                className="text-gray-900 relative cursor-default select-none py-2 hover:bg-slate-100 cursor-pointer"
                id="listbox-option-0"
                role="option"
                onClick={() => selectLan("ru")}
              >
                <div className="flex items-center">
                  <span className="font-normal ml-3 block truncate">
                    <img src={ruIcon} alt="" />
                  </span>
                </div>
              </li>
            </ul>
          )}
        </div>

        <button className="lg:hidden z-10" id="burger" onClick={toggleMobileMenu}>
          <img src={mobileMenuOpen ? closeIcon : burgerIcon} alt="burgerIcon" className="h-[50px]" />
        </button>
      </div>
      <ul className={`${mobileMenuOpen ? "block" : "hidden"} lg:hidden absolute top-16 left-0 right-0 z-10  px-5`}>
        {menuItems.map((item, index) => (
          <li key={index} className="my-2 bg-[#F5F5F5]/[0.5] backdrop-blur-3xl p-5 rounded-[20px]  ">
            {item.to.includes("http") ? (
              <a href={item.to} className="flex items-center gap-3" target="_blank" rel="noreferrer">
                <img src={item.icon} alt={`bot Icon`} className="h-6 mr-2" />
                {t(`navbar.menus.bot`)}
              </a>
            ) : (
              <Link to={item.to} onClick={toggleMobileMenu} className="flex items-center gap-3">
                <img src={item.icon} alt={`${item.to} Icon`} className="h-6 mr-2" />
                {t(`navbar.menus.${[item.to]}`)}
              </Link>
            )}
          </li>
        ))}

        {/* <li
          key={"settings"}
          className="my-2 bg-[#F5F5F5]/[0.5] backdrop-blur-3xl p-5 rounded-[20px] sticky bottom-0 "
        >
          <a
            href={"https://www.makro.uz/settings"}
            onClick={toggleMobileMenu}
            className="flex items-center justify-center gap-3"
          >
            <img src={settingsIcon} alt="settings Icon" className="h-6 mr-2" />
            Полный сайт в разработке
          </a>
        </li> */}
      </ul>

      <ul className="hidden lg:flex lg:flex-row xl:text-xl lg:text-l justify-center items-center min-h-[80px] p-5 rounded-[100px] bg-[#F5F5F5]/[0.5] backdrop-blur-3xl">
        {menuItems.map((item, index) =>
          item?.bot ? (
            <a href={item.to} className="flex items-center gap-3" target="_blank" rel="noreferrer" key={index}>
              <li className="mx-4">{t(`navbar.menus.bot`)}</li>
            </a>
          ) : (
            <Link key={index} to={item.to}>
              <li className="mx-4">{t(`navbar.menus.${[item.to]}`)}</li>
            </Link>
          )
        )}

        <div className="relative">
          <button
            type="button"
            className="relative w-[55px] h-[55px] cursor-default rounded-full bg-white flex justify-center items-center text-left text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={handleClickOpen}
          >
            <span className="flex items-center">
              {activeLan === "uz" ? (
                <span className="font-normal block truncate">
                  <img src={uzIcon} alt="" />
                </span>
              ) : (
                <span className="font-normal block truncate">
                  <img src={ruIcon} alt="" />
                </span>
              )}
            </span>
          </button>

          {openLan && (
            <ul
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <li
                className="text-gray-900 relative cursor-default select-none py-2 hover:bg-slate-100 cursor-pointer"
                id="listbox-option-0"
                role="option"
                onClick={() => selectLan("uz")}
              >
                <div className="flex items-center">
                  <span className="font-normal ml-3 block truncate">
                    <img src={uzIcon} alt="" />
                  </span>
                </div>
              </li>
              <li
                className="text-gray-900 relative cursor-default select-none py-2 hover:bg-slate-100 cursor-pointer"
                id="listbox-option-0"
                role="option"
                onClick={() => selectLan("ru")}
              >
                <div className="flex items-center">
                  <span className="font-normal ml-3 block truncate">
                    <img src={ruIcon} alt="" />
                  </span>
                </div>
              </li>
            </ul>
          )}
        </div>

        {/* <a key={"user"} href="https://www.makro.uz/settings">
          <img src={userIcon} alt="userIcon" className=" mx-4 h-[40px]" />
        </a> */}
      </ul>
      {isScrolled && (
        <button
          className="fixed bottom-5 right-5 z-50 bg-[#F5F5F580] backdrop-blur-3xl text-white px-5 py-2 rounded-full flex justify-center items-center lg:w-[80px] lg:h-[80px] w-16 h-16"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={leftIcon} alt="" className="width-[19px] rotate-90 " />
        </button>
      )}
    </div>
  );
};

export default Navbar;
