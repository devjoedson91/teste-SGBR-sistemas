import { BrandsModelProps } from "@/data/hooks/types";
import { useRouter } from "expo-router";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

interface BrandModelsItemPros extends TouchableOpacityProps {
  item: BrandsModelProps;
}

export function BrandsItem({ item, ...rest }: BrandModelsItemPros) {
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
      <View className="items-center flex-row gap-2 w-3/4">
        <Entypo name="check" size={24} color="#22C55E" />
        <Text
          className="text-darkBlue text-green font-semibold text-xl"
          numberOfLines={1}
        >
          {item.nome}
        </Text>
      </View>

      <Entypo name="chevron-right" size={24} />
    </TouchableOpacity>
  );
}
