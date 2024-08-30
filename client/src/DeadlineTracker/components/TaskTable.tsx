import { Button } from "@/shadcn/components/ui/button"
import { Trash2,FilePenLine } from 'lucide-react';
import { CirclePlus } from 'lucide-react';

function TaskTable() {
    return (
        <section className="flex flex-col gap-4 px-2 py-2 border rounded-md">
            <section className="flex flex-col gap-2">
                <h2 className="text-xl">Task</h2>
                <section className="flex justify-between items-center">
                    <Button>All</Button>
                    <section className="flex gap-4 items-center">
                        <span>date</span>
                        <span>filter</span>
                        <Button type="button" variant={'outline'}>
                            <section className="flex gap-2 items-center">
                                <CirclePlus/>
                                <span>Add New Task</span>
                            </section>
                        </Button>
                    </section>
                </section>
            </section>
            <table className="text-sm text-left">
                <thead className="bg-gray-100 overflow-clip">
                    <tr className="">
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
                            <Button>
                                <FilePenLine/>
                            </Button>
                            <Button variant={'destructive'}>
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