import { Button } from "@/shadcn/components/ui/button";
import {
    DropdownMenuItem, DropdownMenu,
    DropdownMenuContent, DropdownMenuTrigger
} from "@/shadcn/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { Control, Controller } from "react-hook-form";
import { TaskDetails } from "../hooks/useTaskQuery";

interface TaskEditStatusDropdown {
    control: Control<TaskDetails>;
}

const statusOptions = ["PENDING", "COMPLETED"];

function TaskEditStatusDropdown({ control }: TaskEditStatusDropdown) {
    
    const getStatusColor=(status:string):string=>{
        switch(status){
            case 'PENDING':
                return 'text-yellow-500'
            case 'COMPLETED':
                return 'text-green-500'
            default:
                return 'text-gray-500'
        }
    }
    return (
        <Controller
            name="status"
            control={control}
            rules={{
                required:'Status is required'
            }}
            render={({ field: { value, onChange } }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button type="button" variant={'outline'}>
                            <section className="flex gap-2 items-center w-full justify-between">
                                <span className={`${getStatusColor(value)}`}>{value}</span>
                                <ChevronDown />
                            </section>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {statusOptions.map((status) => (
                            <DropdownMenuItem
                                key={status}
                                onClick={() => onChange(status)}
                            >
                                <span className={`${getStatusColor(status)}`}>
                                    {status}
                                </span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        />
    );
}

export default TaskEditStatusDropdown;
