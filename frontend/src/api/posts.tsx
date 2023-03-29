import axios from "axios";

export interface Empolyee {
    id: string;
    EmpId: string;
    FullName: string;
    DateOfBirth: Date;
    Address: string;
    Birthplace: string;
    PhoneNumber: string;
    Email: String;
    CreatedDate: Date;
    UpdatedDate: Date;
    avatarURL: string;
}

export const useApi = () => {
    const api = axios.create({
        baseURL: "http://101.99.31.151:3002/api/employees",
    });

    const getEmp = async (): Promise<any> => {
        const result = await api.get("/");
        return result;
    };

    const delEmp = async (Id: string): Promise<any> => {
        const resul = await api.delete(`/${Id}`);
        // .then(res=>{
        //     console.log(res);

        //     return res;
        //  }
        // )
        // .catch(error=>{
        //     console.log(error);
        //     return error;
        // })

        return resul;
    };

    const addEmp = async (data: any): Promise<any> => {
        const resul = await api
            .post("/", data)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return error;
            });
        return resul;
    };

    const patchEmp = async (id: string, data: any): Promise<any> => {
        const result = await api
            .patch('/id')
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
        return result;
    };

    const findEmp = async (id: string): Promise<any> => {
        const result = await api
            .get(`/${id}`)
            .then((res) => {
                
                return res;
            })
            .catch((error) => {
                return error;
            });
        return result;
    };

    const getCertificate=async (id:string)=>{        
        const resul=await api .get(`/${id}/certificates`)
        .then((res)=>{
            return res;
        })
        .catch((error)=>{
            return error;
        })
        
        return resul;
    }

    return {
        getEmp,
        delEmp,
        addEmp,
        patchEmp,
        findEmp,
        getCertificate
    };
};
export default useApi;
