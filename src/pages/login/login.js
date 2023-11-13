import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import makeRequest from "../../services/makeRequest";
import Loading from "../../components/loading/loading";

const Login = () => {
  const { successMessage, errorMessage, setCurrentUser } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    await makeRequest
      .post("/user/login", values)
      .then((res) => {
        setCurrentUser(res.data.data);
        successMessage(res.data.status);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong...");
        setLoading(false);
      });
  };

  return (
    <div class="login">
      {loading && <Loading />}
      <form className="login-form" onSubmit={handleRegister}>
        <h3 className="login-title">Login</h3>

        <div className="login-form-group">
          <input
            className="login-input"
            type="text"
            placeholder="Email"
            name="email"
            value={values["email"]}
            onChange={onChange}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            value={values["password"]}
            required
          />
        </div>

        <button className="login-btn" type="submit">
          Login
        </button>
        <div className="login-footer">
          <p>Create new an account?</p>
          <Link to="/register" className="link">
            <p className="login-btn-signup">Register</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
