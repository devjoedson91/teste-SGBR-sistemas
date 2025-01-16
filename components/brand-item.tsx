import { BrandsModelProps } from "@/data/hooks/types";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface BrandItemProps extends TouchableOpacityProps {
  item: BrandsModelProps;
}

export function BrandItem({ item, ...rest }: BrandItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="w-full h-16 p-4 rounded justify-center items-center gap-2 flex-col bg-slate-100"
      onPress={() =>
        router.push({
          pathname: "/model",
          params: {
            id: item.codigo,
            name: item.nome,
          },
        })
      }
      {...rest}
    >
      <Text className="text-darkBlue font-semibold text-xl" numberOfLines={1}>
        {item.nome}
      </Text>
    </TouchableOpacity>
  );
}
