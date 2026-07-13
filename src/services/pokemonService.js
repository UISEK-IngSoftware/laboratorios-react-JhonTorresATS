import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;  // Debe estar en .env
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// --- Función para obtener token ---
const getAccessToken = async () => {
    // Si ya hay token en localStorage y no ha expirado, lo devolvemos
    const token = localStorage.getItem('access_token');
    if (token) {
        // Opcional: podrías verificar expiración, pero por ahora lo usamos
        return token;
    }

    try {
        // Usamos client_credentials (no necesita usuario)
        const formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        formData.append('client_id', CLIENT_ID);
        formData.append('client_secret', CLIENT_SECRET);

        const response = await axios.post(`${AUTH_BASE_URL}/o/token/`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const newToken = response.data.access_token;
        localStorage.setItem('access_token', newToken);
        return newToken;
    } catch (error) {
        console.error("Error obteniendo token:", error.response?.data || error.message);
        throw error;
    }
};

// --- Interceptor para agregar el token a cada petición ---
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("No se pudo obtener el token para la petición");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- Interceptor para manejar 401 (token expirado) ---
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Borrar token y reintentar (opcional)
            localStorage.removeItem('access_token');
            // Podrías redirigir a login si usas password grant
        }
        return Promise.reject(error);
    }
);

// --- Exportar la función ---
export const getPokemonsList = async () => {
    try {
        const response = await apiClient.get('/pokemons/');
        return response.data;
    } catch (error) {
        console.error("Error fetching pokemons:", error);
        throw error;
    }
};