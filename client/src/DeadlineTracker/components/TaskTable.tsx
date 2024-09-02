import { Button } from "@/shadcn/components/ui/button";
import { Trash2 } from 'lucide-react';
import TaskStatusDropdown from "./TaskStatusDropdown";
import TaskDateFilter from "./TaskDateFilter";
import TaskFilter from "./TaskFilter";
import TaskCreateDialog from "./TaskCreateDialog";
import { useParams } from "react-router-dom";
import { TaskDetails, useDeleteTask, useGetAllTaskDetails } from "../hooks/useTaskQuery";
import { format } from "date-fns";
import TaskUpdateDialog from "./TaskUpdateDialog";

function TaskTable() {
    const { projectId } = useParams();

    const { data, isLoading } = useGetAllTaskDetails(Number(projectId));

    const { mutateAsync: deleteTask } = useDeleteTask();

    if (isLoading) {
        return <section>Loading ...</section>;
    }

    const handleDelete = async (deadlineId: number) => {
        await deleteTask({ deadlineId, projectId: Number(projectId) });
    };

    const getStatusColor=(status:string):string=>{
        switch(status){
            case 'PENDING':
                return 'text-yellow-500'
            case 'COMPLETED':
                return 'text-green-500'
            case 'OVERDUE':
                return 'text-red-500'
            default:
                return 'text-gray-500'
        }
    }

    return (
        <section className="flex flex-col gap-4 border w-full drop-shadow-md bg-white px-4 py-4 rounded-lg">
            <section className="flex flex-col gap-2">
                <article className="flex flex-col border-b pb-2 mb-2 gap-1">
                    <h2 className="text-lg">Tasks</h2>
                    <span className="text-xs text-gray-500">
                        Click <span className="text-black">*Add New Task</span> button to create tasks for this project.
                    </span>
                </article>
                <section className="flex justify-between items-center">
                    <TaskStatusDropdown />
                    <section className="flex gap-4 items-center">
                        <TaskDateFilter />
                        <TaskFilter />
                        <TaskCreateDialog />
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
                    {data?.deadlines.length > 0 ? (
                        data.deadlines.map((task: TaskDetails, index: number) => (
                            <tr className="border-b" key={index}>
                                <td className="px-2 py-2">{task.title}</td>
                                <td className="px-2 py-2">{task.description ? task.description : '---'}</td>
                                <td className={`px-2 py-2 ${getStatusColor(task.status)}`}>{task.status}</td>
                                <td className="px-2 py-2">{format(new Date(task.dueDate), 'PPP')}</td>
                                <td className="px-2 py-2 flex gap-2">
                                    <TaskUpdateDialog deadlineId={task.id} />
                                    <Button variant={'destructive'} type="button" onClick={() => handleDelete(task.id)}>
                                        <Trash2 />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-2 py-2 text-center">No Tasks</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default TaskTable;
