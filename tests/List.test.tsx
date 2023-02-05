import { describe, expect } from "@jest/globals";
import renderer from "react-test-renderer";
import List from "../components/List";
describe("<List />", () => {
  it("test List snapshot", () => {
    const tree = renderer
      .create(
        <List
          navigator={undefined as any}
          setTaskDetail={() => {}}
          todos={[]}
          filterOption={""}
          flipTodoStatus={() => {}}
          deleteTodo={() => {}}
          sortBy={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
