
import AxiosInstance from './AxiosInstance';
const UserService={
    postMethod:async (url,payload)=>{
        try{
        const res=await AxiosInstance.post(url,payload);
        return res.data;
        }catch(err){
            throw err.response.data || err;
        }
    },
    getMethod:async (url,payload)=>{
        try{
        const res= await AxiosInstance.get(url,payload)
        return res.data;
        }catch(err){
            throw err.response.data || err;
        }
    },
    putMethod:async (url,payload)=>{
        try{
        const res=await AxiosInstance.put(url,paylad);
        return res.data;
        }catch(err){
            throw err.response.data || err;
        }

    },
    deleteMethod:async(url)=>{
        try{
        const res=AxiosInstance.delete(url);
        return res.data;

        }catch(err){
            throw err.response.data || err;
        }
    }
}
export default UserService