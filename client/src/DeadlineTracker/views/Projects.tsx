import ProjectCreateDialog from "../components/ProjectCreateDialog"

function Projects() {
  return (
    <section className="px-4 py-4 flex flex-col gap-8">
      <h1>
        Projects
      </h1>
      <section>
        <ProjectCreateDialog/>
      </section>
      <section>
        Project Details
      </section>
    </section>
  )
}

export default Projects