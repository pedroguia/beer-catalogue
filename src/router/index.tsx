import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../utils/constants/routes";
import List from "../pages/list";
import Detail from "../pages/detail";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<List />} />
        <Route path={routes.LIST} element={<List />} />
        <Route path={routes.DETAIL} element={<Detail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
