export {};

declare global {
  type Todo = {
    id: string;
    task: string;
    isCompleted: boolean;
    date: Date;
    detail?: string;
  };

  type StackParamList = {
    Home: undefined;
    ListDetail: {
      id: string;
      task: string;
      setTaskName: (id: string, newTask: string) => void;
      setTaskDetail: (id: string, newDetail: string) => void;
    };
  };

  type HomeScreenProp = NativeStackScreenProps<StackParamList, "Home">;
}
