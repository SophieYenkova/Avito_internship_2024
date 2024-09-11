import { Routes, Route } from "react-router-dom";
import AdsPage from "../pages/AdsPage/AdsPage";
import OneAdPage from "../pages/OneAdPage/OneAdPage";
import LayoutWithRoutes from "../entities/LayoutWithRoutes/LayoutWithRoutes";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithRoutes />}>
        <Route index element={<AdsPage />} />
        <Route path="advertisements" element={<AdsPage />} />
        <Route path="advertisements/:id" element={<OneAdPage />} />
      </Route>
    </Routes>
  );
};

export default App;
