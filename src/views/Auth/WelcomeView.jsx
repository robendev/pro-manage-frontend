import { Link } from "react-router-dom";

const WelcomeView = () => {
  return (
    <div className="flex-1 flex flex-col justify-evenly p-4">
      <div className="py-4 border-b-2 border-gray-100">
        <h1 className="text-center font-bold mb-2 line-clamp-2">
          Bienvenido a la Administración de Proyectos
        </h1>
        <p>
          Aquí puedes crear y gestionar tus proyectos, agregar tareas y
          colaboradores.
        </p>
      </div>

      <div className="py-4 border-b-2 border-gray-100">
        <h2 className="font-semibold mb-2">Funcionalidades Principales</h2>
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
      <div className="pt-4 pb-1">
        <h2 className="font-semibold mb-2">¿Ya tienes una cuenta?</h2>
        <p>
          <i className="fas fa-sign-in-alt mr-2"></i>
          <Link to="/login">Iniciar Sesión</Link>
        </p>
      </div>
      <div className="pb-4 pt-1 border-b-2 border-gray-100">
        <h2 className="font-semibold mb-2">¿Aún no tienes una cuenta?</h2>
        <p>
          <i className="fas fa-user-plus mr-2"></i>
          <Link to="/register">Registrarse</Link>
        </p>
      </div>
      <div className="py-4">
        <h2 className="font-semibold mb-2">Tutorial</h2>
        <p>
          <i className="fas fa-book mr-2"></i>
          ¿Nuevo en la aplicación? <Link to="/tutorial">
            Ver el tutorial
          </Link>{" "}
          para aprender cómo empezar.
        </p>
      </div>
    </div>
  );
};

export default WelcomeView;
