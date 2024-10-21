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
        <div className="flex flex-col justify-between rounded-sm shadow bg-gray-100
                        space-y-1 py-1 px-2 w-full max-w-max h-14"
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}>
            <div className="flex justify-between items-center gap-2">
                <p className="text-gris-oscuro/75"><i className="fas fa-hashtag"></i>{collaborator._id}</p>
                {
                    isProjectCreator && (
                        <button className="text-red-500"
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