import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Header />
      <div className="mt-20 py-2">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
