export const fetchWithInterceptors = async (
  url,
  options,
  includeAuth = true
) => {
  let tokenJwt = null;

  if (includeAuth) {
    tokenJwt = localStorage.getItem("tokenJwt");

    // Asegúrate de que tokenJwt no sea null o undefined
    if (!tokenJwt) {
      throw new Error("JWT token is missing");
    }
  }

  const modifiedOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...(includeAuth && { Authorization: `Bearer ${tokenJwt}` }),
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, modifiedOptions);

    if (!response.ok) {
      // Intenta parsear el error como JSON, si no es posible, lanza un error genérico
      const errorMessage = await response.json();
      throw new Error(
        errorMessage.error || `Error: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    // Manejo de errores de red o cualquier otro error
    throw new Error(`Fetch error: ${error.message}`);
  }
};
