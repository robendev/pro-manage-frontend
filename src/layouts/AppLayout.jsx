import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import SideBar from "../components/SideBar"

const AppLayout = () => {
  const { isPending, isError, data, error, logout } = useAuth()
  return (
    <div className="flex flex-col justify-between min-h-screen text-gray-800 px-4 py-4 ml-20">
      <SideBar logout={ logout } />

      <main className="container mx-auto flex-1 flex">
        {
          isError ? (<Navigate to={"/"} />) : (data && <Outlet />)
        }
      </main>
    </div>
  )
}

export default AppLayout