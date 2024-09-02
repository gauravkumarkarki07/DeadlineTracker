import { getStatusColor } from '@/Common/Utils/getStatusColor'
import { useGetUpcommingDeadlines } from '@/DeadlineTracker/hooks/useDashboardQuery'
import { format } from 'date-fns'

type deadline={
    id:number;
    projectId:number;
    projectName:string;
    title:string;
    status:string;
    dueDate:Date;
}

function UpcommingDeadlines() {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || 'null');
    const { data } = useGetUpcommingDeadlines(Number(userDetails.id))
    return (
        <section className="bg-white drop-shadow-lg rounded-md px-4 py-4 flex flex-col w-[500px] text-xs">
            <h1 className="font-semibold text-base pb-2">Upcomming Deadlines</h1>
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="font-normal px-2 py-2">Task</th>
                        <th className="font-normal px-2 py-2">Status</th>
                        <th className="font-normal px-2 py-2">Project</th>
                        <th className="font-normal px-2 py-2">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((deadline:deadline) => (
                        <tr key={deadline.id}>
                            <td className="px-2 py-2">{deadline.title}</td>
                            <td className={`px-2 py-2 ${getStatusColor(deadline.status)}`}>{deadline.status}</td>
                            <td className="px-2 py-2">{deadline.projectName}</td>
                            <td className="px-2 py-2">{format(new Date(deadline.dueDate), 'PPP')}</td>
                        </tr>
                    ))}
                    {!!data &&
                        <tr>
                            <td colSpan={5} className="px-2 py-2 text-center">No Upcomming Deadlines</td>
                        </tr>
                    }
                </tbody>
            </table>
        </section>
    )
}

export default UpcommingDeadlines