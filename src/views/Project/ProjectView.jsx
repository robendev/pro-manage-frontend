import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProjectById } from "../../api/ProjectApi";

import { priorityStyles, priorityTranslations } from "../../utils/priority";
import { statusStyles, statusTranslations } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";

import CollaboratorsSection from "../../components/Collaborator/CollaboratorsSection";
import FilterTasks from "../../components/Task/FilterTasks";

const ProjectView = () => {
  const { userData } = useOutletContext();

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

  const isProjectCreator = project?.createdBy._id === userData._id;

  if (project)
    return (
      <div
        className="flex-1 min-h-screen flex flex-col p-1 gap-1
                   sm-500:p-2 sm-500:gap-2
                   md:p-4 md:gap-4"
      >
        <div>
          <p className="text-gris-oscuro/75"><i className="fas fa-hashtag"></i>{project._id}</p>
          <h1 className="text-center font-bold line-clamp-1">
            {project.projectName}
          </h1>
          <div className="flex justify-around items-center *:text-xs">
            <p className="font-semibold">
              Prioridad{" "}
              <span
                className={`${priorityStyles[project.priority]
                  } py-1 px-4 rounded-3xl`}
              >
                {priorityTranslations[project.priority]}
              </span>
            </p>
            <p className="font-semibold">
              Estado{" "}
              <span
                className={`${statusStyles[project.status]
                  } py-1 px-4 rounded-3xl`}
              >
                {statusTranslations[project.status]}
              </span>
            </p>
          </div>
        </div>

        <div className="p-1">
          <h2 className="font-bold">Descripción</h2>
          <p>{project.projectDescription}</p>
        </div>

        <div className="p-1">
          <h2 className="font-bold">Detalles del Proyecto</h2>
          <p><i className="fas fa-user w-5"></i>Creado por: <span>{project.createdBy.email}</span>
            {isProjectCreator && <i className="fas fa-crown text-yellow-500 ml-1"></i>}
          </p>

          <p><i className="fas fa-calendar-alt w-5"></i>Fecha de Creación:<span>{formatDate(project.createdAt)}</span></p>
          <p><i className="fas fa-calendar-check w-5"></i>Fecha de inicio:<span>{formatDate(project.startDate)}</span></p>
          <p><i className="fas fa-calendar-times w-5"></i>Fecha de Finalización:<span>{formatDate(project.endDate)}</span></p>
        </div>
        
        <CollaboratorsSection userData={userData} project={project} projectId={projectId}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          searchResult={searchResult} setSearchResult={setSearchResult}
          showSearchResult={showSearchResult} setShowSearchResult={setShowSearchResult} />

        <FilterTasks project={project} projectId={projectId} />

        <div>
          <h2 className="font-bold">Notas</h2>
          <ul className="list-disc pl-5">
            {project.notes.map((note, index) => (
              <li key={index}>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default ProjectView;
