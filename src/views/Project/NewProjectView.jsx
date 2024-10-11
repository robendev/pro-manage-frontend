import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";
import FormCreateProject from "../../components/Project/FormCreateProject"
import { createProject } from "../../api/ProjectApi";

const NewProjectView = () => {
    const navigate = useNavigate()

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
        <div className="bg-gradient-to-tr from-gray-200 to-gray-300
         flex-1 flex flex-col
         shadow-md rounded-lg
         px-4 py-8">
            <div className="w-full max-w-5xl mx-auto space-y-1 mb-4">
                <h2 className="text-center font-bold line-clamp-1">Crear Nuevo Proyecto</h2>
                <h3 className="font-semibold">¡Hola [Nombre del Usuario]!</h3>
                <p className="text-sm">Estás a punto de crear un nuevo proyecto. Por favor, proporciona la información necesaria para comenzar.</p>
                <p className="text-sm">Asegúrate de incluir todos los detalles importantes para que tu equipo pueda entender el alcance y los objetivos del proyecto.</p>
                <p className="text-sm">Una vez que hayas completado la información, podrás asignar tareas y colaboradores para comenzar a trabajar en tu nuevo proyecto.</p>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className='bg-gradient-to-tr from-gray-100 to-gray-200
                                    shadow-md rounded-lg
                                    w-full max-w-96 mx-auto
                                    px-4 py-4 text-xs'>
                    <FormCreateProject register={register} errors={errors} />
                    <button type='submit' className='w-full
                        bg-gradient-to-tr from-gray-600 to-gray-800
                        text-white
                        rounded-lg
                        py-1'>
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewProjectView;