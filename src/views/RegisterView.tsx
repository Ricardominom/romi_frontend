import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Activity, ArrowLeft } from "lucide-react";
import type { PatientForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import { toast, Toaster } from "sonner";
import { isAxiosError } from "axios";
import api from "../config/axios";

export default function RegisterView() {
  const initialValues: PatientForm = {
    name: "",
    age: 0,
    symptoms: "",
    email: ""
  };

  const {register, reset, handleSubmit, formState: { errors }} = useForm({ defaultValues: initialValues });

  const handleRegister = async (formData: PatientForm) => {
    try {
      const { data } = await api.post(`/register-patient`, formData)
      toast.success(data)
      reset()
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error)
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">ROMI</h1>
                <span className="text-gray-600">Asistente Médico</span>
              </div>
              <Link 
                to="/records"
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Ver Registros</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Registrar Nuevo Paciente
            </h2>
            <p className="text-gray-600">
              Completa la información del paciente para crear su registro médico
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre del Paciente
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nombre completo del paciente"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                {...register("name", {
                  required: "El nombre del paciente es obligatorio"
                })}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Edad
              </label>
              <input
                id="age"
                type="number"
                placeholder="Edad del paciente"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                {...register("age", {
                  required: "La edad del paciente es obligatoria"
                })}
              />
              {errors.age && (
                <ErrorMessage>{errors.age.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
                Síntomas
              </label>
              <textarea
                id="symptoms"
                rows={4}
                placeholder="Describe los síntomas que presenta el paciente"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                {...register("symptoms", {
                  required: "Los síntomas son obligatorios"
                })}
              ></textarea>
              {errors.symptoms && (
                <ErrorMessage>{errors.symptoms.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email de Contacto
              </label>
              <input
                id="email"
                type="email"
                placeholder="paciente@ejemplo.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido"
                  }
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Registrar Paciente
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-right"/>
    </>
  );
}