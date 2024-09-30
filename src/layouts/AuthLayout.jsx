import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen *:p-4 bg-[#F8F9FA] text-gray-800">
      <header className="container mx-auto">
        <h1>AuthLayout</h1>
      </header>

      <main className="flex-1 container mx-auto">
        <Outlet />
      </main>

      <footer className="text-center">
        Todos los derechos reservados {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default AuthLayout;
