import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import fetchProduct from '../api/functions/fetchProduct';
import deleteProduct from '../api/functions/deleteProduct';
import fetchSingleProduct from '../api/functions/fetchSingleProduct';
import createProduct from '../api/functions/createProduct';
import { useNavigate } from "react-router-dom";
import updateProduct from '../api/functions/updateProduct';


export const useProductCreateQuery = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log(data);

      if (data?.status === true) {
       
        queryClient.invalidateQueries({ queryKey: ["product"] });
        navigate("/");
      }
    },
  });
}
export const useFetchQuery = () => {
    return useQuery({
      queryKey: ["products"],
      queryFn: fetchProduct,
    });
  };

  export const useProductDeleteQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id }) => deleteProduct(id),
      onSuccess: (data) => {
        console.log("Mutation success data:", data);
        if (data?.status === true) {
          console.log("inside if");
          queryClient.invalidateQueries({ queryKey: ["products"] });
        }
      },
    });
  };


  export const useFetchSingleProduct = (id) => {
    return useQuery({
      queryKey: ["products", id],
      queryFn: () => fetchSingleProduct(id),
    });
  };
  

  export const useProductUpdateQuery = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
      mutationFn: updateProduct,
      onSuccess: (data) => {
        if (data?.status === true) {
          queryClient.invalidateQueries({ queryKey: ["product"] });
          navigate("/");
        }
      },
    });
  };
  