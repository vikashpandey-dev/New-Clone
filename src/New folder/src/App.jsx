import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import VerticleNavbar from "../src/components/VertNavbar";
import HorizNavbar from "../src/components/HorizNavbar";
import { Switch, Route } from "react-router-dom";
import Billboard from "./pages/billboard/Billboard";
import Feedback from "./pages/feedback/Feedback";
import Community from "./pages/community/Community";
import story from "./pages/story/story"
import Notification from "./pages/notification/Notification";
import Stories from "./pages/stories/Stories"
import ManageNotification from "./pages/ManageNotification/ManageNotification";
function App() {
  return (
    <div className="flex w-full">
      {window.location.href.includes("/login") ? (
        ""
      ) : (
        <div className="w8perc h-screen border-r-4 sticky top-0">
          <VerticleNavbar />
        </div>
      )}
      {/* <div className="w-1/12 h-screen border-r-2 sticky top-0">
        <VerticleNavbar />
      </div> */}
      <div className="w-full bg-secondary">
        {window.location.href.includes("/login") ? "" : <HorizNavbar />}

        <Switch>
          <Route
            path={`${import.meta.env.BASE_URL}dashboard`}
            exact
            component={Home}
          />
          <Route
            path={`${import.meta.env.BASE_URL}login`}
            exact
            component={Login}
          />
          <Route
            path={`${import.meta.env.BASE_URL}billboard`}
            exact
            component={Billboard}
          />
          <Route
            path={`${import.meta.env.BASE_URL}feedback`}
            exact
            component={Feedback}
          />
          <Route
            path={`${import.meta.env.BASE_URL}community`}
            exact
            component={Community}
          />
           <Route
            path={`${import.meta.env.BASE_URL}story`}
            exact
            component={story}
          />
          <Route
            path={`${import.meta.env.BASE_URL}notification`}
            exact
            component={Notification}
          />
          <Route
            path={`${import.meta.env.BASE_URL}stories`}
            exact
            component={Stories}
          />
                    <Route
            path={`${import.meta.env.BASE_URL}ManageNotification`}
            exact
            component={ManageNotification}
          />
        </Switch>
      </div>
    </div>
  );
}
export default App;
