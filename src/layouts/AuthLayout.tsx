import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="flex items-center justify-center min-h-screen py-12 px-4">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  )
}