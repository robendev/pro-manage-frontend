import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/AuthApi.js";
import { showToast } from "../../utils/toast.js";
import FormCreateAccount from "../../components/Auth/FormCreateAccount.jsx";

const RegisterView = () => {
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
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row lg:space-x-2 p-4">
      <section className="lg:flex-1">
        <div className="py-4 border-b-2 border-gray-100">
          <h1 className="text-center font-bold mb-2 line-clamp-2">
            Regístrate y Únete a Nuestra Comunidad
          </h1>
          <p>
            Bienvenido a <span>Pro Manage</span>! Estamos encantados de que
            hayas decidido unirte a nuestra comunidad. Al registrarte, podrás
            acceder a una amplia gama de funcionalidades que te ayudarán a
            gestionar tus proyectos de manera eficiente. ¡Completa el formulario
            a continuación para comenzar!
          </p>
        </div>

        <div className="py-4 border-b-2 border-gray-100">
          <p className="mb-2">
            Al registrarte, podrás disfrutar de las siguientes ventajas:
          </p>
          <ul className="list-disc list-inside">
            <li>Creación y Gestión de Proyectos</li>
            <li>Agregar Tareas y Colaboradores</li>
            <li>Acceso a Herramientas Avanzadas</li>
            <li>Soporte y Actualizaciones</li>
          </ul>
        </div>

        <div className="py-4 border-b-2 border-gray-100">
          <p className="mb-2">
            Para completar el registro, sigue estos sencillos pasos:
          </p>
          <ol className="list-decimal list-inside">
            <li>Ingresa tu Nombre de Usuario</li>
            <li>Proporciona tu Dirección de Correo Electrónico</li>
            <li>Crea una Contraseña Segura</li>
            <li>Haz Clic en "Registrarse"</li>
          </ol>
        </div>
      </section>
      <section className="lg:max-w-96 lg:flex-1 flex flex-col justify-evenly">
        <div className="py-4">
          <p>
            Estamos emocionados de tenerte como parte de nuestra
            comunidad.¡Esperamos que disfrutes de tu experiencia con nosotros!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[98%] max-w-96 mx-auto p-4 mb-4 space-y-4 shadow-md rounded-lg bg-gray-100"
        >
          <h2 className="text-center font-bold">Registrarse</h2>
          <FormCreateAccount
            register={register}
            errors={errors}
            watch={watch}
          />
          <button
            type="submit"
            className="w-full shadow-md rounded-lg text-sm bg-gray-800 text-white py-1"
          >
            Registrarse
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegisterView;
