import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import AuthLayout from "./layouts/AuthLayout";
import RegisterDoctorView from "./views/RegisterDoctorView";
import AppLayout from "./layouts/AppLayout";
import CardView from "./views/CardView";
import TableView from "./views/TableView";
import HomeView from "./views/HomeView";

export default function Router () {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register-doctor" element={<RegisterDoctorView />} />
                </Route>

                <Route path="/records" element={<AppLayout />}>
                    <Route index={true} element={<CardView />} />
                    <Route path="table" element={<TableView />} />
                </Route>

                    <Route path="/" element={<HomeView />} />

                <Route>
                    <Route path="/register-patient" element={<RegisterView />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}