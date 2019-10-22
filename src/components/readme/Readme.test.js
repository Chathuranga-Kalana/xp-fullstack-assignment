import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { username, repo_name, mockReadme } from "./mock_data";
import Readme from "./Readme";

configure({ adapter: new Adapter() });

global.fetch = jest.fn().mockImplementation(path => {
  switch (path) {
    case `https://raw.githubusercontent.com/${username}/${repo_name}/master/README.md`:
      console.log(path);
      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve({ mockReadme })
      });
    default:
      return {};
  }
});

describe("ReadmeComponent", () => {
  it("should fetch readme.md and render Readme component", async () => {
    const readme_comp = shallow(
      <Readme match={{ params: { username: username, reponame: repo_name } }} />
    );

    await new Promise(setImmediate);
    readme_comp.update();
    expect(readme_comp.getElements()).toMatchSnapshot();
  });
});
