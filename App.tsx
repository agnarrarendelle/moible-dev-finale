import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import moment from "moment";

import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [textInput, setTextInput] = useState<string>("");

  useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const addTodo = () => {
    if (textInput === "") {
      Alert.alert("啊哈", "請輸入文字");
      return;
    }

    const newTodo: Todo = {
      id: nanoid(),
      task: textInput,
      isCompleted: false,
      date: moment(new Date()).format("YYYYMMDD"),
    };
    setTodos([...todos, newTodo]);
    setTextInput("");
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
        const currState = item.isCompleted;
        return { ...item, isCompleted: !currState };
      }
      return item;
    });

    setTodos(newTodosItem);
  };

  const deleteTodo = (todoId: string) => {
    const todo: Todo = todos.find((todo) => todo.id === todoId)!;
    Alert.alert(`Are you sure you want to delete task "${todo.task}?"`, "", [
      {
        text: "Yes",
        onPress: () => setTodos(todos.filter((item) => item.id !== todoId)),
      },
      {
        text: "No",
      },
    ]);
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
    <SafeAreaView style={styles.main}>
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
