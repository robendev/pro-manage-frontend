import { Link } from "react-router-dom";
import { statusStyles, statusTranslations } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";

const TaskCard = ({ task }) => {
    return (
        <li>
            <div className="px-4 py-4
                        space-y-2
                        bg-gradient-to-tr from-gray-100 to-gray-200 
                        shadow-md shadow-gray-400 rounded-lg 
                        w-72 mx-auto
                        hover:from-white hover:to-gray-100">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-400 font-bold"><i className="fas fa-hashtag"></i>{task._id}</p>
                        <button type="button"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                    </div>

                    <Link to={`/task/${task._id}`}>
                        <h2 className="text-sm text-center font-bold line-clamp-1">{task.taskName}</h2>
                    </Link>
                    <p className="text-xs font-light">Estado <span className={`${statusStyles[task.status]} px-4 p-1 rounded-lg`}>{statusTranslations[task.status]}</span></p>
                    <p className="line-clamp-3 text-xs">{task.taskDescription}</p>
                </div>

                <div className="space-y-1 *:text-xs">
                    <p className="line-clamp-1"><i className="fas fa-calendar-check mr-1"></i> Fecha de inicio: <span>{formatDate(task.startDate)}</span></p>
                    <p className="line-clamp-1"><i className="fas fa-calendar-times mr-1"></i> Fecha de Finalización: {formatDate(task.endDate)}</p>
                    <p><i className="fas fa-user mr-1"></i> Asignado a: {task.assignedTo.length}</p>
                    <p><i className="fas fa-tag mr-1"></i> Etiquetas: {task.tags.length}</p>
                </div>
            </div>
        </li>

    );
}

export default TaskCard

