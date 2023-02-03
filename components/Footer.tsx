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
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    height: 40,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: "#fff",
    borderColor: "#C0C0C0",
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 40,
  },
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#1f145c",
    elevation: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Footer;
