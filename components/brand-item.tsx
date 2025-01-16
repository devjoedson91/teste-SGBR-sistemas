import { BrandsModelProps } from "@/data/hooks/types";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface BrandItemProps extends TouchableOpacityProps {
  item: BrandsModelProps;
}

export function BrandItem({ item, ...rest }: BrandItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="w-full h-16 p-4 rounded flex-row justify-between items-center gap-2 bg-slate-100"
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
      <Text
        className="text-darkBlue font-semibold text-xl w-3/4"
        numberOfLines={1}
      >
        {item.nome}
      </Text>
      <FontAwesome5 name="car" size={24} color="#0092fd" />
    </TouchableOpacity>
  );
}
