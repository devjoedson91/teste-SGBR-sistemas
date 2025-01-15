import { Text, TextInput, TextInputProps, View } from "react-native";
import { Controller } from "react-hook-form";

interface InputProps extends TextInputProps {
  name: string;
  control: any;
  error?: string;
}

export function Input({
  control,
  name,
  error,
  placeholder,
  ...rest
}: InputProps) {
  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <TextInput
            className="h-16 rounded bg-slate-100 text-xl font-normal px-3"
            placeholder={placeholder}
            value={value || ""}
            onChangeText={onChange}
            {...rest}
          />
        )}
      />

      {error && <Text className="mt-1 text-red-600">{error}</Text>}
    </View>
  );
}
