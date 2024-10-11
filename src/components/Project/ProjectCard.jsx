import { Link } from "react-router-dom"
import { formatDate } from "../../utils/formatDate"

const ProjectCard = ({project}) => {
    console.log(project)
    return (
        <div className="px-4 py-8 space-y-3 bg-gradient-to-tr from-gray-100 to-gray-200 shadow-md shadow-gray-400 rounded-lg w-96
                        hover:from-white hover:to-gray-100 z-0">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400 font-bold"><i className="fas fa-hashtag"></i> {project._id}</p>
                    <button type="button"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
                <Link to={`/projects/${project._id}`}>
                    <h2 className="relative text-center font-bold line-clamp-1 border-paint">{project.projectName}</h2>
                </Link>

                <div className="flex justify-around items-center *:text-xs">
                    <p className="font-semibold">Estado <span className="bg-[#FFD700] px-4 p-1 rounded-md">{project.status}</span></p>
                    <p className="font-semibold">Prioridad <span className="bg-[#6C757D] text-[#FFFFFF] px-4 p-1 rounded-md">{project.priority}</span></p>
                </div>

                <p className="line-clamp-4 text-sm">{project.projectDescription}</p>
            </div>

            <div className="space-y-1 *:text-xs">
                <p className=""><i className="fas fa-user w-5"></i> Creado por: <span>{project.createdBy}</span></p>
                <p className=""><i className="fas fa-calendar-alt w-5"></i> Fecha de Creación: <span>{formatDate(project.createdAt)}</span></p>
                <p className=""><i className="fas fa-calendar-check w-5"></i> Fecha de inicio: <span>{formatDate(project.startDate)}</span></p>
            </div>

            <div className="space-y-1 *:text-xs">
                <p><i className="fas fa-calendar-times w-5"></i> Fecha de Finalización: {formatDate(project.endDate)}</p>
                <p><i className="fas fa-users w-5"></i> Colaboradores: {project.collaborators.length}</p>
                <p><i className="fas fa-tasks w-5"></i> Tareas: {project.tasks.length}</p>
                <p><i className="fas fa-sticky-note w-5"></i> Notas: {project.notes.length}</p>
            </div>
        </div>
    )
}

export default ProjectCard