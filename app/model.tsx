import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useGetBrandsId } from "@/data/hooks/useBrands";
import { BrandModelsItem } from "@/components/brand-models-item";
import { Header } from "@/components/header";
import { useLocalSearchParams } from "expo-router";
import { SearchInput } from "@/components/ui/search-input";
import { useMemo, useState } from "react";

export default function Model() {
  const params = useLocalSearchParams();

  const { data, isFetching } = useGetBrandsId(params.id as string);

  const [searchText, setSearchText] = useState("");

  const modelsFiltered = useMemo(() => {
    if (searchText.length) {
      const models = data?.filter((item) =>
        item.nome.toLowerCase().includes(searchText.toLowerCase())
      );

      return models;
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
        <View className="gap-4 items-center self-center">
          <Text className="text-center text-darkBlue text-xl">
            Modelos relacionados a marca:
          </Text>
          <Text className="text-center text-mainBlue font-bold text-2xl">
            {params.name}
          </Text>
        </View>

        {!isFetching && (
          <SearchInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        )}

        {isFetching ? (
          <ActivityIndicator size={24} color="#0062fe" />
        ) : (
          <FlatList
            data={modelsFiltered ? modelsFiltered : data}
            contentContainerStyle={{ gap: 20 }}
            renderItem={({ item }) => <BrandModelsItem item={item} disabled />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.codigo}
            ListEmptyComponent={<Text>Nenhum resultado encontrado.</Text>}
          />
        )}
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}
