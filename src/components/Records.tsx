import { Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Toaster } from "sonner";
import { Activity, LogOut } from "lucide-react";
import type { Doctor } from "../types";
import { useQueryClient } from "@tanstack/react-query";

type RecordsProps = {
    data: Doctor
}

export default function Records({data} : RecordsProps) {

    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['doctor']})
    }

  return (
    <>
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">ROMI</h1>
                            <p className="text-sm text-gray-600">Asistente Médico</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Bienvenido</p>
                            <p className="font-medium text-gray-900">Dr(a). {data.nameDoctor}</p>
                        </div>
                        <button
                            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-2"
                            onClick={logout}
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-8">
            <main className="max-w-6xl mx-auto px-4">
                <NavigationTabs />
                <Outlet />
            </main>
        </div>
        
        <Toaster position="top-right" />
    </>
  )
}