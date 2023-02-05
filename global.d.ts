export {};

//declare types that can be accessed from any where in the app
declare global {

  // todo object
  type Todo = {
    id: string;
    task: string;
    isCompleted: boolean;
    date: Date;
    detail?: string;
  };

  // define stack navigator routes and parameters
  type StackParamList = {
    Home: undefined;
    ListDetail: {
      id: string;
      task: string;
      detail?: string;
      setTaskDetail: (id: string, newTask: string, newDetail: string) => void;
    };
  };

  //the stack navigator route that goes back to Home page
  type HomeScreenProp = NativeStackScreenProps<StackParamList, "Home">;
}
