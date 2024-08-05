import { Button } from "@/shadcn/components/ui/button"
import { Calendar } from "@/shadcn/components/ui/calendar";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription, DialogTrigger } from "@/shadcn/components/ui/dialog"
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Popover } from "@/shadcn/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon, Plus } from 'lucide-react';
import { useState } from "react";
import { format } from "date-fns";

function TaskPopUp() {
    const [date, setDate] = useState<Date | undefined>();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <section className="flex gap-2">
                        <Plus />
                        Add Task
                    </section>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Task
                    </DialogTitle>
                    <DialogDescription>
                        Create a task to track it's deadline
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4">
                    <section className="flex flex-col gap-2">
                        <Label>Task Name</Label>
                        <Input />
                    </section>
                    <section className="flex flex-col gap-2">
                        <Label>Deadline Date</Label>
                        <Popover>
                            <PopoverTrigger>
                                <Button
                                    variant={'outline'}
                                    type="button"
                                    className={date ? "text-black w-full" : "text-gray-500 w-full"}
                                >
                                    {
                                        date ? (
                                            format(date, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )
                                    }
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    disabled={(date) => {
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        return date < today;
                                    }}
                                    className="bg-white rounded-md"
                                />
                            </PopoverContent>
                        </Popover>
                    </section>

                    <Button>
                        Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TaskPopUp