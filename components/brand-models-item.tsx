import { BrandsModelProps } from "@/data/hooks/types";
import { useRouter } from "expo-router";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import { useRoute } from "@react-navigation/native";

interface BrandModelsItemPros extends TouchableOpacityProps {
  item: BrandsModelProps;
}

export function BrandModelsItem({ item, ...rest }: BrandModelsItemPros) {
  const router = useRouter();

  const route = useRoute();

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

      {route.name === "home" ? (
        <Entypo name="chevron-right" size={24} />
      ) : (
        <FontAwesome5 name="car" size={24} color="#0092fd" />
      )}
    </TouchableOpacity>
  );
}
