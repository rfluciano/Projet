/* eslint-disable no-unused-vars */
import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
      },
})

axiosClient.interceptors.request.use((config)=> {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}` 
    return config;
})

axiosClient.interceptors.response.use((response)=> {
    return response;
},
    (error)=>{
        const {response}= error;
        if(response.status === 401){
            localStorage.removeItem('ACCESS_TOKEN')
            console.log(response);
        }else{
            console.log("error");
            throw error;            
        }
    }
)

export default axiosClient;