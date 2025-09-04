import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDoctor } from "../api/PatientsAPI";
import Records from "../components/Records";

export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getDoctor,
        queryKey: ['doctor'],
        retry: 1,
        refetchOnWindowFocus: false
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to={'/auth/login'} />
    if(data) return <Records data={data} />
}