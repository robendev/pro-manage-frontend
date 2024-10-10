import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectApi";

const ProjectView = () => {
  const { projectId } = useParams();

  const { isPending, isError, data: project, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
    refetchOnWindowFocus: false,
  });

  if (project) return (
    <div className="flex-1 flex flex-col
                    w-full max-w-5xl mx-auto
                    bg-gradient-to-tr from-gray-100 to-gray-200
                      hover:from-gray-50 hover:to-gray-100
                    shadow-md rounded-lg
                    px-4 py-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-center">{project.projectName}</h1>
        <div className="flex justify-center space-x-4 mt-2">
          <p className="font-semibold">Estado: <span className="bg-[#FFD700] px-4 p-1 rounded-md">{project.status}</span></p>
          <p className="font-semibold">Prioridad: <span className="bg-[#6C757D] text-[#FFFFFF] px-4 p-1 rounded-md">{project.priority}</span></p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Descripción</h2>
        <p className="text-sm">{project.projectDescription}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Detalles del Proyecto</h2>
        <p className="text-sm"><i className="fas fa-user w-5"></i> Creado por: <span>{project.createdBy}</span></p>
        <p className="text-sm"><i className="fas fa-calendar-alt w-5"></i> Fecha de Creación: <span>{new Date(project.createdAt).toLocaleDateString()}</span></p>
        <p className="text-sm"><i className="fas fa-calendar-check w-5"></i> Fecha de inicio: <span>{new Date(project.startDate).toLocaleDateString()}</span></p>
        <p className="text-sm"><i className="fas fa-calendar-times w-5"></i> Fecha de Finalización: <span>{new Date(project.endDate).toLocaleDateString()}</span></p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Colaboradores</h2>
        <ul className="list-disc pl-5">
          {project.collaborators.map((collaborator, index) => (
            <li key={index} className="text-sm">{collaborator}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Tareas</h2>
        <ul className="list-disc pl-5">
          {project.tasks.map((task, index) => (
            <li key={index} className="text-sm">{task}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Notas</h2>
        <ul className="list-disc pl-5">
          {project.notes.map((note, index) => (
            <li key={index} className="text-sm">{note}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProjectView