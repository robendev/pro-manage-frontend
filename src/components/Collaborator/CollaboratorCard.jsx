import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { removeCollaboratorById } from "../../api/CollaboratorApi";
import { showToast } from "../../utils/toast";

const CollaboratorCard = ({ collaborator, projectId, userData, project }) => {
    const isProjectCreator = project.createdBy._id === userData._id;

    const [showEmail, setShowEmail] = useState(false);

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: removeCollaboratorById,
        onError: (error) => {
            showToast("error", error.message);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["project", projectId] })
            showToast("success", response.message);
        }
    })

    const handleClickremoveCollaboratorById = () => {
        const isConfirmed = confirm(`¿Deseas eliminar a ${collaborator.username} como colaborador?`);
        if (isConfirmed) {
            const data = {
                projectId,
                collaboratorId: collaborator._id
            }
            mutate(data)
        }
    }
    return (
        <div className="p-2
                        flex flex-col justify-between
                        space-y-1 
                        bg-gradient-to-tr from-gray-100 to-gray-200 
                        shadow-md shadow-gray-400 rounded-lg 
                        w-56 h-14
                        hover:from-white hover:to-gray-100"
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}>
            <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400 font-bold"><i className="fas fa-hashtag"></i>{collaborator._id}</p>
                {
                    isProjectCreator && (
                        <button className="text-xs text-red-500"
                            onClick={handleClickremoveCollaboratorById}>
                            <i class="fa-solid fa-user-xmark"></i>
                        </button>
                    )
                }

            </div>
            {
                showEmail ?
                    (<p className="text-xs text-gray-500">{collaborator.email}</p>) :
                    (<p className="font-bold">{collaborator.username}</p>)
            }
        </div>
    )
}

export default CollaboratorCard;