import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectApi";
import { priorityStyles, priorityTranslations } from "../../utils/priority";
import { statusStyles, statusTranslations } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";
import TaskCard from "../../components/Task/TaskCard";
import { findCollaboratorByEmail } from "../../api/CollaboratorApi";
import { showToast } from "../../utils/toast";

const groupPriority = {
  low: [],
  medium: [],
  high: [],
};

const ProjectView = () => {
  const { projectId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const {
    isPending,
    isError,
    data: project,
    error,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
    refetchOnWindowFocus: false,
  });

  const groupedTasks = project?.tasks.reduce((acc, task) => {
    let currentGroup = acc[task.priority] ? [...acc[task.priority]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.priority]: currentGroup };
  }, groupPriority);

  const { mutate } = useMutation({
    mutationFn: findCollaboratorByEmail,
    onError: (error) => {
      showToast("error", error.message);
    },
    onSuccess: (response) => {
      setSearchResults(response);
    },
  });

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchQuery.trim() !== "" && validarEmail(searchQuery)) {
        const data = {
          projectId,
          email: searchQuery,
        };
        mutate(data);
      }
    }, 1000); // Ajusta el tiempo de debounce según tus necesidades

    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

  if (project)
    return (
      <div
        className="px-4 py-4 md:py-8
                    space-y-4
                    bg-gradient-to-tr from-gray-100 to-gray-200
                    shadow-md shadow-gray-400 rounded-lg
                    flex-1 flex flex-col
                    w-full max-w-5xl mx-auto"
      >
        <div>
          <p className="text-sm text-gray-400 font-bold">
            <i className="fas fa-hashtag"></i>
            {project._id}
          </p>
          <h1 className="text-center font-bold line-clamp-1">
            {project.projectName}
          </h1>
          <div className="flex justify-around *:text-xs *:md:text-base *:xl:text-lg *:font-light">
            <p className="font-semibold">
              Prioridad{" "}
              <span
                className={`${
                  priorityStyles[project.priority]
                } px-4 p-1 rounded-md`}
              >
                {priorityTranslations[project.priority]}
              </span>
            </p>
            <p className="font-semibold">
              Estado{" "}
              <span
                className={`${
                  statusStyles[project.status]
                } px-4 p-1 rounded-md`}
              >
                {statusTranslations[project.status]}
              </span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-bold">Descripción</h2>
          <p
            className="text-sm
                      md:text-base
                      xl:text-lg"
          >
            {project.projectDescription}
          </p>
        </div>

        <div>
          <h2 className="font-bold">Detalles del Proyecto</h2>
          <p className="text-sm md:text-base xl:text-lg">
            <i className="fas fa-user w-5"></i> Creado por:{" "}
            <span>{project.createdBy.email}</span>
          </p>
          <p className="text-sm md:text-base xl:text-lg">
            <i className="fas fa-calendar-alt w-5"></i> Fecha de Creación:{" "}
            <span>{formatDate(project.createdAt)}</span>
          </p>
          <p className="text-sm md:text-base xl:text-lg">
            <i className="fas fa-calendar-check w-5"></i> Fecha de inicio:{" "}
            <span>{formatDate(project.startDate)}</span>
          </p>
          <p className="text-sm md:text-base xl:text-lg">
            <i className="fas fa-calendar-times w-5"></i> Fecha de Finalización:{" "}
            <span>{formatDate(project.endDate)}</span>
          </p>
        </div>

        <div>
          <div
            className="mb-4 flex flex-col
                        sm:flex-row sm:items-center sm:gap-4"
          >
            <h2 className="font-bold">Colaboradores</h2>
            <div className="relative w-80">
              <input
                type="email"
                name=""
                id=""
                placeholder="Añadir colaborador"
                className="shadow-md rounded-lg
                          bg-gray-50 outline-none
                          pl-4 py-1
                          w-full"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass absolute top-1/4 right-4"></i>
              {searchResults && (
                <div
                  className="absolute w-full
                             flex justify-between items-center
                             px-4 py-1 mt-1"
                >
                  {searchResults.email}
                  <button type="button">
                    <i className="fa-solid fa-user-plus"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
          <ul className="list-disc pl-5">
            {project.collaborators.map((collaborator) => (
              <li key={collaborator._id} className="text-sm">
                {collaborator.email}
              </li>
            ))}
          </ul>
        </div>

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

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                      lg:max-h-[728px] lg:overflow-y-auto
                      mx-auto"
        >
          {Object.entries(groupedTasks).map(([priority, tasks]) => (
            <div
              key={priority}
              className="w-80 p-4
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

        <div>
          <h2 className="font-bold">Notas</h2>
          <ul className="list-disc pl-5">
            {project.notes.map((note, index) => (
              <li key={index} className="text-sm">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default ProjectView;
