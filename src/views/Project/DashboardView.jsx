import { useQuery } from "@tanstack/react-query"
import { getAllProjects } from "../../api/ProjectApi"
import ProjectCard from "../../components/Project/ProjectCard"
import { useOutletContext } from "react-router-dom"

const DashboardView = () => {
  const { userData } = useOutletContext();

  const { isPending, isError, data: projects, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects
  })

  return (
    <div className="flex-1 min-h-screen flex flex-col rounded-sm shadow p-1">
      <div className="w-full max-w-5xl mx-auto p-1 space-y-1 mb-4">
        <h2 className="text-center font-bold line-clamp-1">Bienvenido a tu Dashboard de Proyectos</h2>
        <h3 className="font-semibold">¡Hola {userData.username}!</h3>
        <p>Aquí encontrarás una visión general de todos tus proyectos.</p>
        <p>Puedes ver el estado de cada proyecto, las tareas pendientes y los colaboradores asignados.</p>
        <p>Utiliza esta sección para mantenerte al día con el progreso de tu trabajo y asegurarte de que todo esté en orden.</p>
      </div>

      <div className={`flex-1 ${(isPending || isError) ? "flex justify-center items-center" : ""}`}>
        {isPending && <div className="loader"></div>}
        {isError && <div className="text-red-500">Error: {error.message}</div>}
        {projects && (
          <div className="flex justify-evenly flex-wrap px-1 gap-2 mb-4">
            {projects.map(project => (
              <ProjectCard key={project._id} project={project} userData={userData} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardView