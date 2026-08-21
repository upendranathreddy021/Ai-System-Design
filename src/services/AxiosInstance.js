import axios from "axios";

const AxiosInstance=axios.create({
    baseURL:"",
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})

AxiosInstance.interceptors.request.use((config)=>{
    const token=sessionStorage.getItem("ticket");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

export default AxiosInstance;