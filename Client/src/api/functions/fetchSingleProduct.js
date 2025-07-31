import { axiosInstance } from "../axiosInstance/axiosInstance"
import { endPoints } from "../endPoints/endPoints"

const fetchSingleProduct = async(id)=>{
    try{
        const {data}= await axiosInstance.get(`${endPoints.edit}/${id}`);
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export default fetchSingleProduct;