import { FlatList } from "react-native";
import ListItem from "./ListItem";
type Prop = {
  todos: Todo[];
  markTodoComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
};
const List = (prop: Prop) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
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
  );
};

export default List;
