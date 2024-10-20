import { useState } from "react";
import { Link } from "react-router-dom";
import { showToast } from "../../utils/toast";
import { useMutation } from "@tanstack/react-query";
import { recoverAccount, requestNewOtpToken6Digits } from "../../api/AuthApi";

const WelcomeView = () => {
  const [emailConfirmation, setEmailConfirmation] = useState("")
  const [emailRecoverAccount, setEmailRecoverAccount] = useState("")

  // Solicitar un nuevo token de confirmación
  const handleChange = (event) => {
    setEmailConfirmation(event.target.value)
  }

  const { mutate: mutateRequestNewOtpToken6Digits } = useMutation({
    mutationFn: requestNewOtpToken6Digits,
    onError: (error) => {
      showToast("error", error.message)
    },
    onSuccess: (response) => {
      showToast("success", response.message)
    }
  })

  const handleRequestToken = () => {
    setEmailConfirmation("")
    mutateRequestNewOtpToken6Digits({ email: emailConfirmation })
  }

  // Solicitar recuperación de la cuenta
  const handleChangeEmailRecoverAccount = (event) => {
    setEmailRecoverAccount(event.target.value)
  }

  const { mutate: mutateRecoverAccount } = useMutation({
    mutationFn: recoverAccount,
    onError: (error) => {
      showToast("error", error.message)
    },
    onSuccess: (response) => {
      showToast("success", response.message)
    }
  })

  const handleRecoverAccount = () => {
    setEmailRecoverAccount("")
    mutateRecoverAccount({ email: emailRecoverAccount })
  }

  return (
    <div className="flex-1 flex flex-col p-1 gap-1
                    sm-500:p-2 sm-500:gap-2
                    md:p-4">
      <h1 className="text-center font-bold line-clamp-2">
        Bienvenido a la Administración de Proyectos
      </h1>
      <p>
        Aquí puedes crear y gestionar tus proyectos, agregar tareas y
        colaboradores.
      </p>

      <div className="p-1 space-y-1 border-b-2 border-azul-claro
                      md:p-2 md:space-y-2">
        <h2 className="font-bold">Funcionalidades Principales</h2>
        <ul className="ml-5">
          <li>
            <i className="fas fa-folder mr-1"></i> Crear y gestionar proyectos
          </li>
          <li>
            <i className="fas fa-list-alt mr-1"></i>
            Agregar tareas a los proyectos
          </li>
          <li>
            <i className="fas fa-users mr-1"></i>
            Agregar colaboradores a las tareas
          </li>
        </ul>
      </div>

      <div className="p-1 space-y-1 border-b-2 border-azul-claro
                      md:p-2 md:space-y-2">
        <h2 className="font-bold">¿Ya tienes una cuenta?</h2>
        <a href="#top" className="text-azul-brillante hover:text-azul-oscuro ml-5">Iniciar Sesión<i className="fas fa-sign-in-alt ml-1 text-gris-oscuro"></i></a>
      </div>

      <div className="p-1 space-y-1 border-b-2 border-azul-claro
                      md:p-2 md:space-y-2">
        <h2 className="font-bold">¿Aún no tienes una cuenta?</h2>
          <Link to="/auth/create-account" className="text-azul-brillante hover:text-azul-oscuro ml-5">Registrarse<i className="fas fa-user-plus ml-1 text-gris-oscuro"></i></Link>
      </div>

      <div className="p-1 space-y-1 border-b-2 border-azul-claro
                      md:p-2 md:space-y-2">
        <h2 className="font-bold">¿Aún no haz confirmado tu cuenta?</h2>
        <h3>¡Solicita un nuevo token de confirmación!</h3>
        <div className="relative max-w-md
                        flex items-center p-1 gap-1">
          <label htmlFor="emailConfirmation" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="emailConfirmation"
            name="emailConfirmation"
            placeholder="Email"
            value={emailConfirmation}
            onChange={handleChange}
            className="w-2/3 py-1 px-4 outline-none rounded-3xl shadow bg-gray-100 placeholder:text-gris-oscuro/75"
            autoComplete="new-password"
          />
          <button onClick={handleRequestToken} 
                  className="w-1/3 bg-azul-brillante rounded-3xl text-white font-bold py-1 px-2 tracking-wide disabled:bg-gris-oscuro/75" 
                  disabled={emailConfirmation === ""}>Solicitar</button>
        </div>
      </div>

      <div className="p-1 space-y-1 border-b-2 border-azul-claro
                      md:p-2 md:space-y-2">
        <h2 className="font-bold">¿No puedes iniciar sesión?</h2>
        <h3>¡Recupera el acceso a tu cuenta!</h3>
        <div className="relative max-w-md 
                        flex items-center p-1 gap-1">
          <label htmlFor="emailRecoverAccount" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="emailRecoverAccount"
            name="emailRecoverAccount"
            placeholder="Email de Recuperación"
            value={emailRecoverAccount}
            onChange={handleChangeEmailRecoverAccount}
            className="w-2/3 py-1 px-4 outline-none rounded-3xl shadow bg-gray-100 placeholder:text-gris-oscuro/75"
            autoComplete="new-password"
          />
          <button onClick={handleRecoverAccount} 
                  className="w-1/3 bg-azul-brillante rounded-3xl text-white font-bold py-1 px-2 tracking-wide disabled:bg-gris-oscuro/75" 
                  disabled={emailRecoverAccount === ""}>Enviar</button>
        </div>
      </div>

      <div className="p-1 space-y-1 border-b-2 border-azul-claro
                      md:p-2 md:space-y-2">
        <h2 className="font-bold">Tutorial</h2>
        <p>
          <i className="fas fa-book mr-1"></i>
          ¿Nuevo en la aplicación? <Link to="" className="text-azul-brillante hover:text-azul-oscuro">Ver el tutorial</Link> para
          aprender cómo empezar.
        </p>
      </div>
    </div>
  );
};

export default WelcomeView;
