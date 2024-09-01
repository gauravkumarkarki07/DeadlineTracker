import { useState } from 'react';
import { House, Calendar, ClipboardList, Menu, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '@/Auth/hooks/useAuthQuery';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const { mutateAsync: handleLogout } = useLogout();
    const navigate = useNavigate();

    const Logout = async () => {
        await handleLogout();
        navigate('/auth/login', { replace: true })
    }

    return (
        <nav className={`relative flex flex-col gap-12 min-h-screen bg-white px-6 py-4 text-black transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
            <section className='flex justify-between items-center'>
                {isOpen && <h1 className="text-xl font-semibold">Task<span className='text-accentPrimary'>It</span></h1>}
                <button onClick={toggleSidebar}>
                    <Menu />
                </button>
            </section>
            <section className='flex flex-col gap-14 text-sm font-normal'>
                <section className="flex flex-col gap-6 text-gray-600">
                    {isOpen && <h2 className='font-semibold text-base text-black'>Overview</h2>}                    
                    <NavLink to={'/deadline-tracker/dashboard'} className={({ isActive }) => isActive ? 'text-accentPrimary font-semibold flex items-center gap-2' : 'flex items-center gap-2 hover:text-accentPrimary'} >
                        <House size={18} />
                        {isOpen && <span>Dashboard</span>}
                    </NavLink>
                    <NavLink to={'/deadline-tracker/projects'} className={({ isActive }) => isActive ? 'text-accentPrimary font-semibold flex items-center gap-2' : 'flex items-center gap-2 hover:text-accentPrimary'}>
                        <ClipboardList size={18} />
                        {isOpen && <span>My Projects</span>}
                    </NavLink>
                    <NavLink to={'/deadline-tracker/calendar'} className={({ isActive }) => isActive ? 'text-accentPrimary font-semibold flex items-center gap-2' : 'flex items-center gap-2 hover:text-accentPrimary'}>
                        <Calendar size={18} />
                        {isOpen && <span>Calendar</span>}
                    </NavLink>
                </section>
                <section className='absolute bottom-4 flex items-center gap-2 cursor-pointer hover:text-accentPrimary' onClick={Logout}>
                    <LogOut size={18} />
                    {isOpen && <span>Logout</span>}
                </section>
            </section>

        </nav>
    )
}

export default Sidebar