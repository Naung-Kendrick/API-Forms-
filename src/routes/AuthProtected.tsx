import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import type { AppState } from "../store"
import { Navigate } from "react-router-dom";

function AuthProtected({ children }: {children: ReactNode}) {
    const { user } = useSelector((state: AppState) => state.auth);

    if (user) {
        return <Navigate to={"/"} replace={true} />
    } else {
        return children
    }
}

export default AuthProtected