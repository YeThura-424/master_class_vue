export const validateEmail = (email: string) => {
  const trimedEmail = email.trim()

  if (!trimedEmail) return []

  const errors = []
  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/

  const isValidEmail = emailRegex.test(trimedEmail)

  if (!isValidEmail) errors.push('Not a valid email format')

  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []

  const errors = []

  if (password.length <= 6) errors.push('Password must be at least 6 characters')

  return errors
}