import { Button } from "@/shadcn/components/ui/button"
import { Dialog, DialogTrigger } from "@/shadcn/components/ui/dialog"
import { CalendarCog } from 'lucide-react';

function TaskDateFilter() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant={'outline'}>
                    <section className="flex gap-2 items-center">
                        <CalendarCog/>
                        <span>Date Range</span>
                    </section>
                </Button>
            </DialogTrigger>
        </Dialog>
    )
}

export default TaskDateFilter