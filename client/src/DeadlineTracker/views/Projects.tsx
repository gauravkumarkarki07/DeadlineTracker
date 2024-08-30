import ProjectCard from "../components/ProjectCard"
import ProjectCreateDialog from "../components/ProjectCreateDialog"
import { useGetProjectDetails } from '@/DeadlineTracker/hooks/useProjectQuery'

function Projects() {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails')||'null');
  const { data: projectObject, isLoading } = useGetProjectDetails(Number(userDetails?.id));

  if (isLoading) {
    return <span>Loading ...</span>
  }
  return (
    <section className="px-4 py-4 flex flex-col gap-8">
      <h1>
        Projects
      </h1>
      <section>
        <ProjectCreateDialog />
      </section>
      <section className="w-full flex flex-col gap-4">
        Project Details
        <section className="flex gap-12 flex-wrap">
          <ProjectCard projects={projectObject.projects} />
        </section>
      </section>
    </section>
  )
}

export default Projects