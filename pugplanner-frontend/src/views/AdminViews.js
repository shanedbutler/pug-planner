import { Route } from "react-router-dom"
import { Dashboard } from "../dashboard/Dashboard"

export const AdminViews = () => {

    // <Route path="/signup/:id" element={<SignUp />} />
    // <Route path="/game/:id" element={<Game />} />
    // <Route path="/game-management" element={<GameAdmin />} />
    // <Route path="/player-management" element={<UserAdmin />} />

    return (
        <Route path="/" element={<Dashboard />} />
    )
}