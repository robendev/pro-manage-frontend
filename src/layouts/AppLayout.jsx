import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import SideBar from "../components/SideBar"

const AppLayout = () => {
  const { isPending, isError, data, error, logout } = useAuth();

  return (
    <>
      <SideBar logout={ logout } userData={data} />

      <main className="w-[calc(100%-3.5rem)] sm:w-[calc(100%-4rem)] max-w-7xl mx-auto ml-14 sm-500:ml-16
                       flex-1 flex flex-col
                       bg-white rounded-sm shadow">
        {
          isError ? (<Navigate to={"/"} />) : (data && <Outlet context={{ userData: data }} />)
        }
      </main>
    </>
  )
}

export default AppLayout