import { fetchWithInterceptors } from "./Interceptors.js";

export const createAccount = async (formData) => {
  try {
    const response = await fetchWithInterceptors(
      `${import.meta.env.VITE_BACKEND_URL}/auth/create-account`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      },
      false // No incluir el token de autorización
    );
    // Si la respuesta es exitosa, puedes devolver los datos o realizar alguna acción adicional
    return response;
  } catch (error) {
    // Manejar los errores que devuelve el backend
    throw error; // Puedes lanzar el error nuevamente si necesitas manejarlo en otro lugar
  }
};
export const confirmAccount = async (otpToken6Digits) => {
  try {
    const response = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/auth/confirm-account`, {
      method: "POST",
      body: JSON.stringify(otpToken6Digits)
    },
    false);
    return response;
  } catch (error) {
    throw error;
  }
}
export const loginAccount = async ({ emailLogin, passwordLogin }) => {
  try {
    const response = await fetchWithInterceptors(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login-account`,
      {
        method: "POST",
        body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
      },
      false
    );
    localStorage.setItem("tokenJwt", response.tokenJwt)
    return response;
  } catch (error) {
    throw error;
  }
};
export const requestNewOtpToken6Digits = async (email) => {
  try {
    const response = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/auth/request-token`,
    {
      method: "POST",
      body: JSON.stringify(email)
    },
    false
  )
  return response
  } catch (error) {
    throw error;
  }
}
export const recoverAccount = async (email) => {
  try {
    const response = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/auth/recover-account`,
    {
      method: "POST",
      body: JSON.stringify(email)
    },
    false
  )
  return response
  } catch (error) {
    throw error;
  }
}
export const validateOtpTokenForPasswordReset = async (otpToken6Digits) => {
  try {
    const response = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/auth/validate-token`,
    {
      method: "POST",
      body: JSON.stringify(otpToken6Digits)
    },
    false
  )
  return response
  } catch (error) {
    throw error;
  }
}
export const resetPassword = async ({password, confirmPassword, otpToken6Digits}) => {
  try {
    const response = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-password/${otpToken6Digits}`,
    {
      method: "POST",
      body: JSON.stringify({password, confirmPassword})
    },
    false
  )
  return response
  } catch (error) {
    throw error;
  }
}
export const validateUser = async () => {
  try {
    const response = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/auth/validate-user`,
    {
      method: "GET",
    },
    true
  )
  return response
  } catch (error) {
    throw error;
  }
}