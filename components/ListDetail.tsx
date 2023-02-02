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
  const [taskDetail, setTaskDetail] = useState("");

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

      <Button
        title="save"
        onPress={() => prop.navigation.navigate("Home")}
      ></Button>
    </SafeAreaView>
  );
};

export default ListDetail;
