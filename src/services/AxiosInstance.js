import axios from "axios";

const AxiosInstance=axios.create({
    baseURL:"",
    timeout:100000,
    headers:{
        "Content-Type":"application/json"
    }
})

AxiosInstance.interceptors.request.use((config)=>{
    const token=localStorage.getItem("sd_token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

export default AxiosInstance;