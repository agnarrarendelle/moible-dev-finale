import { describe, expect, test } from "@jest/globals";
import renderer from 'react-test-renderer';
import App from "../App";
describe('<App />', () => {
  it('test App snapshot', () => {
    const tree = renderer.create(<App/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});