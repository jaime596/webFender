import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./functions/protectedRoute";

import Login from "./Components/Login";
import Main from "./Components/Main";
import Register from "./Components/Register";
import Profile from "./Components/profile"

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

      </Switch>
    </div>
  );
}

export default AppRoutes;
