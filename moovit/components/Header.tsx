import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUser } from "@/context/UserContext";
import { useBusCountdownContext } from "@/context/BusSelectContext";

export function CustomHeader() {
    const { user, logout } = useUser();
    const { busCountdown, setBusCountdown } = useBusCountdownContext();

    const handleLogOut = () => {
        setBusCountdown(0);
        logout();
    }
  const username = "Smile";
  const getCurrentGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.userSection}>
        <Image
          source={{ uri: user?.avatar }}
          style={styles.profilePic}
        />
        <Text style={styles.greetingText}>
          {getCurrentGreeting()},{" "}
          <Text style={styles.username}>{user?.name}</Text>
        </Text>
      </View>

      <AntDesign onPress={handleLogOut} name="logout" size={24} color="black" />


    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greetingText: {
    fontSize: 16,
    color: "#333",
  },
  username: {
    fontWeight: "bold",
    color: "#000",
  },
  logoutButton: {
    backgroundColor: "#ff4d4f",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});