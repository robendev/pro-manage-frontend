import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useOutletContext } from "react-router-dom";
import { showToast } from "../../utils/toast";
import FormCreateProject from "../../components/Project/FormCreateProject"
import { createProject } from "../../api/ProjectApi";

const NewProjectView = () => {
    const { userData } = useOutletContext();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            showToast("error", error.message)
            reset()
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            showToast("success", response.message)
            reset()
            navigate("/projects")
        },
    })

    const onSubmit = (formData) => {
        mutate(formData)
    }

    return (
        <div className="flex-1 min-h-screen flex flex-col p-1 gap-1
                        sm-500:p-2 sm-500:gap-2
                        md:p-4 md:gap-4">
            <div className="w-full max-w-5xl mx-auto space-y-1 mb-4">
                <h2 className="text-center font-bold line-clamp-1">Crear Nuevo Proyecto</h2>
                <h3 className="font-semibold">¡Hola {userData.username}!</h3>
                <p className="text-sm">Estás a punto de crear un nuevo proyecto. Por favor, proporciona la información necesaria para comenzar.</p>
                <p className="text-sm">Asegúrate de incluir todos los detalles importantes para que tu equipo pueda entender el alcance y los objetivos del proyecto.</p>
                <p className="text-sm">Una vez que hayas completado la información, podrás asignar tareas y colaboradores para comenzar a trabajar en tu nuevo proyecto.</p>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-80 mx-auto 
                      p-4 space-y-4 my-4 rounded-sm shadow
                      bg-gray-100">
                    <h1 className="text-center font-bold">Nuevo Proyecto</h1>
                    <FormCreateProject register={register} errors={errors} />
                    <button type='submit'
                        className="w-full bg-azul-brillante rounded-3xl text-white font-bold py-1 px-2 tracking-wide">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewProjectView;