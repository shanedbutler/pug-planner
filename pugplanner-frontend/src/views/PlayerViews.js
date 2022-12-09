import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../dashboard/Dashboard"
import { GameDetails } from "../game/GameDetails"

export const PlayerViews = () => {

    //<Route path="/signup/:id" element={<SignUp />} />

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
    )
}