import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../dashboard/Dashboard"

export const PlayerViews = () => {

    //<Route path="/signup/:id" element={<SignUp />} />

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    )
}