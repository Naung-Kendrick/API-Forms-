import { Outlet } from "react-router-dom"
import { useLoadUserQuery } from "../store/appApi"

function AppStarter() {
  const { isLoading } = useLoadUserQuery();

  if (isLoading) {
    return <h1>Loading ....</h1>
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-300">
        <Outlet />
    </div>
  )
}

export default AppStarter