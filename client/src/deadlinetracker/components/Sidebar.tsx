import { Calendar } from 'lucide-react';
import { ClipboardCheck } from 'lucide-react';

function Sidebar() {
  return (
    <section className="bg-blue-500 text-white text-lg h-screen items-center">
        <nav className="flex flex-col items-start gap-2 px-4 py-4">
            <ul className='flex gap-2 items-center hover:text-blue-200 cursor-pointer'>
                <Calendar size={16}/>
                <span>Calendar</span>
            </ul>
            <ul className='flex gap-2 items-center hover:text-blue-200 cursor-pointer'>
                <ClipboardCheck size={16}/>
                <span>Tasks</span>
            </ul>
        </nav>
    </section>
  )
}

export default Sidebar