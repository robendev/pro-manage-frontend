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
                    bg-gradient-to-tr from-gray-200 to-gray-300
                    shadow-md rounded-lg
                    p-4">
      {project.projectName}
    </div>
  )
}

export default ProjectView