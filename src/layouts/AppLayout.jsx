import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import SideBar from "../components/SideBar"

const AppLayout = () => {
  const { isPending, isError, data, error, logout } = useAuth()
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100 text-gray-800 px-4 pt-1">
      <SideBar logout={ logout } />

      <main className="ml-20 flex-1 flex pb-3">
        {
          isError ? (<Navigate to={"/"} />) : (data && <Outlet />)
        }

      </main>

      <footer className="bg-white ml-20 text-center py-2 shadow-md rounded-lg font-bold">
        Todos los derechos reservados {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default AppLayout