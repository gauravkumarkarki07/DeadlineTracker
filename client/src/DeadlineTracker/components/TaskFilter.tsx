import { Button } from "@/shadcn/components/ui/button"
import { Dialog, DialogTrigger } from "@/shadcn/components/ui/dialog"
import { ListFilter } from 'lucide-react';

function TaskFilter() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant={'outline'}>
                    <section className="flex gap-2 items-center">
                        <ListFilter/>
                        <span>Filter</span>
                    </section>
                </Button>
            </DialogTrigger>
        </Dialog>
    )
}

export default TaskFilter