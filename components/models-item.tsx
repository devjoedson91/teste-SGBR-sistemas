import { BrandsModelProps } from "@/data/hooks/types";
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";

interface ModelsItemPros extends TouchableOpacityProps {
  item: BrandsModelProps;
}

export function ModelsItem({ item, ...rest }: ModelsItemPros) {
  return (
    <TouchableOpacity
      className="w-full h-16 p-4 rounded flex-row justify-between items-center gap-2 bg-slate-100"
      onPress={() => Alert.alert(item.nome)}
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

      <FontAwesome5 name="car" size={24} color="#0092fd" />
    </TouchableOpacity>
  );
}
