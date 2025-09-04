import { Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeView() {

    const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      
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
            <button onClick={() => navigate('/auth/login')} className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600">
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      
      <section className="bg-gradient-to-r from-blue-50 to-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gestiona tus pacientes con 
            <span className="text-blue-500"> ROMI</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tu asistente médico digital para registrar, organizar y consultar información de pacientes de forma sencilla.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/register-patient')} className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-600">
              Registrar Paciente
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para comenzar con ROMI?
          </h3>
          <p className="text-xl text-white mb-8 opacity-90">
            Empieza a gestionar tus pacientes de forma más eficiente hoy mismo
          </p>
          <button onClick={() => navigate('/auth/register-doctor')} className="bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 shadow-lg">
            Registrarse como doctor
          </button>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-white py-1">
        <div className="max-w-6xl mx-auto px-4">
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 py-3">
            <p>&copy; 2024 ROMI Asistente Médico. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
