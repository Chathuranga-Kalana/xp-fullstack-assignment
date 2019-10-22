import React from "react";
import "./search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    console.log("handle eve", e);
    this.setState({ userName: e.target.value });
  }
  handleSubmit(e) {
    const user = this.state.userName;
    e.preventDefault();
    if (user) {
      // alert(user);
      // alert(this.state.userName);
      this.props.history.push(`/user/${this.state.userName}`);
    } else {
      alert("Please enter  user Name");
      this.props.history.push(`/`);
    }
  }
  render() {
    return (
      <form className="search-page" onSubmit={this.handleSubmit}>
        <h2>Enter GitHub Username</h2>
        <input
          className="search-page__input"
          type="text"
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <button className="search-page__button" type="submit" value="submit">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
