import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'

const SideBar = ({ logout }) => {

    return (

        <header className='fixed top-0 left-0 
                           flex flex-col justify-between
                           bg-gradient-to-tr from-gray-200 to-gray-300
                           shadow-md rounded-lg
                           h-full w-14
                           py-2'>
            <Link to={"/"}>
                <Logo />
            </Link>

            <div className='flex-1 flex flex-col items-center space-y-1'>
                <NavLink to={"/projects"}>
                    {({ isActive }) => (
                        <SideBarIcon icon={<i className="fa-solid fa-diagram-project"></i>} text='Proyectos' isActive={isActive} />
                    )}
                </NavLink>

                <NavLink to={"/new-project"} >
                    {({ isActive }) => (
                        <SideBarIcon icon={<i className="fa-solid fa-plus"></i>} text='Nuevo Proyecto' isActive={isActive} />
                    )}
                </NavLink>

                <NavLink to={"/tasks"}>
                    {({ isActive }) => (
                        <SideBarIcon icon={<i className="fa-solid fa-list-check"></i>} text='Tareas' isActive={isActive} />
                    )}
                </NavLink>
            </div>

            <div className='flex flex-col justify-center items-center space-y-1'>
                <NavLink to={"/profile"}>
                    {({ isActive }) => (
                        <SideBarIcon icon={<i className="fa-solid fa-user"></i>} text='Perfil' isActive={isActive} />
                    )}
                </NavLink>

                <NavLink to={"/settings"}>
                    {({ isActive }) => (
                        <SideBarIcon icon={<i className="fa-solid fa-gear"></i>} text='Configuración' isActive={isActive} />
                    )}
                </NavLink>

                <button type='button' onClick={logout}>
                    <SideBarIcon icon={<i className="fa-solid fa-right-from-bracket"></i>} text='Cerrar Sesión' />
                </button>
            </div>
        </header>

    )
}

const SideBarIcon = ({ icon, text = "tooltip 💡", isActive }) => {
    return (
        <div className={`sidebar-icon group ${isActive ? 'sidebar-icon-active' : ''}`}>
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
        </div>
    )
}

export default SideBar