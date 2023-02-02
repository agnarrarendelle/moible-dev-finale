import { FlatList, View } from "react-native";
import { FilterOptions } from "../constant";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ListItem from "./ListItem";
import Dropdown from "./Dropdown";
type Prop = {
  todos: Todo[];
  filterOption: string;
  markTodoComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  sortBy: (option: string) => void;
  setTaskDetail: (id: string,newTask:string, newDetail: string) => void;
  navigator: NativeStackNavigationProp<StackParamList, "Home", undefined>;
};
const List = (prop: Prop) => {
  const getFilteredList = () => {
    switch (prop.filterOption) {
      case FilterOptions.All:
        return prop.todos;
      case FilterOptions.Completed:
        return prop.todos.filter((todo) => todo.isCompleted === true);
      case FilterOptions.InCompleted:
        return prop.todos.filter((todo) => todo.isCompleted === false);
    }
  };

  const openListDetail = (id: string, task: string) => {
    prop.navigator.navigate("ListDetail", {
      id: id,
      task: task,
      setTaskDetail: prop.setTaskDetail,
    });
  };
  return (
    <View>
      <Dropdown sortBy={prop.sortBy}></Dropdown>
      <FlatList
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ padding: 10 }}
        data={getFilteredList()}
        renderItem={({ item, index }) => (
          <ListItem
            todo={item}
            markTodoComplete={prop.markTodoComplete}
            deleteTodo={prop.deleteTodo}
            index={index + 1}
            openListDetail={openListDetail}
          />
        )}
      />
    </View>
  );
};

export default List;
