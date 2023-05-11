import axios from "axios";



export const WorkingApi = () => {
    const api = axios.create({
        baseURL: "http://101.99.31.151:3002/api/departments",
    });
    const GetDepartment=async()=>{
        const resul= await api.get('/')
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })
        return resul;
    }

    const AddDeparment=async(el:any)=>{
        const resul=await api.post("/",el)
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })

        return resul;
    }
    const DelDeparment=async(id:string)=>{
        const resul=await api.delete(`/${id}`)
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })

        return resul;
    }
    const GetEmp=async(id:string)=>{
        const resul=await api.get(`/${id}/employees`)
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })
        return resul;
    }
    const AddEmp=async(id:string,emp:any)=>{
        const resul=await api.post(`/${id}/employees`,emp)
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })
        return resul;
    }

    return {
        GetDepartment,
        AddDeparment,
        DelDeparment,
        GetEmp,
        AddEmp
    }
}

export default WorkingApi;