import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BrandsModelProps } from "./types";

const BASE_URL = " https://parallelum.com.br/fipe/api";

export function useGetBrands() {
  const query = useQuery({
    queryFn: async (): Promise<BrandsModelProps[]> => {
      const response = await axios.get(`${BASE_URL}/v1/carros/marcas`);

      return response.data;
    },
    queryKey: ["get-brands"],
    refetchOnWindowFocus: false,
  });

  return query;
}

export function useGetBrandsId(brand_id: string) {
  const query = useQuery({
    queryFn: async (): Promise<BrandsModelProps[]> => {
      const response = await axios.get(
        `${BASE_URL}/v1/carros/marcas/${brand_id}/modelos`
      );

      return response.data.modelos;
    },
    queryKey: ["get-brands-id"],
    refetchOnWindowFocus: false,
    enabled: !!brand_id,
  });

  return query;
}
