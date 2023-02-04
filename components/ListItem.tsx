import moment from "moment";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
type Prop = {
  todo: Todo;
  index: number;
  markTodoComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  openListDetail: (id: string, task: string, detail?: string) => void;
};
const ListItem = (prop: Prop) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        prop.openListDetail(prop.todo.id, prop.todo.task, prop.todo.detail)
      }
    >
      <View style={styles.numContainer}>
        <Text style={styles.number}>{prop.index}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.item,
            {
              textDecorationLine: prop.todo?.isCompleted
                ? "line-through"
                : "none",
            },
          ]}
        >
          {prop.todo.task}
        </Text>
        <Text style={styles.dateText}>
          {moment(prop.todo.date).format("YYYY/MM/DD")}
        </Text>
        <TouchableOpacity onPress={() => prop.markTodoComplete(prop.todo.id)}>
          <View
            style={[
              styles.icon,
              {
                backgroundColor: prop.todo?.isCompleted ? "#aaaaaa" : "#0fee07",
              },
            ]}
          >
            <Icon name="done" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => prop.deleteTodo(prop.todo.id)}>
          <View style={styles.icon}>
            <Icon name="close" size={25} color="red" />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 8,
  },
  numContainer: {
    backgroundColor: "#000000",
    borderRadius: 15,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
  },
  number: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  itemContainer: {
    backgroundColor: "#000000",
    borderRadius: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  item: {
    color: "#fff",
    width: "40%",
    fontSize: 16,
  },

  listItem: {
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    elevation: 12,
    borderRadius: 10,
    marginVertical: 8,
    justifyContent: "space-evenly",
  },

  icon: {
    height: 25,
    width: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginLeft: 5,
    borderRadius: 3,
  },

  dateText: {
    fontSize: 10,
    color: "#ffffff",
  },
});

export default ListItem;
