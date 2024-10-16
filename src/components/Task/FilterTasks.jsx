
const FilterTasks = () => {
    return (
        <div>
            <h2 className="font-bold">Tareas</h2>
            <nav
                className="flex flex-col sm:flex-row justify-between
                      shadow-md rounded-lg p-2"
            >
                <div
                    className="gap-2 flex-1 
                        grid grid-cols-2
                        sm:grid-cols-3"
                >
                    <select
                        className="p-2 outline-none bg-gray-50
                             shadow-md rounded-lg
                             col-span-2"
                    >
                        <option value="">Prioridad - Estado</option>
                        <optgroup label="Prioridad">
                            <option value="low">Baja</option>
                            <option value="medium">Media</option>
                            <option value="high">Alta</option>
                        </optgroup>
                        <optgroup label="Estado">
                            <option value="pending">Pendiente</option>
                            <option value="in-progress">En Progreso</option>
                            <option value="completed">Completado</option>
                        </optgroup>
                    </select>
                    <button
                        className="p-2
                             bg-gradient-to-tr from-gray-200 to-gray-300
                             hover:from-gray-300 hover:to-gray-400
                             shadow-md rounded-lg
                             sm:col-start-1"
                    >
                        <i className="fa-solid fa-filter mr-1"></i>Filtrar
                    </button>
                    <button
                        className="p-2
                             bg-gradient-to-tr from-gray-200 to-gray-300
                             hover:from-gray-300 hover:to-gray-400
                             shadow-md rounded-lg"
                    >
                        <i className="fa-solid fa-filter-circle-xmark mr-1"></i>Limpiar
                        Filtros
                    </button>
                    <button
                        className="p-2
                             bg-gradient-to-tr from-gray-200 to-gray-300
                             hover:from-gray-300 hover:to-gray-400
                             shadow-md rounded-lg
                             col-span-2
                             sm:col-span-1 sm:row-start-1 sm:row-span-2 sm:col-start-3"
                    >
                        <i className="fa-solid fa-circle-plus mr-1"></i>Agregar Tarea
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default FilterTasks