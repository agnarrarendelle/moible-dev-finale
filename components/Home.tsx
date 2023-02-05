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
  //the array of all tasks
  const [todos, setTodos] = useState<Todo[]>([]);
  //current user input in Footer
  const [userInput, setUserInput] = useState<string>("");
  //current filter option from Dropdown
  const [filterOption, setFilterOption] = useState<string>(SortOptions.All);

  //When the app is opened, load all saved tasks from user device
  useEffect(() => {
    getTodosLocal();
  }, []);

  //Whenever the task array is modified, save those changes to user device
  useEffect(() => {
    saveTodoToLocal(todos);
  }, [todos]);

  //add a task to the array and clear user input
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

  //save current task array to local device
  const saveTodoToLocal = async (todos: Todo[]) => {
    try {
      const savedTodos = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", savedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  //load all todos from local device
  const getTodosLocal = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos != null) {
        const todoArr: Todo[] = JSON.parse(todos);
        //Since Date is not a serializable object, it will become plain text when text,
        //so when the tasks are loaded from local, we need to update the data member to a Data object built from saved date string
        todoArr.forEach((todo) => (todo.date = new Date(todo.date)));
        setTodos(todoArr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Find a todo with the todoId and flip its isComplete property to the opposite
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

  //Delete a task from task array with todoId
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

  //Removed all todos in the app
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

  //Check the option to see if it is either "Name" or "Date",
  //and return a sort task array if it is.
  //If not, call setFilterOptions to update the filterOption to option.
  //When the app reloads, the tasks on the UI will be filtered accordingly
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

  //Find a todo with todoId and update its name and detail
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
