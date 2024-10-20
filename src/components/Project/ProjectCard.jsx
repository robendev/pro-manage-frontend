import { Link } from "react-router-dom"
import { formatDate } from "../../utils/formatDate"
import { priorityStyles, priorityTranslations } from "../../utils/priority"
import { statusStyles, statusTranslations } from "../../utils/status"

const ProjectCard = ({ project, userData }) => {
    const isProjectCreator = project.createdBy._id === userData._id;
    return (
        <div className="bg-gray-100 rounded-sm shadow w-full max-w-80 p-2 space-y-2">
            <div className="space-y-1">
                {isProjectCreator ? 
                (<p className="font-bold border border-azul-brillante rounded-3xl py-0.5 px-4 inline-block bg-blue-100 text-azul-brillante">Administrador</p>) : 
                (<p className="font-bold border border-gris-oscuro rounded-3xl py-0.5 px-4 inline-block bg-gray-200 text-gris-oscuro">Colaborador</p>)}
                <div className="flex justify-between items-center">
                    <p className="text-gris-oscuro/50 font-bold"><i className="fas fa-hashtag"></i>{project._id}</p>
                    {isProjectCreator && <button type="button"><i className="fa-solid fa-ellipsis-vertical"></i></button>}
                </div>
                <Link to={`/projects/${project._id}`}>
                    <h2 className="relative text-center font-bold line-clamp-1 border-paint">{project.projectName}</h2>
                </Link>

                <div className="flex justify-around items-center *:text-xs">
                    <p className="font-semibold">Prioridad <span className={`${priorityStyles[project.priority]} py-1 px-4 rounded-3xl`}>{priorityTranslations[project.priority]}</span></p>
                    <p className="font-semibold">Estado <span className={`${statusStyles[project.status]} py-1 px-4 rounded-3xl`}>{statusTranslations[project.status]}</span></p>
                </div>

                <p className="line-clamp-4">{project.projectDescription}</p>
            </div>

            <div className="space-y-1 *:text-sm">
                <p className="">
                    <i className="fas fa-user w-5"></i>
                    Creado por: <span>{project.createdBy.email}</span>
                    {isProjectCreator && <i className="fas fa-crown text-yellow-500 ml-1"></i>}
                </p>
                <p className=""><i className="fas fa-calendar-alt w-5"></i> Fecha de Creación: <span>{formatDate(project.createdAt)}</span></p>
                <p className=""><i className="fas fa-calendar-check w-5"></i> Fecha de inicio: <span>{formatDate(project.startDate)}</span></p>
            </div>

            <div className="space-y-1 *:text-sm">
                <p><i className="fas fa-calendar-times w-5"></i> Fecha de Finalización: {formatDate(project.endDate)}</p>
                <p><i className="fas fa-users w-5"></i> Colaboradores: {project.collaborators.length}</p>
                <p><i className="fas fa-tasks w-5"></i> Tareas: {project.tasks.length}</p>
                <p><i className="fas fa-sticky-note w-5"></i> Notas: {project.notes.length}</p>
            </div>
        </div>
    )
}

export default ProjectCard