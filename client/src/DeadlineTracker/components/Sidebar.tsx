import { useState } from 'react';
import { House, Calendar, ClipboardList, Menu, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useLogout} from '@/Auth/hooks/useAuthQuery';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const{mutateAsync:handleLogout}=useLogout();
    const navigate=useNavigate();

    const Logout = async () => {
         await handleLogout();
         navigate('/auth/login')
    }

    return (
        <nav className={`flex flex-col gap-12 min-h-screen bg-primary px-4 py-4 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
            <section className='flex justify-between items-center'>
                {isOpen && <h1 className="text-xl">Deadline Tracker</h1>}
                <button onClick={toggleSidebar}>
                    <Menu />
                </button>
            </section>
            <section className="flex flex-col gap-6">
                <NavLink to={'/deadline-tracker/dashboard'} className='flex items-center gap-2'>
                    <House />
                    {isOpen && <span>Dashboard</span>}
                </NavLink>
                <NavLink to={'/deadline-tracker/projects'} className='flex items-center gap-2'>
                    <ClipboardList />
                    {isOpen && <span>Projects</span>}
                </NavLink>
                <NavLink to={'/deadline-tracker/calendar'} className='flex items-center gap-2'>
                    <Calendar />
                    {isOpen && <span>Calendar</span>}
                </NavLink>
            </section>
            <section className='flex items-center gap-2 cursor-pointer' onClick={Logout}>
                <LogOut />
                {isOpen && <span>Logout</span>}
            </section>
        </nav>
    )
}

export default Sidebar