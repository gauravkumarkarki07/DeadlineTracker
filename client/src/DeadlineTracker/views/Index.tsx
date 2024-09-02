import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function Index() {
  return (
    <section className="flex min-h-screen">
      <section>
        <Sidebar />
      </section>
      <section className="w-full">
        {/* <Header/> */}
        <section className="bg-tertiary/5 py-4 px-4 h-full">
          <Outlet/>
        </section>
      </section>
    </section>
  )
}

export default Index