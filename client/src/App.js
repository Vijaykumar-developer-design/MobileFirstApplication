// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";

import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <ProtectedRoute exact path="/characters" component={CharacterList} />
        <ProtectedRoute
          exact
          path="/character/:id"
          component={CharacterDetails}
        />
        <Redirect to="/signin" />
      </Switch>
    </Router>
  );
};

export default App;
