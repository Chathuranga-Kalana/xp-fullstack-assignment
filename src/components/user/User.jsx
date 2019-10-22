import React from "react";
import { Link } from "react-router-dom";

import { github_api } from "../../utils/api";
import "./user.css";

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      reposDatas: [],
      networkResp: true,
      reposRespo: true
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    // alert(this.state.userName);
    this.props.history.push(`/readme`);
  }
  onClick() {}

  componentDidMount() {
    const name = this.props.match.params.username;

    // alert(this.props.match.params.username);
    github_api(`/users/${name}`)
      .then(response => {
        this.setState({ networkResp: response.ok });
        return response.json();
      })
      .then(user => {
        this.setState({
          user: user
        });
      })
      .catch(error => {
        console.error(error);
        return { name: "Network Error" };
      });

    github_api(`/users/${name}/repos`)
      .then(response => {
        this.setState({
          reposRespo: response.ok
        });
        return response.json();
      })
      .then(json => {
        this.setState({
          reposDatas: json
        });
      })
      .catch(error => {
        console.error(error);
        return { name: "Network Error" };
      });
  }
  renderStat(stat) {
    return (
      <li key={stat.name} className="user-info__stat">
        <Link to={stat.html_url}>
          <p className="user-info__stat-value">{stat.value}</p>
          <p className="user-info__stat-name">{stat.name}</p>
        </Link>
      </li>
    );
  }

  render() {
    if (!this.state.user) {
      return <div className="user-page">LOADING...</div>;
    }
    const username = this.props.match.params.username;
    const user = this.state.user;
    //network responces
    const networkResp = this.state.networkResp;
    const reposRespo = this.state.reposRespo;

    // alert(networkResp);

    var { reposDatas } = this.state;

    // console.log(reposDatas);
    // User Overall Data
    const stats = [
      {
        name: "Public Repos",
        value: user.public_repos
      },
      {
        name: "Followers",
        value: user.followers
      },
      {
        name: "Following",
        value: user.following
      }
    ];

    return (
      <section>
        {networkResp ? (
          <div className="user-page">
            <div className="user-info">
              <a
                className="user-info__text"
                href={`https://github.com/${user.login}`}
              >
                <img
                  className="user-info__avatar"
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                />
                <h2 className="user-info__title">
                  {user.login} ({user.name})
                </h2>
                <p className="user-info__bio">{user.bio}</p>
              </a>

              <ul className="user-info__stats">{stats.map(this.renderStat)}</ul>
            </div>
            <div>
              {reposRespo ? (
                <ul className="user-rep">
                  {reposDatas.map(reposData => (
                    <Link to={`/readme/${username}/${reposData.name}`}>
                      <li key={reposData.id}>{reposData.name}</li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <p>No repositories Found</p>
              )}
            </div>
          </div>
        ) : (
          <p>User Not Found</p>
        )}
      </section>
    );
  }
}

export default User;
