import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function Index() {
  return (
    <section className="flex">
      <section>
        <Sidebar />
      </section>
      <section className="w-full">
        <Outlet />
      </section>
    </section>
  )
}

export default Index