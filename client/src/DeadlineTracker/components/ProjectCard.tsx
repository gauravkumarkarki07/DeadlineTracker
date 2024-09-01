import { ProjectDetailsForm, useDeleteProject } from "../hooks/useProjectQuery";
import { useNavigate } from "react-router-dom";
import ProjectCardActionButtonDropdown from "./ProjectCardActionButtonDropdown";

interface ProjectCardInterFace {
    projects: ProjectDetailsForm[] | null
}

export default function ProjectCard({ projects }: ProjectCardInterFace) {

    const navigate = useNavigate();

    const { mutateAsync: deletProject } = useDeleteProject();

    if (!projects || projects.length === 0) {
        return <span className="text-sm text-gray-500">No Projects Found</span>;
    }

    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || 'null');

    const handleDelete = async (projectId: number) => {
        await deletProject({ accountId: Number(userDetails.id), projectId });
    }

    const navigateToEditPage = (projectId: number) => {
        navigate(`/deadline-tracker/projects/${projectId}`)
    }


    return (
        <>
            {projects.map((project, index) => {
                const date = new Date(project.createdAt);
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                return (
                    <section className="flex px-4 py-4 justify-between drop-shadow-md rounded-lg w-[400px] h-[140px] bg-white" key={index}>
                        <section className="flex flex-col gap-4 max-w-[300px]">
                            <h1 className="text-base font-semibold truncate whitespace-nowrap overflow-hidden text-ellipsis">
                                {project.name}
                            </h1>
                            <p className="text-sm flex gap-2 text-gray-500 max-h-[100px]">
                                <span className="overflow-hidden text-ellipsis">
                                    {project.description}
                                </span>
                            </p>
                            <span className="flex gap-1 text-xs items-center bottom-2 absolute">
                                <span className="text-secondary px-2 py-1 bg-secondary/20 rounded-md">
                                    Created At : {formattedDate}
                                </span>
                            </span>
                        </section>
                        <section>
                            <ProjectCardActionButtonDropdown
                                onEdit={() => navigateToEditPage(project.id)}
                                onDelete={() => handleDelete(project.id)}
                            />
                        </section>
                    </section>
                );
            })}
        </>
    );
}
