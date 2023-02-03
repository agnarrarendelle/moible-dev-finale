import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type ListDetailScreenProp = NativeStackScreenProps<
  StackParamList,
  "ListDetail"
>;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const ListDetail: React.FC<ListDetailScreenProp> = (prop) => {
  const [taskName, setTaskName] = useState(prop.route.params.task);
  const [taskDetail, setTaskDetail] = useState(
    prop.route.params.detail === undefined ? "" : prop.route.params.detail
  );

  const onSaveBtnPressed = () => {
    const id = prop.route.params.id;
    prop.navigation.navigate("Home");
    prop.route.params.setTaskDetail(id, taskName, taskDetail);
  };
  return (
    <SafeAreaView>
      <TextInput
        placeholder="Edit the name of this task"
        style={styles.titleInput}
        value={taskName}
        onChangeText={(task) => setTaskName(task)}
      ></TextInput>
      <TextInput
        placeholder="Add some detail to this task"
        placeholderTextColor={"#646464"}
        style={styles.detailInput}
        value={taskDetail}
        multiline={true}
        numberOfLines={6}
        onChangeText={(detail) => setTaskDetail(detail)}
      ></TextInput>
      <Pressable style={styles.saveButton} onPress={onSaveBtnPressed}>
        <Text style={styles.saveButtonText}>save</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleInput: {
    opacity: 0.5,
    fontSize: 30,
    left: 20,
  },

  detailInput: {
    top: 1,
    bottom: 10,
    left: 20,
    padding: 10,
    color: "#000000",
    height: windowHeight * 0.5,
    opacity: 0.5,
    fontSize: 20,
  },

  saveButton: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    textAlign: "center",
    width: windowWidth * 0.5,
    marginLeft: "auto",
    marginRight: "auto",
  },

  saveButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ListDetail;
