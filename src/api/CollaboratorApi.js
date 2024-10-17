import { fetchWithInterceptors } from "./Interceptors";

export const findCollaboratorByEmail = async (formData) => {
  try {
    const response = await fetchWithInterceptors(
      `${import.meta.env.VITE_BACKEND_URL}/collaborators/find-collaborator`,
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
export const addCollaboratorById = async (formData) => {
  try {
    const response = await fetchWithInterceptors(
      `${import.meta.env.VITE_BACKEND_URL}/collaborators/add-collaborator`,
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
export const removeCollaboratorById = async (formData) => {
  try {
    const response = await fetchWithInterceptors(
      `${import.meta.env.VITE_BACKEND_URL}/collaborators/remove-collaborator`,
      {
        method: "DELETE",
        body: JSON.stringify(formData),
      },
      true
    );
    return response;
  } catch (error) {
    throw error;
  }
};