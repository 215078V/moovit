import React, { useState } from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import { View, Alert } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { BusStop } from "@/types/BusStop";
import { getAllBusStops } from "@/apis/BusStop";
import { useBusStopContext } from "@/context/BusStopContext";
import { useRouter } from "expo-router";
import { BusStopProvider } from "@/context/BusStopContext";
import { BusCountdownProvider } from "@/context/BusSelectContext";

export default function BusStopSelect() {
  const router = useRouter();
  const { busStopCode, setBusStopCode } = useBusStopContext();
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<BusStop[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<BusStop[]>([]);
  const [isValid, setIsValid] = useState(false);

  React.useEffect(() => {
    getAllBusStops().then((stops) => {
      setSuggestions(stops);
    });

    if (inputValue.trim() === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [inputValue]);

  const handleChange = (value: string) => {
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filtered = suggestions.filter((item) =>
        item.Description.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: BusStop) => {
    setInputValue(suggestion.Description);
    setBusStopCode(suggestion.BusStopCode);
    setShowSuggestions(false);
  };

  return (
        <View className="flex-1 justify-center items-center p-4 bg-background">
          <View className="w-full max-w-[350px] p-6 bg-white shadow-lg rounded-lg border border-outline-300">
            <VStack space="lg">
              <Heading className="text-center text-typography-900 text-2xl font-bold">
                Select Your Bus Stop
              </Heading>
              <Text className="text-center text-typography-500 text-sm">
                Search and select the bus stop to proceed
              </Text>
              <VStack space="xs">
                <Text className="text-typography-500">Bus Stop</Text>
                <Input size="lg" className="min-w-[250px]">
                  <InputField
                    placeholder="Type to search..."
                    value={inputValue}
                    onChangeText={handleChange}
                  />
                </Input>
              </VStack>

              {showSuggestions && filteredSuggestions.length > 0 && (
                <FlatList
                  data={filteredSuggestions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSuggestionClick(item)}
                      className="p-2 border-b border-outline-200"
                    >
                      <Text className="text-typography-700">
                        {item.Description}
                      </Text>
                    </TouchableOpacity>
                  )}
                  className="max-h-40 bg-white border border-outline-200 rounded-lg overflow-hidden mt-2"
                />
              )}

              <Button
                action="primary"
                className="w-full mt-4"
                disabled={!isValid}
                onPress={() => router.push("Home")}
              >
                <ButtonText className="text-white text-lg">
                  View Buses
                </ButtonText>
              </Button>
            </VStack>
          </View>
        </View>
  );
}
