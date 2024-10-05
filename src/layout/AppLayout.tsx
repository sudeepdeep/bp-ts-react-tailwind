import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-[100vh] text-white font-poppins h-auto bg-[#000000]">
      <Outlet />
    </div>
  );
}

export default AppLayout;
