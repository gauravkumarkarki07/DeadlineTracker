import { Button } from "@/shadcn/components/ui/button";
import { ProjectDetailsForm, useDeleteProject } from "../hooks/useProjectQuery";
import { useNavigate } from "react-router-dom";

interface ProjectCardInterFace {
    projects: ProjectDetailsForm[] | null
}

export default function ProjectCard({ projects }: ProjectCardInterFace) {
    const navigate=useNavigate();

    const { mutateAsync: deletProject } = useDeleteProject();

    if (!projects || projects.length === 0) {
        return <span className="text-sm text-gray-500">No Projects Found</span>;
    }

    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || 'null');

    const handleDelete = async (projectId: number) => {
        await deletProject({accountId:Number(userDetails.id),projectId});
    }

    const navigateToEditPage=(projectId:number)=>{
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
                    <section className="flex px-4 py-4 justify-between drop-shadow-md rounded-lg w-[400px] bg-white" key={index}>
                        <section className="flex flex-col gap-2">
                            <h1 className="text-lg">{project.name}</h1>
                            <p className="text-sm flex gap-2">
                                <span>
                                    {project.description}
                                </span>
                            </p>
                            <span className="flex gap-1 text-sm items-center">
                                <span className="text-gray-500">
                                    Created At :
                                </span>
                                <span className="bg-accentSecondary rounded-md px-2 py-1">
                                        {formattedDate}
                                </span>
                            </span>
                        </section>
                        <section className="flex flex-col gap-2">
                            <Button variant={'warning'} type="button" onClick={()=>navigateToEditPage(project.id)}>Edit</Button>
                            <Button variant={'destructive'} type="button" onClick={()=>handleDelete(project.id)}>Delete</Button>
                        </section>
                    </section>
                );
            })}
        </>
    );
}
