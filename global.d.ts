export {};

declare global {
  type Todo = {
    id: string;
    task: string;
    isCompleted: boolean;
    date: Date;
    detail?:string
  };

  type StackParamList = {
    Home: undefined;
    ListDetail: { id: string, task:string };
  };

  type HomeScreenProp = NativeStackScreenProps<StackParamList, "Home">;
}
