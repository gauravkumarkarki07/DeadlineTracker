import { Button } from "@/shadcn/components/ui/button"
import { Trash2,FilePenLine } from 'lucide-react';
import TaskStatusDropdown from "./TaskStatusDropdown";
import TaskDateFilter from "./TaskDateFilter";
import TaskFilter from "./TaskFilter";
import TaskCreateDialog from "./TaskCreateDialog";

function TaskTable() {
    return (
        <section className="flex flex-col gap-4 px-2 py-2 border rounded-md w-full">
            <section className="flex flex-col gap-2">
                <h2 className="text-xl border-b pb-6 mb-2">Tasks</h2>
                <section className="flex justify-between items-center">
                    <TaskStatusDropdown/>
                    <section className="flex gap-4 items-center">
                        <TaskDateFilter/>
                        <TaskFilter/>
                        <TaskCreateDialog/>
                    </section>
                </section>
            </section>
            <table className="text-sm text-left w-full">
                <thead className="bg-gray-100 overflow-clip">
                    <tr>
                        <th className="px-2 py-2">Title</th>
                        <th className="px-2 py-2">Description</th>
                        <th className="px-2 py-2">Status</th>
                        <th className="px-2 py-2">Due Date</th>
                        <th className="px-2 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="px-2 py-2">Hasdad</td>
                        <td className="px-2 py-2">Hasdad</td>
                        <td className="px-2 py-2">Hasdad</td>
                        <td className="px-2 py-2">Hasdad</td>
                        <td className="px-2 py-2 flex gap-2">
                            <Button type="button">
                                <FilePenLine/>
                            </Button>
                            <Button variant={'destructive'} type="button">
                                <Trash2/>
                            </Button>                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default TaskTable