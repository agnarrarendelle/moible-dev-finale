// REFERENCES:
// 1. https://molly1024.medium.com/react-native-%E5%AF%AB-app-%E5%BE%9E-todo-list-%E9%96%8B%E5%A7%8B-%E7%B5%90%E5%90%88%E8%A3%9D%E7%BD%AE-async-storage-%E6%87%89%E7%94%A8-ebb86e5b7c2e


import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type Prop = {
  textInput: string;
  setUserInput: (text: string) => void;
  addTodo: () => void;
};

const Footer = (prop: Prop) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.footer}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={prop.textInput}
          placeholder="Add Todo"
          onChangeText={(text) => prop.setUserInput(text)}
          placeholderTextColor={"#646464"}
        />
      </View>
      <TouchableOpacity onPress={prop.addTodo}>
        <View style={styles.iconContainer}>
          <Icon name="add" color="white" size={30} />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  inputContainer: {
    borderColor: "#C0C0C0",
    backgroundColor: "#fff",
    flex: 1,
    height: 40,
    marginVertical: 20,
    marginRight: 20,
    paddingHorizontal: 20,
    borderRadius: 40,
    elevation: 40,
  },
  iconContainer: {
    backgroundColor: "#1f145c",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 15,
    elevation: 40,
  },
});
export default Footer;
