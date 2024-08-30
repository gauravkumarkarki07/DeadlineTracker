import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ProjectDetailsForm, useGetProjectDetailById, useUpdateProject } from "../hooks/useProjectQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import TaskTable from "./TaskTable";

function ProjectEditPage() {
    const navigate=useNavigate();
    const { projectId } = useParams();
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || 'null');
    const { data: projectDetailsById, isLoading } = useGetProjectDetailById(Number(userDetails.id), Number(projectId));
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectDetailsForm>();

    const { mutateAsync: update } = useUpdateProject();

    const updateProject = async (updatedData: ProjectDetailsForm) => {
        await update({ accountId: Number(userDetails.id), projectId: Number(projectId), updatedData });
    };

    useEffect(() => {
        if (projectDetailsById) {
            reset(projectDetailsById)
        }
    }, [projectDetailsById, reset])

    if (isLoading) {
        return <span>Loading...</span>;
    }

    const goBack=()=>{
        navigate('/deadline-tracker/projects');
    }

    return (
        <section className="flex flex-col px-4 py-4 gap-8">
            <h1 className="text-xl">Project Details</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(updateProject)}>
                <section className='flex flex-col gap-2'>
                    <Label>Project Name</Label>
                    <Input {...register('name', { required: true })} />
                    {errors.name && <span className='text-sm text-red-500'>Project Name is required</span>}
                </section>
                <section className='flex flex-col gap-2'>
                    <Label>Description</Label>
                    <Textarea className='resize-none' {...register('description')} />
                </section>
                <section>
                    <TaskTable/>
                </section>
                <section className="flex justify-between w-full">
                    <Button variant={'secondary'} type="button" onClick={goBack}>Go Back</Button>
                    <Button variant={'warning'} type="submit">Update Project</Button>
                </section>
            </form>
        </section>
    );
}

export default ProjectEditPage;
