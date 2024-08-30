import { Button } from "@/shadcn/components/ui/button"
import {
    DropdownMenuItem, DropdownMenu,
    DropdownMenuContent, DropdownMenuTrigger
} from "@/shadcn/components/ui/dropdown-menu"

import { ChevronDown } from 'lucide-react';

function TaskStatusDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant={'outline'}>
                    <section className="flex gap-2 items-center">
                        <span>Sort By</span>
                        <ChevronDown/>
                    </section>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>OverDue</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TaskStatusDropdown