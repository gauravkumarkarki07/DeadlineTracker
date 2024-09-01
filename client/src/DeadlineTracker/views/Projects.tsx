import ProjectCard from "../components/ProjectCard"
import ProjectCreateDialog from "../components/ProjectCreateDialog"
import { useGetProjectDetails } from '@/DeadlineTracker/hooks/useProjectQuery'

function Projects() {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || 'null');
  const { data: projectObject, isLoading } = useGetProjectDetails(Number(userDetails?.id));

  if (isLoading) {
    return <span>Loading ...</span>
  }
  return (
    <section className="flex flex-col gap-8">
      <article className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold">
          Projects
        </h1>
        <span className="text-sm text-gray-500">
          Manage your project to track its tasks and deadlines
        </span>
      </article>
      <section>
        <ProjectCreateDialog />
      </section>
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-base font-semibold">Project Details</h2>
        <section className="flex gap-12 flex-wrap">
          <ProjectCard projects={projectObject.projects} />
        </section>
      </section>
    </section>
  )
}

export default Projects