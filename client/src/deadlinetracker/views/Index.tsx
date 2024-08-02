import Sidebar from "../components/Sidebar";

export default function index() {
  return (
    <section className="flex">
      <section className="w-[200px]">
        <Sidebar/>
      </section>
      <section>
        This is pages
      </section>
    </section>
  )
}
