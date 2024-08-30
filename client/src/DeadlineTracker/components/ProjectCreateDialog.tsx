import { Button } from '@/shadcn/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogTitle, DialogClose, DialogDescription } from '@/shadcn/components/ui/dialog'
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { Textarea } from '@/shadcn/components/ui/textarea'
import { useForm } from 'react-hook-form';
import { ProjectDetailsForm, useCreateProject } from '../hooks/useProjectQuery'
import { useState } from 'react'

function ProjectCreateDialog() {
    const { register, handleSubmit, formState: { errors } } = useForm<ProjectDetailsForm>();
    const { mutateAsync: create,reset} = useCreateProject();
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || 'null');
    const[isOpen,setOpen]=useState(false);

    const createProject = async (data: ProjectDetailsForm) => {
        await create({ accountId: Number(userDetails?.id), data })
        reset();
        setOpen(false);        
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Project</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Project Details</DialogTitle>
                <DialogDescription>
                    Add project name and optional description.
                </DialogDescription>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit(createProject)}>
                    <section className='flex flex-col gap-2'>
                        <Label>Project Name</Label>
                        <Input {...register('name', { required: true })} />
                        {errors.name && <span className='text-sm text-red-500'>Project Name is required</span>}
                    </section>
                    <section className='flex flex-col gap-2'>
                        <Label>Description</Label>
                        <Textarea className='resize-none' {...register('description')} />
                    </section>
                    <DialogFooter>
                        <section className="flex justify-between w-full">
                            <DialogClose asChild>
                                <Button variant={'destructive'} type="button">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create Project</Button>
                        </section>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ProjectCreateDialog
