import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProjectById } from "../../api/ProjectApi";

import { priorityStyles, priorityTranslations } from "../../utils/priority";
import { statusStyles, statusTranslations } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";

import CollaboratorsSection from "../../components/Collaborator/CollaboratorsSection";
import FilterTasks from "../../components/Task/FilterTasks";
import TaskCard from "../../components/Task/TaskCard";

const groupPriority = {
  low: [],
  medium: [],
  high: [],
};

const ProjectView = () => {
  const { projectId } = useParams();

  /* Filtro de Colaboradores */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchResult, setShowSearchResult] = useState(false); /* Mostrar el resultado de búsqueda */

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
                className={`${priorityStyles[project.priority]
                  } px-4 p-1 rounded-md`}
              >
                {priorityTranslations[project.priority]}
              </span>
            </p>
            <p className="font-semibold">
              Estado{" "}
              <span
                className={`${statusStyles[project.status]
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

        <CollaboratorsSection project={project} projectId={projectId}
                              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                              searchResult={searchResult} setSearchResult={setSearchResult}
                              showSearchResult={showSearchResult} setShowSearchResult={setShowSearchResult} />
        
        <FilterTasks />
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
