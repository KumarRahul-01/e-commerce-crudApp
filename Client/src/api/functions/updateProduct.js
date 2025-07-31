import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoints";


const updateProduct = async({id,newdata}) =>{
    try{
        const {data} = await axiosInstance.post(`${endPoints.update}/${id}`,newdata)
        return data;
    }
    catch(error){
        throw error;
    }
}

export default updateProduct;