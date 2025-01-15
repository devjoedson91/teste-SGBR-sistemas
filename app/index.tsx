import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

const schema = z.object({
  email: z
    .string({ message: "Informe o E-mail" })
    .email({ message: "O e-mail está inválido" }),
  password: z
    .string({ message: "Informe a senha" })
    .min(4, { message: "A senha precisa ter no mínimo 4 caracteres" }),
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

  const [hidePass, setHidePass] = useState(true);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const router = useRouter();

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

  function handleNavigation(data: z.infer<typeof schema>) {
    router.push("/home");
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
          name="email"
          control={control}
          placeholder="E-mail"
          error={errors.email?.message}
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
        >
          <Text className="text-white text-2xl font-bold">Entrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}
