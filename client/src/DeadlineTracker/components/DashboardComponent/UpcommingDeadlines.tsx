import { getStatusColor } from '@/Common/Utils/getStatusColor'
import { useGetUpcommingDeadlines } from '@/DeadlineTracker/hooks/useDashboardQuery'
import { differenceInDays } from 'date-fns'

type Deadline = {
    id: number;
    projectId: number;
    projectName: string;
    title: string;
    status: string;
    dueDate: Date;
}

function UpcommingDeadlines() {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || 'null');
    const { data } = useGetUpcommingDeadlines(Number(userDetails.id));
    
    return (
        <section className="bg-white drop-shadow-lg rounded-md px-4 py-4 flex flex-col w-[500px] text-xs">
            <h1 className="font-semibold text-base pb-2">Upcoming Deadlines</h1>
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="font-normal px-2 py-2">Task</th>
                        <th className="font-normal px-2 py-2">Status</th>
                        <th className="font-normal px-2 py-2">Project</th>
                        <th className="font-normal px-2 py-2">Days Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length ? (
                        data.map((deadline: Deadline) => {
                            const daysRemaining = differenceInDays(new Date(deadline.dueDate), new Date());
                            return (
                                <tr key={deadline.id}>
                                    <td className="px-2 py-2">{deadline.title}</td>
                                    <td className={`px-2 py-2 ${getStatusColor(deadline.status)}`}>{deadline.status}</td>
                                    <td className="px-2 py-2">{deadline.projectName}</td>
                                    <td className="px-2 py-2">{daysRemaining} days</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-2 py-2 text-center">No Upcoming Deadlines</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default UpcommingDeadlines;
