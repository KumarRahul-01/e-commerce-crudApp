import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoints";

const filterByBrand = async (selectedBrand) => {
  try {

    const brandQuery = selectedBrand&&selectedBrand.map((brand)=>encodeURIComponent(brand)).join(",");
    const { data } = await axiosInstance.get(`/product/filter/brand?brand=${brandQuery}`)
    return data; 

  } catch (err) {
    console.log("Error fetching filtered products by brand:", err);
    throw err; 
}
};

export default filterByBrand;
