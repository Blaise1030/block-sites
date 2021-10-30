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
import Renderer from "./components/Renderer";

const App = () => {
  return (
    <div className="h-screen w-screen relative overflow-x-hidden">
      {/* <Router>
        <Switch>
          <Route path="/home">
            <HomeRoutes />
          </Route>
          <Route path="/create">
            <CreateRoutes />
          </Route>
        </Switch>
      </Router> */}
      <Renderer
        pageData={{
          backgroundImage:
            "blob:http://localhost:3000/ecefc725-fa43-498d-bf00-3251c4d63433",
          largestIndex: 18,
          creatorWidth: 800,
          colIndex: 0,
          columns: 3,
          layout: [
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "1",
              x: 1,
              w: 1,
              h: 1,
              y: 10,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "text",
                creatorWidth: 800,
                padding: 2,
                textSize: 38,
                textColor: "#ffffffff",
                backgroundColor: "#ff7575ff",
                textAlignment: "text-justify",
                textVertical: "justify-center",
                text: "Design and \nmade by Blaise in Miri ",
                textStyle: "font-bold",
              },
              resizeHandles: ["se"],
              i: "4",
              x: 0,
              w: 2,
              h: 4,
              y: 0,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "5",
              x: 2,
              w: 1,
              h: 4,
              y: 0,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "6",
              x: 0,
              w: 3,
              h: 1,
              y: 9,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "7",
              x: 2,
              w: 1,
              h: 1,
              y: 10,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "image",
                creatorWidth: 800,
                src: "blob:http://localhost:3000/6c7a0a0a-1dce-48bb-9c13-5431fe899393",
              },
              resizeHandles: ["se"],
              i: "8",
              x: 0,
              w: 3,
              h: 3,
              y: 4,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "9",
              x: 1,
              w: 1,
              h: 1,
              y: 12,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "10",
              x: 2,
              w: 1,
              h: 1,
              y: 11,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "11",
              x: 1,
              w: 1,
              h: 1,
              y: 11,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "text",
                creatorWidth: 800,
                padding: 1,
                textSize: 31,
                textColor: "black",
                backgroundColor: "white",
                textAlignment: "text-center",
                textVertical: "justify-center",
                text: "Table of contents ",
                textStyle: "underline",
              },
              resizeHandles: ["se"],
              i: "12",
              x: 0,
              w: 3,
              h: 1,
              y: 7,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "13",
              x: 0,
              w: 1,
              h: 1,
              y: 10,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "14",
              x: 0,
              w: 1,
              h: 1,
              y: 12,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              resizeHandles: ["se"],
              i: "15",
              x: 0,
              w: 1,
              h: 1,
              y: 11,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "text",
                creatorWidth: 800,
                padding: 1,
                textSize: 20,
                textColor: "#ffffffff",
                backgroundColor: "#b3b165ff",
                textAlignment: "text-center",
                textVertical: "justify-center",
                text: "This is the first project",
                textStyle: "underline",
              },
              resizeHandles: ["se"],
              i: "16",
              x: 0,
              w: 3,
              h: 1,
              y: 8,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              w: 3,
              h: 1,
              y: 13,
              resizeHandles: ["se"],
              i: "17",
              x: 0,
              moved: false,
              static: false,
            },
            {
              data: {
                type: "empty",
                creatorWidth: 800,
              },
              w: 1,
              h: 1,
              y: 12,
              resizeHandles: ["se"],
              i: "18",
              x: 2,
              moved: false,
              static: false,
            },
          ],
        }}
      />
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
