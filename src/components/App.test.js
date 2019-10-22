import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

configure({ adapter: new Adapter() });

describe("AppComponent", () => {
  it("should render app component", () => {
    const app_comp = shallow(<App />);
    expect(app_comp.getElements()).toMatchSnapshot();
  });
});
