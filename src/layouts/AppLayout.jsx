import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import SideBar from "../components/SideBar"

const AppLayout = () => {
  const { isPending, isError, data, error, logout } = useAuth()
  return (
    <div className="flex flex-col justify-between
                    min-h-screen 
                    text-gray-800
                    px-2 py-2 md:px-4 md:py-4 
                    ml-14">
      <SideBar logout={ logout } userData={data} />

      <main className="container mx-auto flex-1 flex">
        {
          isError ? (<Navigate to={"/"} />) : (data && <Outlet context={{ userData: data }} />)
        }
      </main>
    </div>
  )
}

export default AppLayout