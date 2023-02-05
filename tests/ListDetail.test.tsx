import { describe, expect } from "@jest/globals";
import renderer from "react-test-renderer";
import ListDetail from "../components/ListDetail";
describe("<ListDetail />", () => {
  it("test ListDetail snapshot", () => {
    const tree = renderer
      .create(
        <ListDetail navigation={undefined as any} route={undefined as any} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
