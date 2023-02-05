import { describe, expect } from "@jest/globals";
import renderer from "react-test-renderer";
import ListItem from "../components/ListItem";
describe("<ListItem />", () => {
  it("test ListItem snapshot", () => {
    const tree = renderer
      .create(
        <ListItem
          flipTodoStatus={() => {}}
          deleteTodo={() => {}}
          openListDetail={() => {}}
          todo={null as any}
          index={0}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
