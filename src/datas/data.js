import actionsIcon from "../assets/actions.svg";
import cartIcon from "../assets/cart.svg";
import mapIcon from "../assets/map.svg";
import newsIcons from "../assets/news.svg";
import bookIcon from "../assets/book.svg";
import documentIcon from "../assets/document.svg";

// contact
import phoneIcon from "../assets/phone.svg";
import phoneComingIcon from "../assets/phoneComing.svg";
import facebookIcon from "../assets/mb-facebook.svg";
import instagramIcon from "../assets/mb-instagram.svg";
import telegramIcon from "../assets/mb-telegram.svg";
import locationIcon from "../assets/location.svg";

export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const homePromotions = {
  textKey: "home.promotions",
  icon: actionsIcon,
  link: "/promotions",
};

export const promotions = {
  textKey: "promotions",
  icon: actionsIcon,
  link: "/",
  backwardIcon: true,
};

export const homeProducts = {
  textKey: "home.products",
  icon: cartIcon,
  link: "/products",
  additionMargin: true,
};

export const products = {
  textKey: "products",
  icon: cartIcon,
  link: "/",
  additionMargin: true,
  backwardIcon: true,
};

export const homeShops = {
  textKey: "home.shops",
  icon: mapIcon,
};

export const shops = {
  textKey: "shops",
  icon: mapIcon,
  link: "/",
  backwardIcon: true,
};

export const news = {
  textKey: "news",
  icon: newsIcons,
  link: "/",
};

export const newsById = {
  textKey: "news",
  icon: newsIcons,
  link: "/",
  backwardIcon: true,
  additonalText: "24.08.2023",
};

export const promotionsById = {
  textKey: "promotionsById",
  additonalText: "",
  icon: bookIcon,
  link: "/promotions",
};

export const offers = {
  textKey: "offers",
  icon: documentIcon,
  noRightSide: true,
};

export const contactData = [
  {
    textKey: "phone",
    icon: phoneIcon,
    href: "tel:+998712051205",
  },
  {
    textKey: "address",
    icon: locationIcon,
    href: "https://www.google.ru/maps/place/Makro/@41.3039528,69.3224254,19z/data=!4m9!1m2!2m1!1z0JDQtNGA0LXRgSDQs9C-0LvQvtCy0L3QvtCz0L4g0L7RhNC40YHQsDog0LMuINCi0LDRiNC60LXQvdGCLCDQr9GI0L3QsNCx0LDQtNGB0LrQuNC5INGALdC9LCDRg9C7LiDQnNCw0YXRgtGD0LzQutGD0LvQuCAxMzQ!3m5!1s0x38aef5863a70e74b:0x89e254172dbce3e3!8m2!3d41.3044146!4d69.3222592!16s%2Fg%2F11nxxq0jd4?entry=ttu",
  },
  {
    textKey: "phoneTelegram",
    icon: phoneComingIcon,
    href: "https://t.me/Makrosupermarket",
  },
  {
    textKey: "telegram",
    icon: telegramIcon,
    href: "https://t.me/makrosupermarket_uz",
  },
  {
    textKey: "instagram",
    icon: instagramIcon,
    href: "https://instagram.com/makro_supermarket/",
  },
  {
    textKey: "meta",
    icon: facebookIcon,
    href: "https://fb.com/makromarket.uz",
  },
];
