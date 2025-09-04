import { isAxiosError } from "axios";
import api from "../config/axios";
import type { Doctor, Patients } from "../types";

export async function getDoctor(){
  try {
    const { data } = await api<Doctor>('/doctor')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getPatients() {
  try {
    const { data } = await api<Patients>('/patients')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}