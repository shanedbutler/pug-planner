import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { AppNav } from './nav/AppNav';
import { ApplicationViews } from './views/ApplicationViews';
import { Authorized } from "./views/Authorized";

export const App = () => {

    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={
                <Authorized>
                    <>
                        <AppNav />
                        <ApplicationViews />
                    </>
                </Authorized>
            } />

        </Routes>
    )
}
