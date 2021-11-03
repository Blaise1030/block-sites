import Home from "./views/Home";
import Page from "./views/Page";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Project from "./views/Project";
import Creator from "./views/Creator";
import Previewer from "./views/Previewer";
import initializeFirebase from "./api/firebase";
import DefaultLayout from "./layout/DefaultLayout";
import EditorRenderer from "./contexts/EditorContext";
import CreatorRenderer from "./contexts/CreatorContext";
import {ReactElement, useContext, useEffect} from "react";
import Authentication, {AuthenticationContext} from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  useEffect(() => {
    initializeFirebase();
  }, []);
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Router>
        <Switch>
          <Route path="/page/:id" component={Page} />
          <Authentication>
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
            <CreatorRenderer>
              <RouteGaurds path="/preview/:id" component={<Previewer />} />
              <EditorRenderer>
                <RouteGaurds path="/create/:id" component={<Creator />} />
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
