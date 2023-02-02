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
      date: new Date(),
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
        const todoArr: Todo[] = JSON.parse(todos);
        todoArr.forEach((todo) => (todo.date = new Date(todo.date)));
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

  const sortToDo = (option: string) => {
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

  const changeTodoTask = (todoId: string, newTask: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, task: newTask };
      } else {
        return todo;
      }
    });

    setTodos(newTodos);
  };

  const changeTodoDetail = (todoId: string, newDetail: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, detail: newDetail };
      } else {
        return todo;
      }
    });

    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header clearAllTodos={clearAllTodos}></Header>
      <List
        filterOption={filterOption}
        todos={todos}
        markTodoComplete={markTodoComplete}
        deleteTodo={deleteTodo}
        sortBy={sortToDo}
        setTaskName={changeTodoTask}
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
