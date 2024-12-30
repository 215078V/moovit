import React from "react";
import { BusCountdownProvider } from "@/context/BusSelectContext";
import { useBusCountdownContext } from "@/context/BusSelectContext";
import { useBusStopContext } from "@/context/BusStopContext";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { Fab } from "./ui/fab";

export default function FloatingButton() {
  const { busCountdown, setBusCountdown } = useBusCountdownContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <HStack space="xl" style={{ alignItems: "center" }}>
        <Text size="3xl" style={{ fontWeight: 700 , color: "#fac402" }}>
          {busCountdown}
        </Text>
        <Text size="xl" style={{ color: "#fac402"}}>Buses Selected</Text>
        </HStack>
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 10,
  },
  button: {
    backgroundColor: "#000",
    // height: 56,
    width: "100%",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
  },
});
