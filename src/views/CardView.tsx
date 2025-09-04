import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../api/PatientsAPI";
import { User, Mail, Activity, Eye } from 'lucide-react';

export default function CardView() {

    const { data, isLoading } = useQuery({
        queryFn: getPatients,
        queryKey: ['patients'],
        retry: 1,
        refetchOnWindowFocus: false
    })

    if(isLoading) return 'Cargando...'

    if(data) return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {patient.age} años
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {patient.email}
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <Activity className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Síntomas:
                    </p>
                    <p className="text-sm text-gray-600">{patient.symptoms}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
