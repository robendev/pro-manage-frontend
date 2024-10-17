import { useEffect, useState } from "react";
import { priorityStyles, priorityTranslations } from "../../utils/priority";
import TaskCard from "./TaskCard";

const groupPriority = {
    low: [],
    medium: [],
    high: [],
};

const FilterTasks = ({ project, projectId }) => {
    const [filter, setFilter] = useState({ priority: '', status: '' });
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        // Filtrar las tareas basándose en el estado de los filtros
        const filtered = project?.tasks.filter(task => {
            const priorityMatch = filter.priority ? task.priority === filter.priority : true;
            const statusMatch = filter.status ? task.status === filter.status : true;
            return priorityMatch && statusMatch;
        });

        setFilteredTasks(filtered);
    }, [filter, project]);

    const handleFilterChange = (event) => {
        setFilter((prevFilter) => ({ ...prevFilter, [event.target.name]: event.target.value }));
    }

    const groupedTasks = filteredTasks.reduce((acc, task) => {
        let currentGroup = acc[task.priority] ? [...acc[task.priority]] : [];
        currentGroup = [...currentGroup, task];
        return { ...acc, [task.priority]: currentGroup };
    }, groupPriority);

    return (
        <div>
            <h2 className="font-bold">Tareas</h2>
            <nav
                className="flex flex-col sm:flex-row justify-between
                      shadow-md rounded-lg p-2 mb-2"
            >
                <div
                    className="gap-2 flex-1
                        grid grid-cols-1
                        sm:grid-cols-3
                        lg:grid-cols-4"
                >
                    <select
                        name="priority"
                        value={filter.priority}
                        onChange={handleFilterChange}
                        className="p-2 outline-none bg-gray-50 
                                   shadow-md rounded-lg
                                   sm:col-span-2"
                    >
                        <option value="" disabled selected>Prioridad</option>
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                    </select>
                    <select
                        name="status"
                        value={filter.status}
                        onChange={handleFilterChange}
                        className="p-2 outline-none bg-gray-50 
                                   shadow-md rounded-lg
                                   sm:col-span-2"
                    >
                        <option value="" disabled selected>Estado</option>
                        <option value="pending">Pendiente</option>
                        <option value="in-progress">En Progreso</option>
                        <option value="completed">Completado</option>
                    </select>
                    <button
                        className="p-2 line-clamp-1
                             bg-gradient-to-tr from-gray-200 to-gray-300
                             hover:from-gray-300 hover:to-gray-400
                             shadow-md rounded-lg
                             sm:row-start-1 sm:col-start-3
                             lg:row-start-1 lg:row-span-2"
                        onClick={() => setFilter({ priority: '', status: '' })}
                    >
                        <i className="fa-solid fa-filter-circle-xmark mr-1"></i>Eliminar
                    </button>
                    <button
                        className="p-2
                             bg-gradient-to-tr from-gray-200 to-gray-300
                             hover:from-gray-300 hover:to-gray-400
                             shadow-md rounded-lg
                             sm:row-start-2 sm:col-start-3
                             lg:col-start-4 lg:row-start-1 lg:row-span-2"
                    >
                        <i className="fa-solid fa-circle-plus mr-1"></i>Agregar Tarea
                    </button>
                </div>
            </nav>

            <div
                className="grid justify-items-center grid-cols-1 
                           md:grid-cols-2 
                           lg:grid-cols-3 lg:max-h-[728px] lg:overflow-y-auto"
            >
                {Object.entries(groupedTasks).map(([priority, tasks]) => (
                    <div
                        key={priority}
                        className="w-full max-w-80 p-2
                                   rounded-lg"
                    >
                        <h3
                            className={`capitalize
                            text-lg text-center 
                            ${priorityStyles[priority]}
                            rounded-lg
                            py-1`}
                        >
                            {priorityTranslations[priority]}
                        </h3>
                        <ul className="mt-2 space-y-2">
                            {tasks.length === 0 ? (
                                <li className="text-gray-950 text-center text-sm font-bold">
                                    No hay Tareas
                                </li>
                            ) : (
                                tasks.map((task) => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterTasks