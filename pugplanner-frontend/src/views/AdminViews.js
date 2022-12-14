import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../dashboard/Dashboard"
import { GameDetails } from "../game/GameDetails"
import { GameForm } from "../game/GameForm";

export const AdminViews = () => {

    // <Route path="/signup/:id" element={<SignUp />} />
    // <Route path="/player-management" element={<UserAdmin />} />
    
    const isAdmin = true;
    
    return (
        <Routes>
            <Route path="/" element={<Dashboard isAdmin={isAdmin} />} />
            <Route path="/game/:id" element={<GameDetails isAdmin={isAdmin} />} />
            <Route path="/new-game" element={<GameForm />} />
        </Routes>
    )
}