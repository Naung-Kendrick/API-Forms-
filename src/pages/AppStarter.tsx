import { Outlet } from "react-router-dom"

function AppStarter() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-300">
        <Outlet />
    </div>
  )
}

export default AppStarter

