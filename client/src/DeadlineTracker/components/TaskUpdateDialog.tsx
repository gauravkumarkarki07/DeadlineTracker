import { Button } from "@/shadcn/components/ui/button"
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter
    , DialogTitle, DialogTrigger
} from "@/shadcn/components/ui/dialog"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { Textarea } from "@/shadcn/components/ui/textarea"
import TaskDueDateSelector from "./TaskDueDateSelector"
import { useForm } from "react-hook-form"
import { TaskDetails, useGetTaskDetailsById, useUpdateTask } from "../hooks/useTaskQuery"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {FilePenLine } from "lucide-react"

function TaskUpdateDialog({deadlineId}:{deadlineId:number}) {
    const { projectId } = useParams();
    const projectIdNumber = Number(projectId);
    const{data:taskById}=useGetTaskDetailsById(deadlineId,projectIdNumber);
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<TaskDetails>();
    const { mutateAsync: handleTaskUpdate } = useUpdateTask();
    const [isOpen, setIsOpen] = useState(false);

    const updateTask = async (updatedData: TaskDetails) => {
        await handleTaskUpdate({ deadlineId,projectId: projectIdNumber, data:updatedData });
        reset();
        setIsOpen(false);
    }

    useEffect(()=>{
        if(taskById){
            reset(taskById);
        }
    },[taskById,reset])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type="button">
                    <FilePenLine/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Task</DialogTitle>
                <DialogDescription>
                    Update Task Details.
                </DialogDescription>
                <form className="flex flex-col gap-6" onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit(updateTask)();
                }}>
                    <section className="flex flex-col gap-2">
                        <Label>Title *</Label>
                        <Input
                            {...register('title', { required: "Title is required" })}
                        />
                        {errors.title && <span className='text-sm text-red-500'>{errors.title.message}</span>}
                    </section>
                    <section className="flex flex-col gap-2">
                        <Label>Description (optional)</Label>
                        <Textarea
                            className="resize-none"
                            {...register('description')}
                        />
                    </section>
                    <section className="flex flex-col gap-2">
                        <Label>Due Date *</Label>
                        <TaskDueDateSelector control={control} />
                        {errors.dueDate && <span className='text-sm text-red-500'>{errors.dueDate.message}</span>}
                    </section>
                    <DialogFooter>
                        <section className="flex items-center justify-between w-full">
                            <DialogClose asChild>
                                <Button type="button" variant={'destructive'}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" variant={'warning'}>Update</Button>
                        </section>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TaskUpdateDialog;
