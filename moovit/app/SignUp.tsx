import { View, Text, Image } from "react-native";
import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { EyeIcon, EyeOffIcon, ChevronDownIcon } from "@/components/ui/icon";
import { useToast, Toast } from "@/components/ui/toast";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { registerUser } from "@/apis/User";
import { User } from "@/types/User";

export default function SignupPage() {
  const router = useRouter();
  const toast = useToast();

  const [userData, setUserData] = React.useState<User>({
    name: "",
    username: "",
    password: "",
    gender: "",
    email: "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleState = () => setShowPassword((prev) => !prev);

  const validateFields = () => {
    const newErrors = {
      name: "",
      username: "",
      email: "",
      password: "",
      gender: "",
    };

    if (!userData.name.trim()) newErrors.name = "Name is required.";
    if (!userData.username.trim()) newErrors.username = "Username is required.";
    if (!userData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!userData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!userData.gender) newErrors.gender = "Gender is required.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSignUp = () => {
    if (validateFields()) {
      try {
        registerUser(userData);
        toast.show({
          render: () => (
            <Toast>
              <Text className="text-white">User registered successfully.</Text>
            </Toast>
          ),
        });
        router.push("");
      } catch (error: any) {
        console.error(error.message);

        toast.show({
          render: () => (
            <Toast>
              <Text className="text-white">Failed to register User.</Text>
            </Toast>
          ),
        });
      }
    } else {
      toast.show({
        render: () => (
          <Toast>
            <Text className="text-white">
              Please fix the errors and try again.
            </Text>
          </Toast>
        ),
      });
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
            Create an Account
          </Heading>
          <Text className="text-center text-typography-500 text-sm">
            Please fill in the details below
          </Text>
          <VStack space="xs">
            <Text className="text-typography-500">Name</Text>
            <Input size="lg">
              <InputField
                onChangeText={(value) =>
                  setUserData({ ...userData, name: value })
                }
                placeholder="Enter your name"
              />
            </Input>
            {errors.name && (
              <Text className="text-red-500 text-sm">{errors.name}</Text>
            )}
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Username</Text>
            <Input size="lg">
              <InputField
                onChangeText={(value) =>
                  setUserData({ ...userData, username: value })
                }
                placeholder="Choose a username"
              />
            </Input>
            {errors.username && (
              <Text className="text-red-500 text-sm">{errors.username}</Text>
            )}
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input size="lg">
              <InputField
                onChangeText={(value) =>
                  setUserData({ ...userData, email: value })
                }
                placeholder="Enter your email"
              />
            </Input>
            {errors.email && (
              <Text className="text-red-500 text-sm">{errors.email}</Text>
            )}
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input size="lg" className="flex-row items-center">
              <InputField
                onChangeText={(value) =>
                  setUserData({ ...userData, password: value })
                }
                placeholder="Create a password"
                secureTextEntry={!showPassword}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
            {errors.password && (
              <Text className="text-red-500 text-sm">{errors.password}</Text>
            )}
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Gender</Text>
            <Select
              onValueChange={(value) =>
                setUserData({ ...userData, gender: value })
              }
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select Gender" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Male" value="male" />
                  <SelectItem label="Female" value="female" />
                </SelectContent>
              </SelectPortal>
            </Select>
            {errors.gender && (
              <Text className="text-red-500 text-sm">{errors.gender}</Text>
            )}
          </VStack>
          <Button
            onPress={handleSignUp}
            className="w-full mt-4"
            action="primary"
          >
            <ButtonText className="text-white text-lg">Sign Up</ButtonText>
          </Button>
          <Text className="text-center text-typography-500 text-sm mt-4">
            Already have an account?{" "}
            <Text
              className="text-primary underline"
              onPress={() => router.push("")}
            >
              Log In
            </Text>
          </Text>
        </VStack>
      </FormControl>
    </View>
  );
}
