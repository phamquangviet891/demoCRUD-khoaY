import axios from "axios";



export const CertificateApi = () => {
    const api = axios.create({
        baseURL: "http://101.99.31.151:3002/api/certificates",
    });

    const AddCertificate =async(data:any)=>
    {
        const resul=await api.post('/',data)
        .then(res=>{
            return res
        })
        .catch(error=>{
            return error
        })
        return resul;
    }

    const DelCertificate= async(id:string):Promise<any>=>{
        const resul=await api.delete(`/${id}`)
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })
        return resul;
    }

    const EditCertificate=async(id:string,data:any):Promise<any>=>{
        const resul=await api.patch(`/${id}`,data)
        .then(res=>{
            return res;
        })
        .catch(error=>{
            return error;
        })
        return resul;
    }

    return {
        DelCertificate,
        AddCertificate,
        EditCertificate
    }
}

export default CertificateApi;