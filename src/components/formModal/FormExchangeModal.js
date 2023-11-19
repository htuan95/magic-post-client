import "./formExchangeModal.css";
import { useContext, useState } from "react";
import makeRequest from "../../services/makeRequest";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../loading/loading";
import { AiOutlineClose } from "react-icons/ai";
import { inputFilterExchange } from "../../helpers/inputHelpers";
import { GetLeadersExchange } from "../../services/getReq";
import { useQueryClient } from "@tanstack/react-query";

const FormExchangeModal = ({ closeFormModal }) => {
  const { successMessage, errorMessage, currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [leaderId, setLeaderId] = useState("");
  const [values, setValues] = useState({
    exchangeName: "",
    exchangeAddress: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const handleAddNewExchange = async (e) => {
    e.preventDefault();
    setLoading(true);

    await makeRequest
      .post(
        "/manager/add-new-exchange",
        {
          exchangeLeaderId: leaderId,
          exchangeAddress: values["exchangeAddress"],
          exchangeName: values["exchangeName"],
        },
        {
          headers: { Authorization: `Bearer ${currentUser.accessToken}` },
        }
      )
      .then((res) => {
        setTimeout(() => {
          queryClient.invalidateQueries(["exchanges"]);
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

  // get list users by role
  const {
    isLoading,
    data: leadersExchange,
    error,
  } = GetLeadersExchange("users", "LEADER_OF_COMMODITY_EXCHANGE");

  const [openListAssign, setOpenListAssign] = useState(false);

  return (
    <div class="form-exchange">
      {loading && <Loading />}
      <div className="form-exchange-container">
        <form className="form-exchange-form" onSubmit={handleAddNewExchange}>
          <div className="form-exchange-form-group">
            <button
              className="form-exchange-assign"
              onClick={() => setOpenListAssign(true)}
            >
              Assign leader
            </button>
            {openListAssign && (
              <div className="form-exchange-list-leader">
                {isLoading ? (
                  <Loading />
                ) : error ? (
                  errorMessage("Something went wrong")
                ) : leadersExchange.length === 0 ? (
                  <p>Not have any leader exchange</p>
                ) : (
                  leadersExchange.map((u, i) => (
                    <div
                      className="form-exchange-list-item"
                      key={i}
                      onClick={() => {
                        setLeaderId(u.id);
                        setOpenListAssign(false);
                      }}
                    >
                      <p className="form-exchange-list-item-name">{u.name}</p>
                    </div>
                  ))
                )}

                <div
                  className="form-exchange-leader-close"
                  onClick={() => setOpenListAssign(false)}
                >
                  <AiOutlineClose />
                </div>
              </div>
            )}
            <input
              type="text"
              placeholder="Exchange leader id"
              className="form-exchange-input"
              name="exchangeLeaderId"
              value={leaderId}
              // onChange={onChange}
              required
            />
            {inputFilterExchange.map((item, index) => (
              <input
                className="form-exchange-input"
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

          <button className="form-exchange-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <AiOutlineClose
        className="form-exchange-close"
        onClick={closeFormModal}
      />
    </div>
  );
};

export default FormExchangeModal;
