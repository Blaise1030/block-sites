import React, {useContext, useEffect} from "react";
import CreatorRenderer from "./contexts/CreatorContext";
import EditorRenderer from "./contexts/EditorContext";
import Creator from "./views/Creator";
import Previewer from "./views/Previewer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Project from "./views/Project";
import Authentication, {AuthenticationContext} from "./contexts/AuthContext";
import Page from "./views/Page";
import Profile from "./views/Profile";
import Home from "./views/Home";
import Login from "./views/Login";
import initializeFirebase from "./api/firebase";

const App = () => {
  useEffect(() => {
    initializeFirebase();
  }, []);
  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <Router>
        <Switch>
          <Authentication>
            <Route path="/login" component={Login} />
            <Route path="/page/:id" component={Page} />
            <AuthenticationRoutes />
          </Authentication>
        </Switch>
      </Router>
    </div>
  );
};

const AuthenticationRoutes = () => {
  const {userData} = useContext(AuthenticationContext);

  return (
    <Switch>
      <Route
        render={() => (userData ? <HomeRoutes /> : <Redirect to={"/login"} />)}
        path="/home"
      />
      <Route
        path="/create/:id"
        render={() =>
          userData ? <CreateRoutes /> : <Redirect to={"/login"} />
        }
      />
    </Switch>
  );
};

const HomeRoutes = () => {
  let match = useRouteMatch();
  return (
    <DefaultLayout>
      <Switch>
        <Route path={`${match.url}/main`} component={Home} />
        <Route path={`${match.url}/profile`} component={Profile} />
        <Route path={`${match.url}`} component={Project} />
      </Switch>
    </DefaultLayout>
  );
};

const CreateRoutes = () => {
  let match = useRouteMatch();
  return (
    <CreatorRenderer>
      <Switch>
        <Route path={`${match.url}/preview`} component={Previewer} />
        <Route path={`${match.url}`} component={CreatorContexts} />
      </Switch>
    </CreatorRenderer>
  );
};

const CreatorContexts = () => {
  return (
    <EditorRenderer>
      <Creator />
    </EditorRenderer>
  );
};

export default App;
