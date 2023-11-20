import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import ShopsPage from "./pages/ShopsPage";
import Layout from "./Layout";
import Contacts from "./pages/Contacts";
import News from "./pages/News";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsPage from "./pages/ProductsPage";
import NewsDetailed from "./pages/NewsDetailed";
import PromotionsPage from "./pages/PromotionsPage";
import PromotionById from "./components/PromotionById";
import { MainContextProvider } from "./context/MainContext";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/shops",
        element: <ShopsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/news",
        element: <News />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/news/:id",
        element: <NewsDetailed />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/promotions",
        element: <PromotionsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/promotions/:id",
        element: <PromotionById />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <div className="main-container">
      <div className="main-wrapper">
        <QueryClientProvider client={queryClient}>
          <MainContextProvider>
            <RouterProvider router={router} />
          </MainContextProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
