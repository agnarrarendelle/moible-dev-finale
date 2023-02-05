// REFERENCES:
// 1. https://molly1024.medium.com/react-native-%E5%AF%AB-app-%E5%BE%9E-todo-list-%E9%96%8B%E5%A7%8B-%E7%B5%90%E5%90%88%E8%A3%9D%E7%BD%AE-async-storage-%E6%87%89%E7%94%A8-ebb86e5b7c2e

import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

import Header from "./Header";
import List from "./List";
import Footer from "./Footer";

import { SortOptions } from "../constant";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type HomeScreenProp = NativeStackScreenProps<StackParamList, "Home">;

const Home: React.FC<HomeScreenProp> = (prop) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>(SortOptions.All);
  useEffect(() => {
    getTodosLocal();
  }, []);

  useEffect(() => {
    saveTodoToLocal(todos);
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
      date: new Date(),
    };
    setTodos([...todos, newTodo]);
    setUserInput("");
  };

  const saveTodoToLocal = async (todos: Todo[]) => {
    try {
      const savedTodos = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", savedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const getTodosLocal = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos != null) {
        const todoArr: Todo[] = JSON.parse(todos);
        todoArr.forEach((todo) => (todo.date = new Date(todo.date)));
        setTodos(todoArr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const flipTodoStatus = (todoId: string) => {
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
        text: "Confirm",
        onPress: () => setTodos(todos.filter((item) => item.id !== todoId)),
      },
      {
        text: "Cancel",
      },
    ]);
  };

  const clearAllTodos = () => {
    Alert.alert("Clear all todos?", "", [
      {
        text: "Confirm",
        onPress: () => setTodos([]),
      },
      {
        text: "Cancel",
      },
    ]);
  };

  const sortOrFilterToDo = (option: string) => {
    let res: Todo[] = [...todos];
    switch (option) {
      case SortOptions.Name:
        res = res.sort((a, b) => a.task.localeCompare(b.task));
        break;
      case SortOptions.Date:
        res = res.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
      default:
        setFilterOption(option);
        return;
    }
    setTodos(res);
  };

  const changeTodoDetail = (
    todoId: string,
    newTask: string,
    newDetail: string
  ) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, task: newTask, detail: newDetail };
      } else {
        return todo;
      }
    });

    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header clearAllTodos={clearAllTodos} numOfTodos={todos.length}></Header>
      <List
        filterOption={filterOption}
        todos={todos}
        flipTodoStatus={flipTodoStatus}
        deleteTodo={deleteTodo}
        sortBy={sortOrFilterToDo}
        setTaskDetail={changeTodoDetail}
        navigator={prop.navigation}
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

export default Home;
