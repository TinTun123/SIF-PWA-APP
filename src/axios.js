import axios from "axios";

const currentHost = import.meta.env.VITE_API_BASE_URL;

export const axiosClient = axios.create({
  baseURL: `${currentHost}`,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  //   const userStore = useUserStore()
  //   config.headers.Authorization = `Bearer ${userStore.user?.token}`

  return config;
});
