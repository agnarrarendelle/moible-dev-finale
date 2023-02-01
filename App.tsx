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
  const [userInput, setUserInput] = useState<string>("");

  useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const addTodo = () => {
    if (userInput === "") {
      Alert.alert("Task name cannot be empty", "Please enter a task name");
      return;
    }

    const newTodo: Todo = {
      id: nanoid(),
      task: userInput,
      isCompleted: false,
      date:  new Date()
    };
    setTodos([...todos, newTodo]);
    setUserInput("");
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
        const todoArr:Todo[] = JSON.parse(todos)
        todoArr.forEach(todo=>todo.date = new Date(todo.date))
        setTodos(todoArr);
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

  const sortToDo=(option:string)=>{
    let res:Todo[] = [...todos];
    switch (option){
      case "name":
        res = res.sort((a,b)=>a.task.localeCompare(b.task))
        break;
      case "date":
        res = res.sort((a,b)=>a.date.getTime() - b.date.getTime())
        break;
    }
    setTodos(res)
  }

  return (
    <SafeAreaView style={styles.main}>
      <Header clearAllTodos={clearAllTodos}></Header>
      <List
        filterOption={filterOption}
        todos={todos}
        markTodoComplete={markTodoComplete}
        deleteTodo={deleteTodo}
        sortBy={sortToDo}
      ></List>

      <Footer
        textInput={userInput}
        setUserInput={setUserInput}
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
