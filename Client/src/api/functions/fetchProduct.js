import { axiosInstance } from "../axiosInstance/axiosInstance"
import { endPoints } from "../endPoints/endPoints"

const fetchProduct = async()=>{
    try{
        const {data}= await axiosInstance.get(endPoints.products);
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export default fetchProduct;