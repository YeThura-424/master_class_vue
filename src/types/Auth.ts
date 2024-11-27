export interface Login {
  email: string
  password: string
}

export interface Register extends Login {
  confirmPassword: string
  username: string
  firstname: string
  lastname: string
}
