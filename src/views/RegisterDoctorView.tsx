import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Activity } from "lucide-react";
import type { RegisterForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from '../config/axios'

export default function RegisterDoctorView() {

  const navigate = useNavigate()
  const initialValues : RegisterForm = {
    nameDoctor: '',
    emailDoctor: '',
    password: '',
    password_confirmation: ''
  }

  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues})

  const password = watch('password')

  const handleRegister = async(formData : RegisterForm) => {
    try {
      const { data } = await api.post(`/auth/register-doctor`, formData)
      toast.success(data)
      reset()
      navigate('/auth/login')
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
        <h2 className="text-3xl font-bold text-gray-900">Crear cuenta</h2>
        <p className="text-gray-600 mt-2">Regístrate como doctor en ROMI</p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6"
      >
        <div className="space-y-2">
          <label htmlFor="nameDoctor" className="block text-sm font-medium text-gray-700">
            Nombre del Doctor
          </label>
          <input
            id="nameDoctor"
            type="text"
            placeholder="Tu nombre completo"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            {...register('nameDoctor', {
              required: "El nombre del doctor es obligatorio"
            })}
          />
          {errors.nameDoctor && <ErrorMessage>{errors.nameDoctor.message}</ErrorMessage>}
        </div>

        <div className="space-y-2">
          <label htmlFor="emailDoctor" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="emailDoctor"
            type="email"
            placeholder="doctor@ejemplo.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
             {...register('emailDoctor', {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
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
            placeholder="Mínimo 8 caracteres"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
             {...register('password', {
              required: "El password es obligatorio",
              minLength: {
                value: 8,
                message: "El password debe tener minimo 8 caracteres"
              }
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password_confirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Confirmar Contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite tu contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
             {...register('password_confirmation', {
              required: "Se requiere confirmar password",
              validate: (value) => value === password || 'Los passwords no son iguales'
            })}
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Crear Cuenta
        </button>
      </form>

      <div className="text-center mt-6">
        <Link
          className="text-pink-500 hover:text-pink-600 font-medium"
          to={"/auth/login"}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  );
}