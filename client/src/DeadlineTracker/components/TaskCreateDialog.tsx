import { Button } from "@/shadcn/components/ui/button"
import {
    Dialog, DialogContent, DialogDescription, DialogFooter
    , DialogTitle, DialogTrigger
} from "@/shadcn/components/ui/dialog"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { Textarea } from "@/shadcn/components/ui/textarea"
import TaskDueDateSelector from "./TaskDueDateSelector"
import { useForm } from "react-hook-form"
import { TaskDetails } from "../hooks/useTaskQuery"

function TaskCreateDialog() {
    const { register, handleSubmit,control, formState: { errors } } = useForm<TaskDetails>();

    const createTask = (data: TaskDetails) => {
        console.log(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant={'outline'}>
                    <section className="flex gap-2 items-center">
                        <span>Add New Task</span>
                    </section>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Task</DialogTitle>
                <DialogDescription>
                    Add Task title and optional description.
                </DialogDescription>
                <form className="flex flex-col gap-6" onSubmit={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit(createTask)();
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
                        <TaskDueDateSelector control={control}/>
                        {errors.dueDate && <span className='text-sm text-red-500'>{errors.dueDate.message}</span>}
                    </section>
                    <DialogFooter>
                        <section className="flex items-center justify-between w-full">
                            <Button type="button" variant={'destructive'}>Cancel</Button>
                            <Button type="submit" variant={'primary'}>Save</Button>
                        </section>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TaskCreateDialog;
