import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./components/Feed";
import Error from "./components/Error";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App(): React.ReactElement {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />

              <Route
                path="/feed"
                element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/connections"
                element={
                  <ProtectedRoute>
                    <Connections />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/requests"
                element={
                  <ProtectedRoute>
                    <Requests />
                  </ProtectedRoute>
                }
              />
              <Route path="/error" element={<Error />} />
            </Route>
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/resetpassword/:resetToken"
              element={<ResetPassword />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
