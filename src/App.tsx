import React, {Suspense} from "react";
import {ReactElement, useContext, useEffect} from "react";
const Home = React.lazy(() => import("../src/views/Home"));
const Page = React.lazy(() => import("../src/views/Page"));
const Login = React.lazy(() => import("../src/views/Login"));
const Profile = React.lazy(() => import("../src/views/Profile"));
const Project = React.lazy(() => import("../src/views/Project"));
const Creator = React.lazy(() => import("../src/views/Creator"));
const Previewer = React.lazy(() => import("../src/views/Previewer"));
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
import LoadingIndicator from "./components/LoadingIndicator";

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
                <Suspense fallback={<LoadingIndicator />}>
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
                  <Suspense fallback={<LoadingIndicator />}>
                    <Login />
                  </Suspense>
                );
              }}
            />
            <RouteGaurds
              path="/home/main"
              component={
                <DefaultLayout>
                  <Suspense fallback={<LoadingIndicator />}>
                    <Home />
                  </Suspense>
                </DefaultLayout>
              }
            />
            <RouteGaurds
              path="/home/profile"
              component={
                <DefaultLayout>
                  <Suspense fallback={<LoadingIndicator />}>
                    <Profile />
                  </Suspense>
                </DefaultLayout>
              }
            />
            <RouteGaurds
              path="/home"
              component={
                <DefaultLayout>
                  <Suspense fallback={<LoadingIndicator />}>
                    <Project />
                  </Suspense>
                </DefaultLayout>
              }
            />
            <CreatorRenderer>
              <RouteGaurds
                path="/preview/:id"
                component={
                  <Suspense fallback={<LoadingIndicator />}>
                    <Previewer />
                  </Suspense>
                }
              />
              <EditorRenderer>
                <RouteGaurds
                  path="/create/:id"
                  component={
                    <Suspense fallback={<LoadingIndicator />}>
                      <Creator />
                    </Suspense>
                  }
                />
              </EditorRenderer>
            </CreatorRenderer>
            <Route path="" children={<Redirect to={"/login"} />} />
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
