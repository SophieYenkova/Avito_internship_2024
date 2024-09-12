import { Routes, Route } from "react-router-dom";
import AdsPage from "../pages/AdsPage/AdsPage";
import OneAdPage from "../pages/OneAdPage/OneAdPage";
import LayoutWithRoutes from "../components/LayoutWithRoutes/LayoutWithRoutes";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import OneOrderPage from "../pages/OneOrderPage/OneOrderPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithRoutes />}>
        <Route index element={<AdsPage />} />
        <Route path="advertisements" element={<AdsPage />} />
        <Route path="advertisements/:id" element={<OneAdPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OneOrderPage />} />
      </Route>
    </Routes>
  );
};

export default App;
