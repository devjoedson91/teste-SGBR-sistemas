import { Pressable, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useContext } from "react";
import { AuthContext } from "@/data/contexts/AuthContext";

export function Header() {
  const { currentUser, signOut } = useContext(AuthContext);

  return (
    <Animatable.View
      animation="fadeInDown"
      className="justify-between items-center px-[10%] mt-[10%] mb-[8%] flex-row"
    >
      <Text className="text-white text-2xl w-3/4" numberOfLines={1}>
        Olá, {currentUser && currentUser.name}
      </Text>
      <Pressable onPress={signOut}>
        <FontAwesome6 name="arrow-right-from-bracket" size={24} color="#fff" />
      </Pressable>
    </Animatable.View>
  );
}
