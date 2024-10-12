import { useQuery } from "@tanstack/react-query"
import { getAllProjects } from "../../api/ProjectApi"
import ProjectCard from "../../components/Project/ProjectCard"

const DashboardView = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects
  })
  return (
    <div className="bg-gradient-to-tr from-gray-200 to-gray-300
                    flex-1 flex flex-col 
                    shadow-md rounded-lg 
                    px-2 py-4 md:px-4 md:py-8">
      <div className="w-full max-w-5xl mx-auto space-y-1 mb-4">
        <h2 className="text-center font-bold line-clamp-1">Bienvenido a tu Dashboard de Proyectos</h2>
        <h3 className="font-semibold">¡Hola [Nombre del Usuario]!</h3>
        <p className="text-sm">Aquí encontrarás una visión general de todos tus proyectos.</p>
        <p className="text-sm">Puedes ver el estado de cada proyecto, las tareas pendientes y los colaboradores asignados.</p>
        <p className="text-sm">Utiliza esta sección para mantenerte al día con el progreso de tu trabajo y asegurarte de que todo esté en orden.</p>
      </div>

      <div className={`flex-1 ${(isPending || isError) ? "flex justify-center items-center" : ""}`}>
        {isPending && <div className="loader"></div>}
        {isError && <div className="text-red-500">Error: {error.message}</div>}
        {data && (
          <div className="flex justify-evenly flex-wrap gap-2">
            {data.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardView