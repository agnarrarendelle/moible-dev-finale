import { describe, expect } from "@jest/globals";
import renderer from "react-test-renderer";
import Header from "../components/Header";
describe("<Header />", () => {
  it("test Header snapshot", () => {
    const tree = renderer
      .create(<Header numOfTodos={0} clearAllTodos={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
