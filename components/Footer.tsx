import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type Prop = {
  textInput: string;
  setUserInput: (text: string) => void;
  addTodo: () => void;
};

const Footer = (prop: Prop) => {
  return (
    <View style={styles.footer}>
      <View style={styles.inputContainer}>
        <TextInput
          value={prop.textInput}
          placeholder="Add Todo"
          onChangeText={(text) => prop.setUserInput(text)}
        />
      </View>
      <TouchableOpacity onPress={prop.addTodo}>
        <View style={styles.iconContainer}>
          <Icon name="add" color="white" size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: "#fff",
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#1f145c",
    elevation: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Footer;
