import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function Index() {
  return (
    <section className="flex">
      <section className="max-w-[20%]">
        <Sidebar />
      </section>
        <Outlet />
    </section>
  )
}

export default Index