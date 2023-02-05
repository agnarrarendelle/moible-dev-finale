import { describe, expect } from "@jest/globals";
import renderer from "react-test-renderer";
import Footer from "../components/Footer";
describe("<Footer />", () => {
  it("test Footer snapshot", () => {
    const tree = renderer
      .create(
        <Footer textInput="" setUserInput={() => {}} addTodo={() => {}} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
