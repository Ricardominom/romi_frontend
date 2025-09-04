export type Doctor = {
    nameDoctor: string
    emailDoctor: string
    id: string
}

export type Patient = {
    name: string
    age: number
    symptoms: string
    email: string
    id: string
}

export type Patients = Patient[]

export type PatientForm = Omit<Patient, 'id'>

export type RegisterForm = Pick<Doctor, 'nameDoctor' | 'emailDoctor'> & {
    password: string
    password_confirmation: string
}

export type LoginForm = Pick<Doctor, 'emailDoctor'> & {
    password: string
}