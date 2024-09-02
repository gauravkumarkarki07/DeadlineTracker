import {getStatusColor} from '@/Common/Utils/getStatusColor'

function UpcommingDeadlines() {
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
                <tr>
                    <td className="px-2 py-2">Assignment 1 asdasdasd</td>
                    <td className={`px-2 py-2 ${getStatusColor('PENDING')}`}>PENDING</td>
                    <td className="px-2 py-2">Risk Management asdasdasd</td>
                    <td className="px-2 py-2">Sept 20, 2024 asdasdsadasda</td>
                </tr>
            </tbody>
        </table>
    </section>
  )
}

export default UpcommingDeadlines