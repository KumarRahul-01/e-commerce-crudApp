import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoints";

const filterBySize = async (selectedSize) => {
  try {

    const sizeQuery = selectedSize&&selectedSize.map((size)=>encodeURIComponent(size)).join(",");
    const { data } = await axiosInstance.get(`/product/filter/size?size=${sizeQuery}`)
    return data; 

  } catch (err) {
    console.log("Error fetching filtered products by size:", err);
    throw err; 
}
};

export default filterBySize;
