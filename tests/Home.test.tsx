import { describe, expect } from "@jest/globals";
import renderer from "react-test-renderer";
import Home from "../components/Home";
describe("<Home />", () => {
  it("test Home snapshot", () => {
    const tree = renderer
      .create(<Home navigation={undefined as any} route={undefined as any} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
