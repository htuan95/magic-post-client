import React, { useContext, useState } from "react";
import makeRequest from "../../../services/makeRequest";
import { AuthContext } from "../../../context/AuthContext";
import { GetLeaders } from "../../../services/getReq";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../loading/loading";
import { inputConfirmReceivedItem } from "../../../helpers/inputHelpers";
import { useQueryClient } from "@tanstack/react-query";
import "./confirmReceivedItem.scss";

const ConfirmReceivedItem = () => {
  const { successMessage, errorMessage, setCurrentUser, currentUser } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    itemDescription: "",
    itemName: "",
    itemType: "",
    itemMass: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();
  const [leaderId, setLeaderId] = useState("");

  const confirmReceivedItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    await makeRequest
      .post("/user/register", values, {
        headers: { Authorization: `Bearer ${currentUser.accessToken}` },
      })
      .then((res) => {
        setTimeout(() => {
          setCurrentUser(res.data.data);
          successMessage("Add successful");
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong...");
        setLoading(false);
      });
  };

  // get list users by role
  const { isLoading, data: users, error } = GetLeaders("users", "USER_NORMAL");

  // get list exchange

  const [openListAssign, setOpenListAssign] = useState(false);

  return (
    <div class="confirm-item">
      {loading && <Loading />}
      <div className="confirm-item-container">
        <form className="confirm-item-form" onSubmit={confirmReceivedItem}>
          <div className="confirm-item-form-group">
            <button
              className="confirm-item-choose-exchange"
              onClick={() => setOpenListAssign(true)}
            >
              Choose exchange
            </button>
            {openListAssign && (
              <div className="confirm-item-list-user">
                {isLoading ? (
                  <Loading />
                ) : error ? (
                  errorMessage("Something went wrong")
                ) : users.length === 0 ? (
                  <p>Not have any leader exchange</p>
                ) : (
                  users.map((u, i) => (
                    <div
                      className="confirm-item-list-item"
                      key={i}
                      onClick={() => {
                        // setLeaderId(u.id);
                        setOpenListAssign(false);
                      }}
                    >
                      <p className="confirm-item-list-item-name">{u.name}</p>
                    </div>
                  ))
                )}

                <div
                  className="confirm-item-user-close"
                  onClick={() => setOpenListAssign(false)}
                >
                  <AiOutlineClose />
                </div>
              </div>
            )}
            <input
              type="text"
              placeholder="Exchange leader id"
              className="confirm-item-input"
              name="exchangeLeaderId"
              value={leaderId}
              onChange={() => {}}
              required
            />
            {inputConfirmReceivedItem.map((item, index) => (
              <input
                className="confirm-item-input"
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

          <button className="confirm-item-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmReceivedItem;
