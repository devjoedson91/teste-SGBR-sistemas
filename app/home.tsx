import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useGetBrands } from "@/data/hooks/useBrands";
import { BrandItem } from "@/components/brand-item";
import { Header } from "@/components/header";

export default function Home() {
  const { data: brands, isFetching } = useGetBrands();

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
        <Text className="text-center text-mainBlue font-bold text-2xl">
          Marcas
        </Text>

        {isFetching ? (
          <ActivityIndicator color="#0062fe" size={24} />
        ) : (
          <FlatList
            data={brands || []}
            contentContainerStyle={{ gap: 20, marginTop: 40 }}
            renderItem={({ item }) => <BrandItem item={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.codigo}
          />
        )}
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}
