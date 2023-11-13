// import "./styles/index.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
// import { Suspense, lazy, useContext } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
// import NotFound from "./NotFound";
import Home from "./pages/home/home";
import Login from "./pages/login/login"
import Register from "./pages/register/register"

// const Home = lazy(() => import("./pages/Home"));
// const Login = lazy(() => import("./pages/Login"));
// const Register = lazy(() => import("./pages/Register"));
// const Profile = lazy(() => import("./pages/Profile"));
// const PostDetails = lazy(() => import("./pages/PostDetails"));
// const Chat = lazy(() => import("./pages/Chat"));

const App = () => {
  // const { currentUser } = useContext(AuthContext);

  const PrivateRoute = () => {
    // return currentUser?.accessToken ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" exact element={<Home />} />
        {/* <Route path="/u/:username" element={<Profile />} />
            <Route path="/p/:postId" element={<PostDetails />} />
            <Route path="/chat" element={<Chat />} /> */}
        {/* </Route> */}
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/*" element={<NotFound />} />  */}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
