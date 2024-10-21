import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/AuthApi.js";
import { showToast } from "../../utils/toast.js";
import FormCreateAccount from "../../components/Auth/FormCreateAccount.jsx";

const RegisterView = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      showToast("error", error.message);
      reset();
    },
    onSuccess: (response) => {
      showToast("success", response.message);
      reset();
      navigate("/")
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex-1 flex flex-col p-1 gap-1
                    sm-500:p-2 sm-500:gap-2
                    md:p-4 md:gap-4">
      <div>
        <h1 className="text-center font-bold line-clamp-2">
          Regístrate y Únete a Nuestra Comunidad
        </h1>
        <p>
          Bienvenido a <span className="text-azul-brillante font-bold">Pro Manage</span>! Estamos encantados de que
          hayas decidido unirte a nuestra comunidad. Al registrarte, podrás
          acceder a una amplia gama de funcionalidades que te ayudarán a
          gestionar tus proyectos de manera eficiente. ¡Completa el formulario
          a continuación para comenzar!
        </p>
      </div>


      <div>
        <p>
          Al registrarte, podrás disfrutar de las siguientes ventajas:
        </p>
        <ul className=" list-decimal list-inside ml-5">
          <li>Creación y Gestión de Proyectos</li>
          <li>Agregar Tareas y Colaboradores</li>
          <li>Acceso a Herramientas Avanzadas</li>
          <li>Soporte y Actualizaciones</li>
        </ul>
      </div>

      <div>
        <p>
          Para completar el registro, sigue estos sencillos pasos:
        </p>
        <ul className="list-decimal list-inside ml-5">
          <li>Ingresa tu Nombre de Usuario</li>
          <li>Proporciona tu Dirección de Correo Electrónico</li>
          <li>Crea una Contraseña Segura</li>
          <li>Haz Clic en "Registrarse"</li>
        </ul>
      </div>


      <p>
        Estamos emocionados de tenerte como parte de nuestra
        comunidad.¡Esperamos que disfrutes de tu experiencia con nosotros!
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-80 mx-auto 
                   p-4 space-y-4 my-4 rounded-sm shadow
                   bg-gray-100"
        noValidate
      >
        <h1 className="text-center font-bold">Registrarse</h1>
        <FormCreateAccount
          register={register}
          errors={errors}
          watch={watch}
        />
        <button
          type="submit"
          className="w-full bg-azul-brillante rounded-3xl text-white font-bold py-1 px-2 tracking-wide"
        >
          Registrarse
        </button>
      </form>

    </div>
  );
};

export default RegisterView;
