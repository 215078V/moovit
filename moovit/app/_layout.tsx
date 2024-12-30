import { Stack, useSegments } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { UserProvider } from "@/context/UserContext";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CustomHeader } from "@/components/Header";
import { BusStopProvider } from "@/context/BusStopContext";
import { BusCountdownProvider } from "@/context/BusSelectContext";
import FloatingButton from "@/components/FloatingButton";
import { useBusCountdownContext } from "@/context/BusSelectContext";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const segments = useSegments();

  const isAuthPage = segments.includes("SignUp") || segments.length === 0;
  const isShown =
    segments.includes("SignUp") ||
    segments.includes("SelectStop") ||
    segments.length === 0;
  return (
    <UserProvider>
      <BusCountdownProvider>
        <BusStopProvider>
          <GluestackUIProvider>
            <View style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerShown: !isAuthPage,
                  header: () => <CustomHeader />,
                }}
              />
              {!isShown && <FloatingButton />}
            </View>
          </GluestackUIProvider>
        </BusStopProvider>
      </BusCountdownProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ea",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
