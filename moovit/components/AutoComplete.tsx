import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { BusStop } from "@/types/BusStop";

type AutocompleteProps = {
    suggestions: BusStop[];
    setSuggestions: (suggestions: string) => void;
};

const Autocomplete = ({suggestions, setSuggestions}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<BusStop[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    setSuggestions(suggestion.BusStopCode);
    console.log("Bus Stop Code" + suggestion.BusStopCode);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <Input size="lg">
        <InputField
          placeholder="Type to search..."
          value={inputValue}
          onChangeText={handleChange}
        />
      </Input>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <FlatList
          data={filteredSuggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSuggestionClick(item)}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>{item.Description}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  suggestionsContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    maxHeight: 150, // Adjust as per your need
    position: "absolute",
    zIndex: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default Autocomplete;
