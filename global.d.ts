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
      detail?: string;
      setTaskDetail: (id: string,newTask:string, newDetail: string) => void;
    };
  };

  type HomeScreenProp = NativeStackScreenProps<StackParamList, "Home">;
}
