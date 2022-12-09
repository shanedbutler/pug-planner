import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../dashboard/Dashboard"
import { GameDetails } from "../game/GameDetails"

export const AdminViews = () => {

    // <Route path="/signup/:id" element={<SignUp />} />
    // <Route path="/game-management" element={<GameAdmin />} />
    // <Route path="/player-management" element={<UserAdmin />} />
    
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
    )
}