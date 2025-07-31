import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoints";

const filterByColor = async (selectedColor) => {
  try {

    const colorQuery = selectedColor&&selectedColor.map((color)=>encodeURIComponent(color)).join(",");
    const { data } = await axiosInstance.get(`/product/filter/color?color=${colorQuery}`)
    return data; 

  } catch (err) {
    console.log("Error fetching filtered products by color:", err);
    throw err; 
}
};

export default filterByColor;
