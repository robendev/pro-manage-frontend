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
    mutateRecoverAccount({email: emailRecoverAccount})
  }

  return (
    <div className="flex-1 flex flex-col justify-evenly p-4 space-y-2 *:px-2 *:pb-4 *:space-y-2 *:border-b *:border-gray-400">
      <div className="">
        <h1 className="text-center font-bold line-clamp-2">
          Bienvenido a la Administración de Proyectos
        </h1>
        <p>
          Aquí puedes crear y gestionar tus proyectos, agregar tareas y
          colaboradores.
        </p>
      </div>

      <div className="">
        <h2 className="font-semibold">Funcionalidades Principales</h2>
        <ul className="pl-5">
          <li>
            <i className="fas fa-folder mr-2"></i> Crear y gestionar proyectos
          </li>
          <li>
            <i className="fas fa-list-alt mr-2"></i>
            Agregar tareas a los proyectos
          </li>
          <li>
            <i className="fas fa-users mr-2"></i>
            Agregar colaboradores a las tareas
          </li>
        </ul>
      </div>

      <div className="">
        <h2 className="font-semibold">¿Ya tienes una cuenta?</h2>
        <p>
          <i className="fas fa-sign-in-alt mr-2"></i>
          <a href="#top">Iniciar Sesión</a>
        </p>
      </div>

      <div>
        <h2 className="font-semibold">¿Aún no haz confirmado tu cuenta?</h2>
        <h3>¡Solicita un nuevo token de confirmación!</h3>
        <div className="relative flex items-center gap-2">
          <label htmlFor="emailConfirmation" className="block text-gray-700 sr-only">
            Email
          </label>
          <input
            type="email"
            id="emailConfirmation"
            name="emailConfirmation"
            placeholder="Email"
            value={emailConfirmation}
            onChange={handleChange}
            className="w-full max-w-[180px]
                       px-4 py-1
                       border
                       bg-gray-50
                       shadow-md rounded-lg 
                       text-xs focus:outline-none"
            autoComplete="new-password"
          />
          <button onClick={handleRequestToken} className="shadow-md rounded-lg 
                                                          border border-transparent 
                                                          px-4 py-1 
                                                          bg-gradient-to-tr from-gray-700 to-gray-800 
                                                          text-white text-xs 
                                                          disabled:bg-gradient-to-tr disabled:from-gray-700/75 disabled:to-gray-800/75" disabled={emailConfirmation === ""}>Solicitar Token</button>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">¿No puedes iniciar sesión?</h2>
        <h3>¡Recupera el acceso a tu cuenta!</h3>
        <div className="relative flex items-center gap-2">
          <label htmlFor="emailRecoverAccount" className="block text-gray-700 sr-only">
            Email
          </label>
          <input
            type="email"
            id="emailRecoverAccount"
            name="emailRecoverAccount"
            placeholder="Email de Recuperación"
            value={emailRecoverAccount}
            onChange={handleChangeEmailRecoverAccount}
            className="w-full max-w-[180px]
                       px-4 py-1
                       border
                       bg-gray-50
                       shadow-md rounded-lg 
                       text-xs focus:outline-none"
            autoComplete="new-password"
          />
          <button onClick={handleRecoverAccount} className="shadow-md rounded-lg 
                                                            border border-transparent 
                                                            px-4 py-1 
                                                            bg-gradient-to-tr from-gray-700 to-gray-800 
                                                            text-white text-xs 
                                                            disabled:bg-gradient-to-tr disabled:from-gray-700/75 disabled:to-gray-800/75" disabled={emailRecoverAccount === ""}>Enviar</button>
        </div>
      </div>

      <div className="">
        <h2 className="font-semibold">¿Aún no tienes una cuenta?</h2>
        <p>
          <i className="fas fa-user-plus mr-2"></i>
          <Link to="/auth/create-account">Registrarse</Link>
        </p>
      </div>

      <div className="">
        <h2 className="font-semibold">Tutorial</h2>
        <p>
          <i className="fas fa-book mr-2"></i>
          ¿Nuevo en la aplicación? <Link to="">Ver el tutorial</Link> para
          aprender cómo empezar.
        </p>
      </div>
    </div>
  );
};

export default WelcomeView;
