import { TextInput, TextInputProps, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface SearchInputProps extends TextInputProps {}

export function SearchInput({ ...rest }: SearchInputProps) {
  return (
    <View className="mt-5 px-2 relative w-full h-14 border border-slate-200 rounded">
      <TextInput
        className="h-full text-lg"
        placeholder="Digite sua pesquisa..."
        {...rest}
      />
      <View className="absolute h-full items-center justify-center right-0 px-3">
        <Feather name="search" size={24} color="black" />
      </View>
    </View>
  );
}
