import TaskPopUp from "../components/TaskPopUp";

export default function Index() {
  return (
   <section className="flex flex-col border px-2 py-2 rounded-md">
    <section className="flex justify-between">
      <h1 className="text-3xl">All Task</h1>
      <TaskPopUp/>
    </section>
   </section>
  )
}
