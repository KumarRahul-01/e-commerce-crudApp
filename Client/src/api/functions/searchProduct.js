import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoints";

const searchProduct = async (searchQuery) => {
  try {
    const { data } = await axiosInstance.post(endPoints.search, { search: searchQuery });
    return data; 
  } catch (err) {
    console.log("Error fetching search results:", err);
    throw err; 
  }
};

export default searchProduct;
