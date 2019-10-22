import React from "react";
import {
  Link,
  BrowserRouter as Routers,
  Route,
  Switch
} from "react-router-dom";

import Search from "./search/Search";
import User from "./user/User";
import Readme from "./readme/Readme";
import "./app.css";

class App extends React.Component {
  render() {
    return (
      <Routers>
        <div className="main-app">
          <header className="main-header">
            <h3>
              <Link to="/">xp-fullstack-assignment</Link>
            </h3>
          </header>
          <main className="main-content">
            <Switch>
              <Route exact path="/" component={Search}></Route>
              <Route exact path="/user/:username" component={User}></Route>
              <Route
                exact
                path="/readme/:username/:reponame"
                component={Readme}
              ></Route>
            </Switch>
          </main>
        </div>
      </Routers>
    );
  }
}

export default App;
