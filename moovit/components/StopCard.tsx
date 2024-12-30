import { Box } from "./ui/box";
import { Text } from "react-native";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import { useFonts } from "expo-font";
type StopCardProps = {
  name: string;
  fromto: string;
  colorbox: string;
};

export default function StopCard({ name, fromto, colorbox }: StopCardProps) {
  return (
    <Box
      style={{
        backgroundColor: `${colorbox}`,
        borderRadius: 5,
        padding: 5,
        // width: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <VStack space="sm">
        <Text style={{color: "#b3b3b3"}}>{fromto}</Text>
        <Heading size="sm" style={{color: "#fff"}}>{name}</Heading>
      </VStack>
    </Box>
  );
}
