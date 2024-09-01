import { Button } from "@/shadcn/components/ui/button"
import { Calendar } from "@/shadcn/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/shadcn/lib/utils"
import { format, isBefore, startOfToday } from 'date-fns'
import { Control, Controller } from "react-hook-form"
import { TaskDetails } from "../hooks/useTaskQuery"

interface TaskDueDateSelector{
    control:Control<TaskDetails>;
}

function TaskDueDateSelector({ control }:TaskDueDateSelector) {
    const today=startOfToday();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    type="button"
                    className={cn(
                        "w-full justify-start text-left font-normal flex gap-2"
                    )}
                >
                    <CalendarIcon />
                    <Controller
                        name="dueDate"
                        control={control}
                        rules={{
                            required:'Due Date required'
                        }}
                        render={({ field: { value } }) => (
                            <>
                                {value ? format(new Date(value), 'PPP') : <span>Pick a date</span>}
                            </>
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Controller
                    name="dueDate"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, value,onBlur } }) => (
                        <Calendar
                            mode="single"
                            selected={value}
                            onSelect={(date)=>{
                                if(date && !isBefore(date,today)){
                                    onChange(date);
                                    onBlur();
                                }
                            }}
                            initialFocus
                            disabled={(date)=>isBefore(date,today)}
                        />
                    )}
                />
            </PopoverContent>
        </Popover>
    )
}

export default TaskDueDateSelector