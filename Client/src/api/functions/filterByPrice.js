import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoints";

const filterByPrice = async (minPrice, maxPrice) => {
  try {
    const { data } = await axiosInstance.post(endPoints.filterByPrice, {
      priceRange: { minPrice, maxPrice },
    });
    console.log(data)
    return data;
  } catch (err) {
    console.log("Error fetching filtered products by price:", err);
    throw err;
  }
};

export default filterByPrice;
