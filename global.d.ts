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
      setTaskName: (string) => void;
      setTaskDetail: (string) => void;
    };
  };

  type HomeScreenProp = NativeStackScreenProps<StackParamList, "Home">;
}
