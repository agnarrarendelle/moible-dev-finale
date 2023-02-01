import { FlatList, View } from "react-native";
import Dropdown from "./Dropdown";
import ListItem from "./ListItem";
type Prop = {
  todos: Todo[];
  markTodoComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  sortBy:(option:string)=>void

};
const List = (prop: Prop) => {
  return (
    <View>
      <Dropdown sortBy={prop.sortBy}></Dropdown>
      <FlatList
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ padding: 10 }}
        data={prop.todos}
        renderItem={({ item, index }) => (
          <ListItem
            todo={item}
            markTodoComplete={prop.markTodoComplete}
            deleteTodo={prop.deleteTodo}
            index={index + 1}
          />
        )}
      />
    </View>
  );
};

export default List;
