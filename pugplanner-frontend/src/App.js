import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Dashboard } from "./dashboard/Dashboard";
import { MainContent } from './format/MainContent';
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
                        {/* <Dashboard /> */}
                    </>
                </Authorized>
            } />

        </Routes>
    )
}
