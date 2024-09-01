import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shadcn/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"

interface ProjectCardActionButtonDropdown{
    onEdit:()=>void;
    onDelete:()=>void;
}

function ProjectCardActionButtonDropdown({onEdit,onDelete}:ProjectCardActionButtonDropdown) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={onEdit}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onDelete}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProjectCardActionButtonDropdown