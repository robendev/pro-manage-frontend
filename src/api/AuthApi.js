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
