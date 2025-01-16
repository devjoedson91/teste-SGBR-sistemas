import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useGetBrands } from "@/data/hooks/useBrands";
import { BrandItem } from "@/components/brand-item";
import { Header } from "@/components/header";
import { SearchInput } from "@/components/ui/search-input";
import { useMemo, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Home() {
  const { data, isFetching } = useGetBrands();

  const [searchText, setSearchText] = useState("");

  const brandsFiltered = useMemo(() => {
    if (searchText.length) {
      const brands = data?.filter((item) =>
        item.nome.toLowerCase().includes(searchText.toLowerCase())
      );

      return brands;
    }
  }, [searchText]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-mainBlue"
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Header />
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 gap-10 justify-center bg-white rounded-t-[50px] p-5"
      >
        <View className="flex-row gap-4 self-center">
          <Text className="text-mainBlue font-bold text-2xl">Marcas</Text>
          <AntDesign name="checkcircle" size={24} color="#00071a" />
        </View>

        {!isFetching && (
          <SearchInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        )}

        {isFetching ? (
          <ActivityIndicator color="#0062fe" size={24} />
        ) : (
          <FlatList
            data={brandsFiltered ? brandsFiltered : data}
            contentContainerStyle={{ gap: 20 }}
            renderItem={({ item }) => <BrandItem item={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.codigo}
            ListEmptyComponent={<Text>Nenhum resultado encontrado.</Text>}
          />
        )}
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}
