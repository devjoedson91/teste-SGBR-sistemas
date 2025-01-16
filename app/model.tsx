import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useGetBrandsId } from "@/data/hooks/useBrands";
import { BrandItem } from "@/components/brand-item";
import { Header } from "@/components/header";
import { useLocalSearchParams } from "expo-router";

export default function Model() {
  const params = useLocalSearchParams();

  const { data: models, isFetching } = useGetBrandsId(params.id as string);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-mainBlue"
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Header />
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 justify-center bg-white rounded-t-[50px] p-5"
      >
        <Text className="text-center text-darkBlue text-xl">
          Modelos relacionados a marca:
        </Text>
        <Text className="text-center text-mainBlue font-bold text-2xl">
          {params.name}
        </Text>

        {isFetching ? (
          <ActivityIndicator size={24} color="#0062fe" />
        ) : (
          <FlatList
            data={models || []}
            contentContainerStyle={{ gap: 20, marginTop: 40 }}
            renderItem={({ item }) => <BrandItem item={item} disabled />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.codigo}
          />
        )}
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}
