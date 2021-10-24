import React from "react";
import CreatorRenderer from "./contexts/CreatorContext";
import EditorRenderer from "./contexts/EditorContext";
import Creator from "./Views/Creator";
import Previewer from "./Views/Previewer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

const App = () => {
  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      <Router>
        <Switch>
          <Route path="/create">
            <CreateRoutes />
          </Route>
          <Route path="/">
            <div>This is the home </div>
          </Route>
        </Switch>
      </Router>
    </div>
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
