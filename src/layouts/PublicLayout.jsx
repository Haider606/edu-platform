import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function PublicLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050508] text-white">
      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}