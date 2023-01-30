import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid";
type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
  date: string;
};

const COLORS = { primary: "#1f145c", white: "#fff" };

const TodoList = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [textInput, setTextInput] = React.useState<string>("");

  React.useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const addTodo = () => {
    if (textInput === "") {
      Alert.alert("啊哈", "請輸入文字");
    } else {
      const newTodo: Todo = {
        id: nanoid(),
        task: textInput,
        isCompleted: false,
        date: `${new Date()}`,
      };
      setTodos([...todos, newTodo]);
      setTextInput("");
    }
  };

  const saveTodoToUserDevice = async (todos: Todo[]) => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markTodoComplete = (todoId: string) => {
    const newTodosItem = todos.map((item) => {
      if (item.id === todoId) {
        if (!item.isCompleted) {
          return { ...item, isCompleted: true };
        }
        if (item.isCompleted) {
          return { ...item, isCompleted: false };
        }
      }
      return item;
    });

    setTodos(newTodosItem);
  };

  const deleteTodo = (todoId: string) => {
    const newTodosItem = todos.filter((item) => item.id != todoId);
    setTodos(newTodosItem);
  };

  const clearAllTodos = () => {
    Alert.alert("Confirm", "Clear todos?", [
      {
        text: "Yes",
        onPress: () => setTodos([]),
      },
      {
        text: "No",
      },
    ]);
  };

  const ListItem = ({ todo }: { todo: Todo }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: todo?.isCompleted ? "line-through" : "none",
            }}
          >
            {todo?.task}
          </Text>
        </View>
        <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
          <View
            style={[
              styles.actionIcon,
              { backgroundColor: todo?.isCompleted ? "#aaaaaa" : "green" },
            ]}
          >
            <Icon name="done" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
            <Icon name="close" size={25} color="red" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // const getSortedState = data => sortBy(data, ['completed', 'time']);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: COLORS.primary,
          }}
        >
          TODO APP
        </Text>
        <Icon name="delete" size={25} color="red" onPress={clearAllTodos} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder="Add Todo"
            onChangeText={(text) => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default TodoList;
