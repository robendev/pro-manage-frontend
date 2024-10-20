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
    <>
      <header
        id="top"
        className="w-full max-w-7xl mx-auto
                   flex justify-between items-center
                   bg-white rounded-sm shadow
                   p-1 gap-1
                   sm:px-2"
      >
        <div className="w-14
                        sm-500:w-16">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="w-full flex p-1 gap-1 justify-end items-center">
            <nav className="w-full flex justify-evenly p-1">
              <Link to={"/projects"} className="py-1 px-2 font-bold text-azul-brillante hover:text-azul-oscuro">Proyectos</Link>
              <Link to={"/tasks"} className="py-1 px-2 font-bold text-azul-brillante hover:text-azul-oscuro">Tareas</Link>
            </nav>

            <button
              type="button"
              className="min-w-max bg-gradient-to-r from-azul-brillante to-azul-oscuro rounded-3xl text-white font-bold py-1 px-2 tracking-wide"
              onClick={handleLogout}
            >
              Logout
              <i className="fa-solid fa-right-from-bracket ml-1"></i>
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md
                       flex p-1 gap-1
                       sm:gap-2"
            noValidate
          >
            <div className="w-2/3 flex flex-col justify-between gap-1">
              <div className="">
                <label htmlFor="emailLogin" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="emailLogin"
                  name="emailLogin"
                  placeholder={errors.emailLogin ? errors.emailLogin.message : "Email"}
                  className={`w-full py-1 px-4 outline-none rounded-3xl shadow bg-gray-100 placeholder:text-gris-oscuro/75
                    ${errors.emailLogin ? "border-red-300 placeholder:text-red-400 font-light" : "border-gray-100"} `}
                  {...register("emailLogin", {
                    required: {
                      value: true,
                      message: "El email es obligatorio.",
                    },
                  })}
                />
              </div>

              <div className="">
                <label htmlFor="passwordLogin" className="sr-only">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="passwordLogin"
                  name="passwordLogin"
                  placeholder={errors.passwordLogin ? errors.passwordLogin.message : "Contraseña"}
                  className={`w-full py-1 px-4 placeholder:text-gris-oscuro/75 outline-none rounded-3xl shadow bg-gray-100
                     ${errors.emailLogin ? "border-red-300 placeholder:text-red-400 font-light" : "border-gray-100"} `}
                  {...register("passwordLogin", {
                    required: {
                      value: true,
                      message: "La contraseña es obligatoria.",
                    },
                  })}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-1/3 bg-gradient-to-r from-azul-brillante to-azul-oscuro rounded-3xl text-white font-bold py-1 px-2 tracking-wide"
            >
              Login
              <i className="fa-solid fa-right-to-bracket ml-1"></i>
            </button>

          </form>
        )}
      </header>

      <main className="w-full max-w-7xl mx-auto
                       flex-1 flex flex-col
                       bg-white rounded-sm shadow">
        <Outlet />
      </main>

      {/* <footer className="container mx-auto my-2 p-4 text-center font-bold bg-gradient-to-tr from-gray-200 to-gray-300 shadow-md rounded-lg">
        Todos los derechos reservados {new Date().getFullYear()}
      </footer> */}
    </>
  );
};

export default AuthLayout;
