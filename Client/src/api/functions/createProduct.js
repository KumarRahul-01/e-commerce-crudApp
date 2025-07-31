import { axiosInstance } from "../axiosInstance/axiosInstance"
import { endPoints } from "../endPoints/endPoints"


const createProduct = async(newdata)=>{
    try {
        const {data} = await axiosInstance.post(endPoints.create,newdata)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export default createProduct;