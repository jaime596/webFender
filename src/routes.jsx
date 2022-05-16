import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./functions/protectedRoute";

import Login from "./Components/Login";
import Main from "./Components/Main";
import Register from "./Components/Register";
import Profile from "./Components/profile"
import Randomaizer from "./Components/randomaizer";

function AppRoutes() {
  return (
    <div style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute
          exact
          path="/main"
          component={Main} />
        <ProtectedRoute
          exact
          path="/profile"
          component={Profile} />
          <ProtectedRoute
          exact
          path="/randomaizer"
          component={Randomaizer} />

      </Switch>
    </div>
  );
}

export default AppRoutes;
