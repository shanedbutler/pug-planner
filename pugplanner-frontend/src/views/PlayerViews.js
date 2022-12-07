import { Route } from "react-router-dom"
import { Dashboard } from "../dashboard/Dashboard"
import { AppNav } from "../nav/AppNav"

export const PlayerViews = () => {

    //<Route path="/signup/:id" element={<SignUp />} />

    return (
        <Route path="/" element={<Dashboard />} />
    )
}