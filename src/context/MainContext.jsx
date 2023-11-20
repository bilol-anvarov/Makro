import i18next from "i18next";
import { createContext, useContext, useState } from "react";

const MainContext = createContext({});

export function MainContextProvider({ children }) {
  const [activeLan, setActiveLan] = useState(localStorage.getItem("i18nextLng") || "uz");

  const changeLan = (language) => {
    setActiveLan(language);
    i18next.changeLanguage(language);
  };

  const values = {
    activeLan,
    changeLan,
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMainContext() {
  return useContext(MainContext);
}
