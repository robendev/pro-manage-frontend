import { Link } from "react-router-dom"
import { formatDate } from "../../utils/formatDate"
import { priorityStyles, priorityTranslations } from "../../utils/priority"
import { statusStyles, statusTranslations } from "../../utils/status"

const ProjectCard = ({ project, userData }) => {
    const isProjectCreator = project.createdBy._id === userData._id;
    return (
        <div className="px-4 py-4 md:py-8
                        space-y-4 
                        bg-gradient-to-tr from-gray-100 to-gray-200 
                        shadow-md shadow-gray-400 rounded-lg 
                        w-80 md:w-96
                        hover:from-white hover:to-gray-100">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400 font-bold"><i className="fas fa-hashtag"></i>{project._id}</p>
                    {isProjectCreator && <button type="button"><i className="fa-solid fa-ellipsis-vertical"></i></button>}
                </div>
                <Link to={`/projects/${project._id}`}>
                    <h2 className="relative text-center font-bold line-clamp-1 border-paint">{project.projectName}</h2>
                </Link>

                <div className="flex justify-around items-center *:text-xs *:font-light">
                    <p className="font-semibold">Prioridad <span className={`${priorityStyles[project.priority]} px-4 p-1 rounded-md`}>{priorityTranslations[project.priority]}</span></p>
                    <p className="font-semibold">Estado <span className={`${statusStyles[project.status]} px-4 p-1 rounded-md`}>{statusTranslations[project.status]}</span></p>
                </div>

                <p className="line-clamp-4 text-sm">{project.projectDescription}</p>
            </div>

            <div className="space-y-1 *:text-xs">
                <p className="">
                    <i className="fas fa-user w-5"></i>
                    Creado por: <span>{project.createdBy.email}</span>
                    {isProjectCreator && <i className="fas fa-crown text-yellow-500 ml-1"></i>}
                </p>
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