import { View, Text, Image, Alert } from "react-native";
import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { loginUser } from "@/apis/User";
import { useUser } from "@/context/UserContext";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";

export default function HomePage() {
  const router = useRouter();
  const toast = useToast();
  const { login } = useUser();
  const [showPassword, setShowPassword] = React.useState(false);
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateInputs = (): boolean => {
    if (!userName.trim()) {
      toast.show({
        render: () => (
          <Toast>
            <Text className="text-white">
              Validation Error", "Username cannot be empty.
            </Text>
          </Toast>
        ),
      });
      return false;
    }
    if (!password.trim()) {
      toast.show({
        render: () => (
          <Toast>
            <Text className="text-white">
              Validation Error", "Password cannot be empty.
            </Text>
          </Toast>
        ),
      });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const user = await loginUser({ username: userName, password });
      toast.show({
        render: () => (
          <Toast>
            <Text className="text-white">Log in Successful !</Text>
          </Toast>
        ),
      });
      login({
        name: user.user.name,
        token: user.token,
        username: user.user.username,
        avatar: user.user.avatar,
      });
      router.push("SelectStop");
    } catch (error: any) {
      toast.show({
        render: () => (
          <Toast>
            <Text className="text-white">Log In Error</Text>
          </Toast>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-background">
      <Image
        source={require("@/assets/logo.png")}
        style={{ width: 100, height: 100, marginBottom: 24 }}
        resizeMode="contain"
      />
      <FormControl className="w-full max-w-[350px] p-6 bg-white shadow-lg rounded-lg border border-outline-300">
        <VStack space="lg">
          <Heading className="text-center text-typography-900 text-2xl font-bold">
            Welcome Back
          </Heading>
          <Text className="text-center text-typography-500 text-sm">
            Please sign in to continue
          </Text>
          <VStack space="xs">
            <Text className="text-typography-500">Username</Text>
            <Input size="lg" className="min-w-[250px]">
              <InputField
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter your username"
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input size="lg" className="flex-row items-center">
              <InputField
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
              />
              <InputSlot
                className="pr-3"
                onPress={handleTogglePasswordVisibility}
              >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <Button
            className="w-full mt-4"
            action="primary"
            onPress={handleLogin}
            disabled={loading}
          >
            <ButtonText className="text-white text-lg">
              {loading ? "Signing In..." : "Sign In"}
            </ButtonText>
          </Button>
          <Text
            className="text-center text-typography-500 text-sm mt-4 underline"
            onPress={() => router.push("/forgot-password")}
          >
            Forgot Password?
          </Text>
          <Text className="text-center text-typography-500 text-sm">
            Don't have an account?{" "}
            <Text
              className="text-primary underline"
              onPress={() => router.push("SignUp")}
            >
              Sign Up
            </Text>
          </Text>
        </VStack>
      </FormControl>
    </View>
  );
}
