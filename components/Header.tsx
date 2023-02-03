import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type Prop = {
  clearAllTodos: () => void;
  numOfTodos: number;
};

const Header = (prop: Prop) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {`You have ${prop.numOfTodos} todos in your list`}
      </Text>
      <Icon name="delete" size={40} color="blue" onPress={prop.clearAllTodos} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#000000",
  },
});

export default Header;
