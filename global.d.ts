export {}

declare global{
    type Todo = {
        id: string;
        task: string;
        isCompleted: boolean;
        date: Date;
    };
    const enum FilterOptions{
        All,
        Completed,
        InCompleted
    }
}
