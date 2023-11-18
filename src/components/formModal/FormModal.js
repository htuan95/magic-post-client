import "./formModal.css";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import makeRequest from "../../services/makeRequest";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../loading/loading";
import { AiOutlineClose } from "react-icons/ai";
import { inputExchange } from "../../helpers/inputHelpers";

const FormModal = ({ closeFormModal }) => {
  const { successMessage, errorMessage, setCurrentUser } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    exchangeLeaderId: "",
    exchangeName: "",
    exchangeAddress: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAddNewExchange = async (e) => {
    e.preventDefault();
    setLoading(true);

    await makeRequest
      .post("/manager/add-new-exchange", values)
      .then((res) => {
        setTimeout(() => {
          setCurrentUser(res.data.data);
          successMessage("Add successful");
          setLoading(false);
          closeFormModal();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong...");
        setLoading(false);
      });
  };

  return (
    <div class="form-modal">
      {loading && <Loading />}
      <div className="form-modal-container">
        <form className="form-modal-form" onSubmit={handleAddNewExchange}>
          <div className="form-modal-form-group">
            {inputExchange.map((item, index) => (
              <input
                className="form-modal-input"
                type={item.type}
                placeholder={item.placeholder}
                name={item.name}
                value={values[item.name]}
                onChange={onChange}
                required
                key={index}
              />
            ))}
          </div>

          <button className="form-modal-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <AiOutlineClose className="form-modal-close" onClick={closeFormModal} />
    </div>
  );
};

export default FormModal;
