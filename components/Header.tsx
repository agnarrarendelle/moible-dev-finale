import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type Prop = {
  clearAllTodos: () => void;
};

const Header = (prop: Prop) => {
  return (
    <View style={styles.header}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: "#1f145c",
        }}
      >
        TODO APP
      </Text>
      <Icon name="delete" size={25} color="red" onPress={prop.clearAllTodos} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Header;
