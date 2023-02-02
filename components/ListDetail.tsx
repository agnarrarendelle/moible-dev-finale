import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type ListDetailScreenProp = NativeStackScreenProps<
  StackParamList,
  "ListDetail"
>;
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
        value={taskName}
        onChangeText={(task) => setTaskName(task)}
      ></TextInput>
      <TextInput
        value={taskDetail}
        multiline={true}
        numberOfLines={6}
        onChangeText={(detail) => setTaskDetail(detail)}
      ></TextInput>

      <Button title="save" onPress={onSaveBtnPressed}></Button>
    </SafeAreaView>
  );
};

export default ListDetail;
