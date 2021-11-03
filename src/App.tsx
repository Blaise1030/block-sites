import React, {Suspense} from "react";
import {ReactElement, useContext, useEffect} from "react";
const Home = React.lazy(() => import("./views/Home"));
const Page = React.lazy(() => import("./views/Page"));
const Login = React.lazy(() => import("./views/Login"));
const Profile = React.lazy(() => import("./views/Profile"));
const Project = React.lazy(() => import("./views/Project"));
const Creator = React.lazy(() => import("./views/Creator"));
const Previewer = React.lazy(() => import("./views/Previewer"));
import initializeFirebase from "./api/firebase";
import DefaultLayout from "./layout/DefaultLayout";
import EditorRenderer from "./contexts/EditorContext";
import CreatorRenderer from "./contexts/CreatorContext";
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
          <Route
            path="/page/:id"
            component={() => {
              return (
                <Suspense fallback={<div>Loading</div>}>
                  <Page />
                </Suspense>
              );
            }}
          />
          <Authentication>
            <Route
              path="/login"
              component={() => {
                return (
                  <Suspense fallback={<div>Loading</div>}>
                    <Login />
                  </Suspense>
                );
              }}
            />
            <RouteGaurds
              path="/home/main"
              component={
                <DefaultLayout>
                  <Suspense fallback={<div>Loading</div>}>
                    <Home />
                  </Suspense>
                </DefaultLayout>
              }
            />
            <RouteGaurds
              path="/home/profile"
              component={
                <DefaultLayout>
                  <Suspense fallback={<div>Loading</div>}>
                    <Profile />
                  </Suspense>
                </DefaultLayout>
              }
            />
            <RouteGaurds
              path="/home"
              component={
                <DefaultLayout>
                  <Suspense fallback={<div>Loading</div>}>
                    <Project />
                  </Suspense>
                </DefaultLayout>
              }
            />
            <CreatorRenderer>
              <RouteGaurds
                path="/preview/:id"
                component={
                  <Suspense fallback={<div>Loading</div>}>
                    <Previewer />
                  </Suspense>
                }
              />
              <EditorRenderer>
                <RouteGaurds
                  path="/create/:id"
                  component={
                    <Suspense fallback={<div>Loading</div>}>
                      <Creator />
                    </Suspense>
                  }
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
