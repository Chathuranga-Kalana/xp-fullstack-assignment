import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import User from "./User";
import { mockSuccessUser, mockSuccessUserRepos, username } from "./mock_data";

configure({ adapter: new Adapter() });

global.fetch = jest.fn().mockImplementation(path => {
  switch (path) {
    case `https://api.github.com/users/${username}`:
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessUser)
      });
    case `https://api.github.com/users/${username}/repos`:
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessUserRepos)
      });

    default:
      return {};
  }
});

describe("UserComponent", () => {
  it("should fetch data and render user component with user details and repository list", async () => {
    const user_comp = shallow(
      <User match={{ params: { username: username } }} />
    );

    await new Promise(setImmediate);
    user_comp.update();
    expect(user_comp.getElements()).toMatchSnapshot();
  });
});
