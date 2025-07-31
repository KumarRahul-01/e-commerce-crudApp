import { axiosInstance } from "../axiosInstance/axiosInstance"
import { endPoints } from "../endPoints/endPoints"

const deleteProduct = async(id)=>{
    try{
        const {data}= await axiosInstance.delete(`${endPoints.delete}/${id}`);
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export default deleteProduct;