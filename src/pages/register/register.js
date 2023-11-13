import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import makeRequest from "../../services/makeRequest";
import Loading from "../../components/loading/loading";

const Register = () => {
  const { successMessage, errorMessage } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    nickName: "",
    age: "",
    address: "",
    phoneNumber: "",
    password: "",
    // confirmPassword: "",
    role: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { age, ...others } = values;
    let convertAgeToInt = parseInt(age);
    const data = { age: convertAgeToInt, ...others };

    console.log(data);

    await makeRequest
      .post("/user/register", data)
      .then((res) => {
        setTimeout(() => {
          successMessage("Register successfully");
          setLoading(false);
          navigate("/login");
        });
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong...");
        setLoading(false);
      });
  };

  return (
    <div class="register">
      <div className="register-intro-header">
        <Link to="/" className="link">
          <img
            className="register-intro-header-logo"
            src="https://res.cloudinary.com/djqxdscwh/image/upload/v1699885216/main-logo-white-transparent_o4yzqi.png"
            alt=""
          />
        </Link>
        <div className="register-intro-header-btn">
          <Link to="/login" className="link">
            <button className="register-intro-login">Login</button>
          </Link>
          <Link to="/register" className="link">
            <button className="register-intro-register">Register</button>
          </Link>
        </div>
      </div>
      {loading && <Loading />}
      <form className="register-form" onSubmit={handleRegister}>
        <h3 className="register-title">Register</h3>

        <div className="register-form-group">
          <div className="register-group">
            <input
              className="register-input"
              type="email"
              placeholder="Email"
              name="email"
              value={values["email"]}
              onChange={onChange}
              required
            />

            <input
              className="register-input"
              type="text"
              onChange={onChange}
              placeholder="Name"
              name="name"
              value={values["name"]}
              required
            />

            <input
              className="register-input"
              type="text"
              onChange={onChange}
              placeholder="Nickname"
              name="nickName"
              value={values["nickName"]}
              required
            />

            <input
              className="register-input"
              type="number"
              max={100}
              min={18}
              onChange={onChange}
              placeholder="Age"
              name="age"
              value={values["age"]}
              required
            />
          </div>

          <div className="register-group">
            <input
              className="register-input"
              type="text"
              onChange={onChange}
              placeholder="Address"
              name="address"
              value={values["address"]}
              required
            />

            <input
              className="register-input"
              type="text"
              onChange={onChange}
              placeholder="Phone"
              name="phoneNumber"
              value={values["phoneNumber"]}
              required
            />

            <input
              className="register-input"
              type="password"
              onChange={onChange}
              placeholder="Password"
              name="password"
              value={values["password"]}
              required
            />

            {/* <input
              className="register-input"
              type="password"
              onChange={onChange}
              placeholder="Confirm password"
              name="confirmPassword"
              value={values["confirmPassword"]}
            /> */}

            <select className="register-select" onChange={onChange} name="role">
              <option className="register-option" value="MANAGER">
                MANAGER
              </option>
              <option
                className="register-option"
                value="LEADER_OF_COMMODITY_EXCHANGE"
              >
                LEADER_OF_COMMODITY_EXCHANGE
              </option>
              <option
                className="register-option"
                value="EMPLOYEE_OF_COMMODITY_EXCHANGE"
              >
                EMPLOYEE_OF_COMMODITY_EXCHANGE
              </option>
              <option
                className="register-option"
                value="LEADER_OF_COMMODITY_GATHERING"
              >
                LEADER_OF_COMMODITY_GATHERING
              </option>
              <option
                className="register-option"
                value="EMPLOYEE_OF_COMMODITY_GATHERING"
              >
                EMPLOYEE_OF_COMMODITY_GATHERING
              </option>
              <option className="register-option" value="USER_NORMAL">
                USER_NORMAL
              </option>
            </select>
          </div>
        </div>

        <button className="register-btn" type="submit">
          Register
        </button>
        <div className="register-footer">
          <p>Do you have an account ?</p>
          <Link to="/login" className="link">
            <p className="register-btn-login">Login</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
