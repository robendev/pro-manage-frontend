import { fetchWithInterceptors } from "./Interceptors";

export const getAllProjects = async () => {
    try {
        const response = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/projects`,
            {
                method: "GET"
            },
            true
        )
        return response;
    } catch (error) {
        throw error;
    }
}