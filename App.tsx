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

import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
  date: string;
};

const COLORS = { primary: "#1f145c", white: "#fff" };

const App = () => {
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
        const currState = item.isCompleted
        return {...item, isCompleted: !currState}
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

  // const getSortedState = data => sortBy(data, ['completed', 'time']);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Header clearAllTodos={clearAllTodos}></Header>
      <List
        todos={todos}
        markTodoComplete={markTodoComplete}
        deleteTodo={deleteTodo}
      ></List>

      <Footer
        textInput={textInput}
        setTextInput={setTextInput}
        addTodo={addTodo}
      ></Footer>
    </SafeAreaView>
  );
};

export default App;
