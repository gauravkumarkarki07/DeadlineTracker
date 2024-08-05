import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function index() {
  return (
    <section className="flex">
      <section className="w-[200px]">
        <Sidebar/>
      </section>
      <section className="px-4 py-4 w-full h-full">
        <Outlet/>
      </section>
    </section>
  )
}
