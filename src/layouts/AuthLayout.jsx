import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { showToast } from "../utils/toast";
import { loginAccount } from "../api/AuthApi";
import Logo from "../components/Logo";
import { useAuth } from "../hooks/useAuth";

const AuthLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { isPending, isError, data, error, logout } = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(!!data);

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
      navigate("/projects")
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  useEffect(() => { resetForm() }, [location, resetForm])

  useEffect(() => {
    setIsLoggedIn(!!data);
  }, [data]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col min-h-screen 
                  text-gray-800
                    px-2 py-2 md:px-4 md:py-4 
                    space-y-2 md:space-y-4">
      <header
        id="top"
        className="flex justify-around items-center
                  container mx-auto
                  shadow-md rounded-lg
                  bg-gradient-to-tr from-gray-200 to-gray-300"
      >
        <div className="w-20">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="space-x-4 flex items-center">
            <Link to={"/projects"} className="shadow-md rounded-lg 
                                              border border-transparent 
                                              px-4 py-1 
                                              bg-gradient-to-tr from-gray-700 to-gray-800
                                              text-white text-xs hover:text-white">
              Ir a Proyectos
            </Link>

            <button type='button' className="text-xl" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-1 lg:grid-cols-3 max-w-[536px] h-full"
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
                className={`border 
                            shadow-md rounded-lg
                            py-1 px-4 
                            text-xs 
                            w-full
                            bg-gray-50
                            focus:outline-none ${errors.emailLogin ? "border-red-300 placeholder:text-red-400 font-light" : "border-gray-100"} `}
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
                className={`border 
                  shadow-md rounded-lg
                  py-1 px-4 
                  text-xs 
                  w-full
                  bg-gray-50
                  focus:outline-none ${errors.passwordLogin ? "border-red-300 placeholder:text-red-400 font-light" : "border-gray-100"} `}
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
                className="w-full h-full shadow-md rounded-lg 
                           text-xs text-white font-bold
                           bg-gradient-to-tr from-gray-700 to-gray-800
                           border border-transparent"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        )}
      </header>

      <main className="container mx-auto 
                       flex-1 flex flex-col justify-center items-center
                       bg-gradient-to-tr from-gray-200 to-gray-300
                       shadow-md rounded-lg">
        <Outlet />
      </main>

      {/* <footer className="container mx-auto my-2 p-4 text-center font-bold bg-gradient-to-tr from-gray-200 to-gray-300 shadow-md rounded-lg">
        Todos los derechos reservados {new Date().getFullYear()}
      </footer> */}
    </div>
  );
};

export default AuthLayout;
