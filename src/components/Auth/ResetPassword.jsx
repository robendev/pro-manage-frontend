import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { showToast } from "../../utils/toast";
import { resetPassword } from "../../api/AuthApi";

const ResetPassword = ({ isValidToken, inputs }) => {
    const navigate = useNavigate()

    const { register,
        handleSubmit,
        formState: { errors },
        watch,
        reset, } = useForm({
            defaultValues: {
                password: "",
                confirmPassword: "",
            }
        });

    const password = watch("password");

    const { mutate } = useMutation({
        mutationFn: resetPassword,
        onError: (error) => {
            showToast("error", error.message)
            reset()
        },
        onSuccess: (response) => {
            showToast("success", response.message)
            reset()
            navigate("/")
        }
    })

    const onSubmit = (formData) => {
        const data = {
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            otpToken6Digits: inputs.join("")
        }
        mutate(data)
    }
    return (
        <div className="flex-1 flex flex-col justify-center px-4">
            {
                isValidToken && (
                    <>
                        <h2 className="text-center font-bold">Restablece tu Contraseña</h2>
                        <p className="text-center mb-4">
                            Este es el último paso para recuperar tu cuenta. Ingresa tu nueva contraseña y confírmala para completar el proceso.
                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-[98%] max-w-96 mx-auto p-4 mb-4 space-y-4 shadow-md rounded-lg bg-gray-100"
                            noValidate
                        >
                            <div>
                                <label htmlFor="password" className="block text-gray-700 sr-only">
                                    Contraseña
                                </label>
                                <div className="relative flex items-center gap-2">
                                    <i className="fa-solid fa-lock w-5 text-center"></i>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        className="w-full pl-4 pr-6 py-1 border shadow-md rounded-lg text-xs focus:outline-none"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: "La contraseña es obligatoria.",
                                            },
                                            minLength: {
                                                value: 8,
                                                message: "La contraseña debe tener al menos 8 caracteres.",
                                            },
                                            validate: {
                                                hasUpperCase: (value) =>
                                                    /[A-Z]/.test(value) ||
                                                    "La contraseña debe contener al menos una letra mayúscula.",
                                                hasLowerCase: (value) =>
                                                    /[a-z]/.test(value) ||
                                                    "La contraseña debe contener al menos una letra minúscula.",
                                                hasNumber: (value) =>
                                                    /[0-9]/.test(value) ||
                                                    "La contraseña debe contener al menos un número.",
                                                hasSpecialChar: (value) =>
                                                    /[@$!%*?&#]/.test(value) ||
                                                    "La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &, #).",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-gray-700 sr-only"
                                >
                                    Contraseña
                                </label>
                                <div className="relative flex items-center gap-2">
                                    <i className="fa-solid fa-unlock w-5 text-center"></i>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirmación de Contraseña"
                                        className="w-full pl-4 pr-6 py-1 border shadow-md rounded-lg text-xs focus:outline-none"
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message: "La confirmación de la contraseña es obligatoria.",
                                            },
                                            validate: (value) =>
                                                value === password || "Las contraseñas no coinciden.",
                                        })}
                                    />
                                    {errors.confirmPassword && (
                                        <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
                                    )}
                                </div>
                            </div>


                            <button
                                type="submit"
                                className="w-full shadow-md rounded-lg text-sm bg-gray-800 text-white py-1"
                            >
                                Modificar contraseña
                            </button>
                        </form>
                    </>

                )
            }

        </div>
    )
}

export default ResetPassword