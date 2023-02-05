// REFERENCES:
// 1. https://molly1024.medium.com/react-native-%E5%AF%AB-app-%E5%BE%9E-todo-list-%E9%96%8B%E5%A7%8B-%E7%B5%90%E5%90%88%E8%A3%9D%E7%BD%AE-async-storage-%E6%87%89%E7%94%A8-ebb86e5b7c2e


import moment from "moment";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
type Prop = {
  //a single task object
  todo: Todo;
  //the index of that task in task array
  index: number;
  //function to flip a tasks's status
  flipTodoStatus: (id: string) => void;
  //function to delete a todo
  deleteTodo: (id: string) => void;
  //function to navigate to a task's detail page
  openListDetail: (id: string, task: string, detail?: string) => void;
};
const ListItem = (prop: Prop) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        // when the list item is clicked, navigate to task detail page
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
              // changed the task name text style based on isCompleted
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
        <TouchableOpacity onPress={() => prop.flipTodoStatus(prop.todo.id)}>
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
