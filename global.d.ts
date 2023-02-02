export {};

declare global {
  type Todo = {
    id: string;
    task: string;
    isCompleted: boolean;
    date: Date;
  };

  type StackParamList = {
    Home: undefined;
    ListDetail: { id: string, task:string };
  };

  type HomeScreenProp = NativeStackScreenProps<StackParamList, "Home">;
}
