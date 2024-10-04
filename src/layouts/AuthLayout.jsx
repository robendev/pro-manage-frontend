import { Link, Outlet, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { showToast } from "../utils/toast";
import { loginAccount } from "../api/AuthApi";
import Logo from "../components/Logo";
import { useCallback, useEffect } from "react";

const AuthLayout = () => {
  const location = useLocation()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      emailLogin: "",
      passwordLogin: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: loginAccount,
    onError: (error) => {
      showToast("error", error.message);
      reset();
    },
    onSuccess: (response) => {
      showToast("success", response.message);
      reset();
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  useEffect(() => {resetForm()}, [location, resetForm])


  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100 text-gray-800 px-4">
      <header
        id="top"
        className="flex justify-evenly md:justify-around items-center container mx-auto my-2 gap-1 bg-white shadow-md rounded-lg"
      >
        <div className="w-20">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-1 lg:grid-cols-3 p-0.5 max-w-[536px] h-full"
          noValidate
        >
          <div className="col-start-1 lg:col-start-1 w-full">
            <label htmlFor="emailLogin" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="emailLogin"
              name="emailLogin"
              placeholder={errors.emailLogin ? errors.emailLogin.message : "Email"}
              className={`border shadow-md rounded-lg py-0.5 pl-4 text-xs w-full focus:outline-none ${errors.emailLogin ? "border-red-300 placeholder:text-red-400 font-light" : "border-gray-100"} `}
              {...register("emailLogin", {
                required: {
                  value: true,
                  message: "El email es obligatorio.",
                },
              })}
            />
          </div>

          <div className="col-start-1 row-start-2 lg:row-start-1 lg:col-start-2 w-full">
            <label htmlFor="passwordLogin" className="sr-only">
              Contraseña
            </label>
            <input
              type="password"
              id="passwordLogin"
              name="passwordLogin"
              placeholder={errors.passwordLogin ? errors.passwordLogin.message : "Contraseña"}
              className={`border shadow-md rounded-lg py-0.5 px-4 text-xs w-full focus:outline-none ${errors.passwordLogin ? "border-red-300 placeholder:text-red-400 font-light" : "border-gray-100"} `}
              {...register("passwordLogin", {
                required: {
                  value: true,
                  message: "La contraseña es obligatoria.",
                },
              })}
            />
          </div>

          <div className="max-w-44 col-start-2 row-start-1 row-span-2 lg:row-span-1 lg:col-start-3 w-full">
            <button
              type="submit"
              className="shadow-md rounded-lg text-xs w-full h-full bg-gray-800 text-white"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </header>

      <main className="container mx-auto flex-1 flex flex-col justify-center items-center bg-white shadow-md rounded-lg">
        <Outlet />
      </main>

      <footer className="container mx-auto my-2 p-4 text-center font-bold bg-white shadow-md rounded-lg">
        Todos los derechos reservados {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default AuthLayout;
