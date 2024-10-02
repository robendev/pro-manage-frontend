import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100 text-gray-800 px-4">
      <header className="flex justify-evenly md:justify-around items-center container mx-auto my-2 gap-1 bg-white shadow-md rounded-lg">
        <div className="w-20">
          <Logo />
        </div>

        <form className="grid grid-cols-2 gap-1 lg:grid-cols-3 p-0.5 max-w-[536px] h-full">
          <div className="col-start-1 lg:col-start-1 w-full">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="shadow-md rounded-lg py-0.5 pl-4 text-xs border border-gray-100 w-full"
            />
          </div>

          <div className="col-start-1 row-start-2 lg:row-start-1 lg:col-start-2 w-full">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              type="text"
              id="password"
              placeholder="Contraseña"
              className="shadow-md rounded-lg py-0.5 pl-4 text-xs border border-gray-100 w-full"
            />
          </div>

          <div className="max-w-44 col-start-2 row-start-1 row-span-2 lg:row-span-1 lg:col-start-3 w-full">
            <button className="shadow-md rounded-lg text-xs w-full h-full bg-gray-800 text-white">
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
