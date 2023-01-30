import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
type Prop = {
  todo: Todo;
  markTodoComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
};
const ListItem = (prop: Prop) => {
  return (
    <View style={styles.listItem}>
      <View style={{width:"30%"}}>
        <Text
          style={[
            styles.taskText,
            {
              textDecorationLine: prop.todo?.isCompleted
                ? "line-through"
                : "none",
            },
          ]}
        >
          {prop.todo?.task}
        </Text>
      </View>
      <View>{prop.todo.date}</View>
      <TouchableOpacity onPress={() => prop.markTodoComplete(prop.todo.id)}>
        <View
          style={[
            styles.actionIcon,
            { backgroundColor: prop.todo?.isCompleted ? "#aaaaaa" : "green" },
          ]}
        >
          <Icon name="done" size={20} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => prop.deleteTodo(prop.todo.id)}>
        <View style={styles.actionIcon}>
          <Icon name="close" size={25} color="red" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
    justifyContent:"space-evenly"
  },

  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 3,
  },

  taskText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#1f145c",
  },
});

export default ListItem;
