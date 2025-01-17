import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useContext, useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { AuthContext } from "@/data/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const schema = z.object({
  user: z.string({ message: "Informe seu usuário" }),
  password: z.string({ message: "Informe sua senha" }),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const [hidePass, setHidePass] = useState(true);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const { signIn, loadingAuth, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const showWelcomeText = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });

    const hideWelcomeText = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showWelcomeText.remove();
      hideWelcomeText.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      isAuthenticated && router.push("/home");

      return () => {};
    }, [isAuthenticated])
  );

  async function handleNavigation(data: z.infer<typeof schema>) {
    await signIn(data);
  }

  return (
    <SafeAreaView className="flex-1 bg-mainBlue">
      <View className="flex-2 justify-center items-center">
        <Animatable.Image
          animation="flipInY"
          source={require("../assets/images/logo.png")}
          style={{ width: "80%" }}
          resizeMode="contain"
        />
      </View>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        className="flex-1 px-[5%] gap-7 justify-center items-center rounded-t-[50px] bg-white"
      >
        {!isKeyboardVisible && (
          <Text className="text-2xl font-bold text-darkBlue">
            Olá, seja bem-vindo!
          </Text>
        )}

        <Input
          name="user"
          control={control}
          placeholder="Usuário"
          error={errors.user?.message}
        />

        <View className="flex flex-row w-full h-16 bg-slate-100 rounded relative">
          <Input
            name="password"
            control={control}
            placeholder="Senha"
            secureTextEntry={hidePass}
            error={errors.password?.message}
          />
          <Pressable
            className="absolute items-center justify-center h-full right-2"
            onPress={() => setHidePass(!hidePass)}
          >
            {hidePass ? (
              <Feather name="eye-off" size={24} />
            ) : (
              <Feather name="eye" size={24} />
            )}
          </Pressable>
        </View>

        <TouchableOpacity
          className="h-16 w-full rounded bg-darkBlue items-center justify-center"
          onPress={handleSubmit(handleNavigation)}
          disabled={loadingAuth}
        >
          {loadingAuth ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Text className="text-white text-2xl font-bold">Entrar</Text>
          )}
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}
