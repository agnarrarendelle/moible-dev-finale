import moment from "moment";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
type Prop = {
  todo: Todo;
  index: number;
  markTodoComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
};
const ListItem = (prop: Prop) => {
  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{prop.index}</Text>
      </View>
      <View style={styles.taskContainer}>
        <Text
          style={[
            styles.task,
            {
              textDecorationLine: prop.todo?.isCompleted
                ? "line-through"
                : "none",
            },
          ]}
        >
          {prop.todo.task}
        </Text>
        <Text>{moment(prop.todo.date).format("YYYY/MM/DD")}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 8,
  },
  indexContainer: {
    backgroundColor: "#3E3364",
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  index: {
    color: "#fff",
    fontSize: 20,
  },
  taskContainer: {
    backgroundColor: "#3E3364",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  task: {
    color: "#fff",
    width: "40%",
    fontSize: 16,
  },

  listItem: {
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
    justifyContent: "space-evenly",
  },

  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
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
