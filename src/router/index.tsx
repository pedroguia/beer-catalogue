import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { routes } from "../utils/constants/routes";
import List from "../pages/list";
import Detail from "../pages/detail";
import NotFound from "../pages/not-found";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to={routes.LIST} replace />} />
      <Route path={routes.LIST} element={<List />} />
      <Route path={routes.DETAIL} element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
