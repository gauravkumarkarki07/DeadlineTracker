import UpcommingDeadlines from "@/DeadlineTracker/components/DashboardComponent/UpcommingDeadlines"

function Dashboard() {
  return (
    <section className="flex flex-col gap-4">
      <article className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <span className="text-sm text-gray-500">Overview of your projects and deadlines</span>
      </article>
      <section className="flex">
      <UpcommingDeadlines/>
      </section>
    </section>
  )
}

export default Dashboard