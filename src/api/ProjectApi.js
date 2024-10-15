import { fetchWithInterceptors } from "./Interceptors";

export const createProject = async (formData) => {
  try {
    const response = await fetchWithInterceptors(
      `${import.meta.env.VITE_BACKEND_URL}/projects`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      },
      true
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllProjects = async () => {
  try {
    const response = await fetchWithInterceptors(
      `${import.meta.env.VITE_BACKEND_URL}/projects`,
      {
        method: "GET",
      },
      true
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProjectById = async (projectId) => {
  try {
    const response = await fetchWithInterceptors(
      `${import.meta.env.VITE_BACKEND_URL}/projects/${projectId}`,
      {
        method: "GET",
      },
      true
    );
    return response;
  } catch (error) {
    throw error;
  }
};
