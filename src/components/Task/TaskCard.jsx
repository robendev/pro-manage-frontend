import { Link } from "react-router-dom";
import { statusStyles, statusTranslations } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";

const TaskCard = ({ task }) => {
    return (
        <li>
            <div className="bg-gray-100 rounded-sm shadow px-4 py-4 w-full max-w-80 mx-auto space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-400 font-bold"><i className="fas fa-hashtag"></i>{task._id}</p>
                        <button type="button"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                    </div>

                    <Link to={`/task/${task._id}`}>
                        <h2 className="text-center font-bold line-clamp-1">{task.taskName}</h2>
                    </Link>
                    <p className="font-light">Estado <span className={`${statusStyles[task.status]} py-1 px-4 rounded-3xl`}>{statusTranslations[task.status]}</span></p>
                    <p className="line-clamp-4">{task.taskDescription}</p>
                </div>

                <div className="space-y-1">
                    <p className="line-clamp-1"><i className="fas fa-calendar-check w-5"></i> Fecha de inicio: <span>{formatDate(task.startDate)}</span></p>
                    <p className="line-clamp-1"><i className="fas fa-calendar-times w-5"></i> Fecha de Finalización: {formatDate(task.endDate)}</p>
                    <p><i className="fas fa-user w-5"></i> Asignado a: {task.assignedTo.length}</p>
                    <p><i className="fas fa-tag w-5"></i> Etiquetas: {task.tags.length}</p>
                </div>
            </div>
        </li>

    );
}

export default TaskCard

