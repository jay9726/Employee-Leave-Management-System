import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Slider from "@/components/admin-slider";

const DepartmentLayout = () => {

  return (
    <>
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">

        <Slider />

        <main className="flex-1 overflow-y-auto p-4 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DepartmentLayout;
