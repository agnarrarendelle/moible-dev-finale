import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
type ListDetailScreenProp = NativeStackScreenProps<
  StackParamList,
  "ListDetail"
>;
const ListDetail: React.FC<ListDetailScreenProp> = (prop) => {
  return (
    <View>
      <Text>{prop.route.params.id}</Text>
      <Button
        title="test"
        onPress={() => prop.navigation.navigate("Home")}
      ></Button>
    </View>
  );
};

export default ListDetail;
