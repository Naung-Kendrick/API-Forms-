import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import type { AppState } from "../store"
import { Navigate } from "react-router-dom";

function AdminProtected({ children }: {children: ReactNode}) {
    const { user } = useSelector((state: AppState) => state.auth);

    if (!user || user.role !== 1) {
        return <Navigate to={"/login"} replace={true} />
    } else {
        return children
    }
}

export default AdminProtected