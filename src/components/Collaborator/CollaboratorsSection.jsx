import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/toast";
import { findCollaboratorByEmail, addCollaboratorById } from "../../api/CollaboratorApi";
import CollaboratorCard from "./CollaboratorCard"

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const CollaboratorsSection = ({
    userData, project, projectId,
    searchQuery, setSearchQuery,
    searchResult, setSearchResult,
    showSearchResult, setShowSearchResult }) => {
    const isProjectCreator = project.createdBy._id === userData._id;

    const { mutate: findCollaboratorByEmailMutate } = useMutation({
        mutationFn: findCollaboratorByEmail,
        onError: (error) => {
            showToast("error", error.message);
            setTimeout(() => {
                setSearchQuery("");
            }, 5000);
        },
        onSuccess: (response) => {
            setSearchResult(response);
            setShowSearchResult(true);
            setTimeout(() => {
                setShowSearchResult(false);
                setSearchResult(null);
            }, 5000); // Ajusta el tiempo según tus necesidades
        },
    });

    useEffect(() => {
        const debounceSearch = setTimeout(async () => {
            if (searchQuery.trim() !== "" && validarEmail(searchQuery)) {
                const data = {
                    projectId,
                    email: searchQuery,
                };
                findCollaboratorByEmailMutate(data);
            }
        }, 1000); // Ajusta el tiempo de debounce según tus necesidades

        return () => clearTimeout(debounceSearch);
    }, [searchQuery]);

    const queryClient = useQueryClient();

    const { mutate: addCollaboratorByIdMutate } = useMutation({
        mutationFn: addCollaboratorById,
        onError: (error) => {
            showToast("error", error.message);
            setSearchQuery("");
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["project", projectId] });
            showToast("success", response.message);
            setSearchQuery("");

        },
    });

    const handleClickAddCollaborator = () => {
        const isConfirmed = confirm(`¿Deseas agregar a ${searchResult.username} como colaborador?`)
        if (isConfirmed) {
            const data = {
                projectId,
                collaboratorId: searchResult._id
            }
            addCollaboratorByIdMutate(data)
        }
    }

    return (
        <div className="p-1 space-y-2">
            <div>
                <h2 className="font-bold">Colaboradores</h2>
                <div className="relative max-w-xs">
                    {
                        isProjectCreator && (
                            <>
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    placeholder="Añadir colaborador"
                                    className="w-full rounded-3xl shadow bg-gray-100 py-1 px-4 outline-none"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                                <i className="fa-solid fa-magnifying-glass absolute top-1/4 right-4"></i>
                            </>
                        )
                    }

                    {showSearchResult && searchResult && (
                        <div
                            className="absolute w-full
                             flex justify-between items-center
                             rounded-sm text-white
                             bg-gradient-to-r from-azul-brillante to-azul-oscuro
                             p-4 mt-1"
                        >
                            <span>{searchResult.email}</span>
                            <button type="button" onClick={handleClickAddCollaborator}>
                                <i className="fa-solid fa-user-plus"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {
                    project.collaborators.length === 0 ?
                        (<span className="text-gris-oscuro/75">Aún no hay colaboradores asignados.</span>) :
                        (project.collaborators.map((collaborator) => (
                            <CollaboratorCard key={collaborator._id}
                                collaborator={collaborator}
                                projectId={projectId}
                                userData={userData}
                                project={project} />
                        )))
                }
            </div>
        </div>
    )
}

export default CollaboratorsSection