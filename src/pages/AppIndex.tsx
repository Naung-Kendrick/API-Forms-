import { useSelector } from "react-redux"
import type { AppState } from "../store"

function AppIndex() {
  const { user, token } = useSelector((state: AppState) => state.auth);

  return (
    <div>
      <h1 className="w-52">{token}</h1>

      <div>
        <h1>{user?.name}</h1>
        <h1>{user?.email}</h1>
      </div>
    </div>
  )
}

export default AppIndex