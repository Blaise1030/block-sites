import React, {ReactElement, useContext, useEffect} from "react";
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
          <Route path="/page/:id" component={Page} />
          <Authentication>
            <CreatorRenderer>
              <EditorRenderer>
                <RouteGaurds path="/preview/:id" component={<Previewer />} />
                <RouteGaurds path="/create/:id" component={<Creator />} />
                <Route path="/login" component={Login} />
                <Route
                  path="/home"
                  render={() => (
                    <DefaultLayout>
                      <Switch>
                        <RouteGaurds path="" component={<Project />} />
                        <RouteGaurds path="profile" component={<Profile />} />
                        <RouteGaurds path="main" component={<Home />} />
                      </Switch>
                    </DefaultLayout>
                  )}
                />
              </EditorRenderer>
            </CreatorRenderer>
          </Authentication>
        </Switch>
      </Router>
    </div>
  );
};

const RouteGaurds = ({
  component,
  exact = true,
  path,
}: {
  component: ReactElement;
  exact?: boolean;
  path: string;
}) => {
  const {userData} = useContext(AuthenticationContext);
  return (
    <Route
      render={() => (userData ? component : <Redirect to={"/login"} />)}
      path={path}
      exact={exact}
    />
  );
};

export default App;
