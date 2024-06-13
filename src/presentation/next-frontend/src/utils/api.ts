import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
    response => response,
    error =>{
        if(error.response.status) {
            console.log(error.response.data);
        }
        return Promise.reject(error);
    }
)

export const fetcher = async (url: string) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const poster = async (url: string, data: any) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default api;