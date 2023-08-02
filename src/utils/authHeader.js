import { useAuthStore } from "../store/authStore";

export const authHeader = () => {
    const authStore = useAuthStore();
    const { token } = authStore;
  
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }