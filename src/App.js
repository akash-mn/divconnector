import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/alert";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "../src/utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRouter from "./components/routing/PrivateRouter";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/Profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Landing} />
        </Routes>
        <section className="container">
          <Alert />
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profiles" element={<Profiles />} />
            <Route exact path="/profile/:id" element={<Profile />} />

            <Route
              path="/dashboard"
              element={<PrivateRouter component={Dashboard} />}
            />
            <Route
              path="/create-profile"
              element={<PrivateRouter component={CreateProfile} />}
            />
            <Route
              path="/edit-profile"
              element={<PrivateRouter component={EditProfile} />}
            />
            <Route
              path="/add-experience"
              element={<PrivateRouter component={AddExperience} />}
            />
            <Route
              path="/add-education"
              element={<PrivateRouter component={AddEducation} />}
            />
            <Route
              path="/posts"
              element={<PrivateRouter component={Posts} />}
            />
            <Route
              path="/post/:id"
              element={<PrivateRouter component={Post} />}
            />
          </Routes>
        </section>
      </Provider>
    </>
  );
}

export default App;
