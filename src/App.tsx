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
import NavigationLayout from "./layouts/NavigationLayout";

const App = () => {
  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <Router>
        <Switch>
          <Route path="/home">
            <HomeRoutes />
          </Route>
          <Route path="/create">
            <CreateRoutes />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const HomeRoutes = () => {
  let match = useRouteMatch();
  return (
    <NavigationLayout>
      <Switch>
        <Route
          children={<div>This is the profile route</div>}
          path={`${match.url}/profile`}
        />
        <Route
          children={<div>This is the home route</div>}
          path={`${match.url}/projects`}
        />
        <Route
          children={<div>This is the home path</div>}
          path={`${match.url}/`}
        />
      </Switch>
    </NavigationLayout>
  );
};

const CreateRoutes = () => {
  let match = useRouteMatch();
  return (
    <CreatorRenderer>
      <Switch>
        <Route path={`${match.url}/preview`}>
          <Previewer />
        </Route>
        <Route path={`${match.url}/`}>
          <EditorRenderer>
            <Creator />
          </EditorRenderer>
        </Route>
      </Switch>
    </CreatorRenderer>
  );
};

export default App;
