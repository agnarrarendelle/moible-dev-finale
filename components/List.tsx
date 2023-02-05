import { FlatList, View } from "react-native";
import { FilterOptions } from "../constant";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ListItem from "./ListItem";
import Dropdown from "./Dropdown";

type Prop = {
  //all tasks
  todos: Todo[];
  //filter option
  filterOption: string;
  //function to flip a tasks's status
  flipTodoStatus: (id: string) => void;
  //function to delete a todo
  deleteTodo: (id: string) => void;
  //function to sort the task array
  sortBy: (option: string) => void;
  //function to update the name and detail of a task
  setTaskDetail: (id: string, newTask: string, newDetail: string) => void;
  //stack navigator to navigate back to Home page
  navigator: NativeStackNavigationProp<StackParamList, "Home", undefined>;
};
const List = (prop: Prop) => {

  //When called, it will return a filtered task array based on filterOption
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

  //When called, it will navigate to a task's detail page
  const openListDetail = (id: string, task: string, detail?: string) => {
    prop.navigator.navigate("ListDetail", {
      id: id,
      task: task,
      detail: detail,
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
            flipTodoStatus={prop.flipTodoStatus}
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
