import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function Index() {
  return (
    <section className="flex">
      <section>
        <Sidebar />
      </section>
      <section>
        <Outlet />
      </section>
    </section>
  )
}

export default Index