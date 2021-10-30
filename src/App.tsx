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

const App = () => {
  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <Router>
        <Switch>
          <Route path="/page/:id"></Route>
          <Authentication>
            <>
              <Route path="/home">
                <HomeRoutes />
              </Route>
              <Route path="/create">
                <CreateRoutes />
              </Route>
            </>
          </Authentication>
        </Switch>
      </Router>
    </div>
  );
};

const HomeRoutes = () => {
  let match = useRouteMatch();
  return (
    <DefaultLayout>
      <Switch>
        <Route children={<Project />} path={`${match.url}`} />
        <Route
          children={<div>This is the profile route</div>}
          path={`${match.url}/profile`}
        />
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
        <Route
          path={`${match.url}/`}
          children={
            <EditorRenderer>
              <Creator />
            </EditorRenderer>
          }
        />
      </Switch>
    </CreatorRenderer>
  );
};

export default App;
