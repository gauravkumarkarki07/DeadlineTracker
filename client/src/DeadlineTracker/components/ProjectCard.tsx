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
        return <span>No Projects Found</span>;
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
                    <section className="flex px-4 py-4 justify-between border rounded-md w-[400px]" key={index}>
                        <section className="flex flex-col gap-2">
                            <h1 className="text-xl">{project.name}</h1>
                            <p className="text-sm flex gap-2">
                                <span>Description:</span>
                                {project.description}
                            </p>
                            <span className="flex gap-2 text-sm">
                                <span>Created Date:</span>
                                {formattedDate}
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
