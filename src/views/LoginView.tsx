import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Activity } from "lucide-react";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import api from "../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export default function LoginView() {
  const navigate = useNavigate()
  const initialValues : LoginForm = {
    emailDoctor: "",
    password: ""
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async(formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData)
      localStorage.setItem('AUTH_TOKEN', data)
      reset()
      navigate('/records')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error)
      }
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-blue-500 p-3 rounded-lg">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ROMI</h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Iniciar sesión</h2>
        <p className="text-gray-600 mt-2">Accede a tu cuenta de doctor</p>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6"
        noValidate
      >
        <div className="space-y-2">
          <label htmlFor="emailDoctor" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="emailDoctor"
            type="email"
            placeholder="doctor@ejemplo.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            {...register("emailDoctor", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido"
              }
            })}
          />
          {errors.emailDoctor && <ErrorMessage>{errors.emailDoctor.message}</ErrorMessage>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Tu contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            {...register("password", {
              required: "El Password es obligatorio"
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>

      <div className="text-center mt-6">
        <Link
          className="text-pink-500 hover:text-pink-600 font-medium"
          to={"/auth/register-doctor"}
        >
          ¿No tienes cuenta? Crea una aquí
        </Link>
      </div>
    </div>
  );
}