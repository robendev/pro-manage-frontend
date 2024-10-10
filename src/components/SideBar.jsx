import { Link } from 'react-router-dom'
import Logo from './Logo'

const SideBar = ({ logout }) => {
    return (
        <header className='fixed top-0 left-0 flex flex-col justify-between
                           bg-gradient-to-tr from-gray-200 to-gray-300
                           shadow-md rounded-lg
                           h-full w-20  '>
            <Link to={"/"}>
                <Logo />
            </Link>

            <div className='flex-1 py-2 space-y-4'>
                <SideBarIcon icon={<i className="fa-solid fa-user"></i>} text='Perfil' />

                <SideBarIcon icon={<i className="fa-solid fa-diagram-project"></i>} text='Proyectos' />

                <SideBarIcon icon={<i className="fa-solid fa-list-check"></i>} text='Tareas' />
            </div>


            <SideBarIcon icon={<i className="fa-solid fa-gear"></i>} text='Configuración' />

            <button type='button' onClick={logout}>
                <SideBarIcon icon={<i className="fa-solid fa-right-from-bracket"></i>} text='Cerrar Sesión' />
            </button>
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