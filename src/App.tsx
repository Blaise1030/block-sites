import React from "react";
import CreatorRenderer from "./contexts/CreatorContext";
import EditorRenderer from "./contexts/EditorContext";
import Creator from "./views/Creator";
import Previewer from "./views/Previewer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Project from "./views/Project";
import Authentication from "./contexts/AuthContext";
import Page from "./views/Page";
import Profile from "./views/Profile";
import Home from "./views/Home";
import Login from "./views/Login";

const App = () => {
  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/page/:id" component={Page} />
          <AuthenticationRoutes />
        </Switch>
      </Router>
    </div>
  );
};

const AuthenticationRoutes = () => {
  return (
    <Authentication>
      <>
        <Route path="/home" component={HomeRoutes} />
        <Route path="/create/:id" component={CreateRoutes} />
      </>
    </Authentication>
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
