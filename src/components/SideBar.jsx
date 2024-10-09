import { Link } from 'react-router-dom'
import Logo from './Logo'

const SideBar = () => {
    return (
        <header className='fixed top-1 left-1 h-screen w-20 p-2 flex flex-col justify-between bg-white shadow-md rounded-lg'>
            <Link>
                <Logo />
            </Link>

            <div className='flex-1 py-2 space-y-4'>
                <SideBarIcon icon={<i class="fa-solid fa-user"></i>} text='Perfil' />

                <SideBarIcon icon={<i class="fa-solid fa-diagram-project"></i>} text='Proyectos' />

                <SideBarIcon icon={<i class="fa-solid fa-list-check"></i>} text='Tareas' />
            </div>


            <SideBarIcon icon={<i class="fa-solid fa-gear"></i>} text='Configuración' />

            <SideBarIcon icon={<i class="fa-solid fa-right-from-bracket"></i>} text='Cerrar Sesión' />
        </header>
    )
}

const SideBarIcon = ({ icon, text = "tooltip 💡" }) => {
    return (
        <div className="sidebar-icon group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
        </div>
    )
}


export default SideBar