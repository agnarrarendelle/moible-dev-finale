import { describe, expect } from "@jest/globals";
import renderer from "react-test-renderer";
import Dropdown from "../components/Dropdown";
describe("<Dropdown />", () => {
  it("test Dropdown snapshot", () => {
    const tree = renderer.create(<Dropdown sortBy={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
