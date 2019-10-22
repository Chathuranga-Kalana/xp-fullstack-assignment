import React from "react";
import marked from "marked";
import "./readme.css";

import { github_raw_api } from "../../utils/api";

class Readme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readme: "",
      networkresp: true,
      name: this.props.match.params.username,
      reponame: this.props.match.params.reponame
    };
  }

  componentDidMount() {
    // alert(this.props.match.params.username);
    const { name, reponame } = this.state;

    // get readme raw data
    github_raw_api(`/${name}/${reponame}/master/README.md`)
      .then(response => {
        this.setState({ networkresp: response.ok });
        return response.text();
      })
      .then(text => {
        this.setState({ markdown: marked(text) });
      })
      .catch(error => {
        console.error(error);
        return { name: "Network Error" };
      });
  }
  render() {
    const { markdown } = this.state;
    const networkresp = this.state.networkresp;
    return (
      <section>
        <h3 className="readme_title"> Readme.md</h3>
        {/* check readme file is available */}
        {networkresp ? (
          <article dangerouslySetInnerHTML={{ __html: markdown }}></article>
        ) : (
          <p>File Not Found</p>
        )}
      </section>
    );
  }
}

export default Readme;
