import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import FilterPage from "../pages/FilterPage";
import ItemDetailsPage from "../pages/ItemDetailsPage";
import ListPage from "../pages/ListPage";
import StatsPage from "../pages/StatsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />

          <Route path="/orders" element={<ListPage />} />
          <Route path="/orders/:id" element={<ItemDetailsPage />} />

          <Route path="/filter" element={<FilterPage />} />
          <Route path="/stats" element={<StatsPage />} />

          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
