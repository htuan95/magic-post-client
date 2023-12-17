import React, { useContext, useState } from "react";
import makeRequest from "../../../services/makeRequest";
import { AuthContext } from "../../../context/AuthContext";
import { GetLeaders } from "../../../services/getReq";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../loading/loading";
import { inputConfirmReceivedItem } from "../../../helpers/inputHelpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./confirmReceivedItem.scss";

const ConfirmReceivedItem = ({ closeFormModal }) => {
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
  const [exchangeId, setExchangeId] = useState("");

  const confirmReceivedItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    await makeRequest
      .post(
        "/exchange/confirm-received-item",
        {
          exchangeId: exchangeId,
          itemDescription: values["itemDescription"],
          itemMass: values["itemMass"],
          itemName: values["itemName"],
          itemType: values["itemType"],
          receivingItemUserId: userReceiveId,
          sendingItemUserId: userSendId,
        },
        {
          headers: { Authorization: `Bearer ${currentUser.accessToken}` },
        }
      )
      .then((res) => {
        successMessage("Confirm item successful");
        queryClient.invalidateQueries({ queryKey: ["items"] });
        setLoading(false);
        closeFormModal();
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong...");
        setLoading(false);
      });
  };

  // get list exchange

  const [openExchange, setOpenExchange] = useState(false);
  const [openUserSend, setOpenUserSend] = useState(false);
  const [openUserReceive, setOpenUserReceive] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const prevPage = () => {
    page > 0 && setPage(page - 1);
  };

  const nextPage = () => {
    page + 1 < totalPage && setPage(page + 1);
  };

  const {
    isLoading: loadingExchange,
    data: dataExchange,
    error: errorExchange,
  } = useQuery({
    queryKey: ["exchanges", page],
    queryFn: () =>
      makeRequest
        .post(
          `/listing/get-list-exchange?page=${page}`,
          {},
          {
            headers: { Authorization: `Bearer ${currentUser.accessToken}` },
          }
        )
        .then((res) => {
          setTotalPage(res.data.pagination.totalPage);
          return res.data.data;
        }),
  });

  // users
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [listUser, setListUser] = useState([]);
  const handleFilterUser = async (e) => {
    setLoading(true);

    await makeRequest
      .post(
        "/listing/get-list-normal-user",
        {
          normalUserEmail: email,
          normalUserName: username,
        },
        {
          headers: { Authorization: "Bearer " + currentUser.accessToken },
        }
      )
      .then((res) => {
        setListUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        errorMessage("Something went wrong...");
        setLoading(false);
      });
  };

  // users
  const [userSendId, setUserSendId] = useState("");
  const [userReceiveId, setUserReceiveId] = useState("");

  // get list users by role
  const { isLoading, data: users, error } = GetLeaders("users", "USER_NORMAL");

  return (
    <div class="confirm-item">
      {loading && <Loading />}
      <div className="confirm-item-container">
        <form className="confirm-item-form" onSubmit={confirmReceivedItem}>
          <div className="confirm-item-form-group">
            <div className="confirm-item-list-btn">
              <button
                className="confirm-item-assign"
                type="button"
                onClick={() => {
                  setOpenExchange(true);
                  setOpenUserSend(false);
                  setOpenUserReceive(false);
                }}
              >
                Choose exchange
              </button>
              <button
                className="confirm-item-assign"
                type="button"
                onClick={() => {
                  setOpenUserSend(true);
                  setOpenExchange(false);
                  setOpenUserReceive(false);
                }}
              >
                Choose user send
              </button>
              <button
                className="confirm-item-assign"
                type="button"
                onClick={() => {
                  setOpenUserReceive(true);
                  setOpenUserSend(false);
                  setOpenExchange(false);
                }}
              >
                Choose receive
              </button>
            </div>

            {openUserSend && (
              <div className="confirm-item-list-leader">
                <div className="confirm-item-list-user-send">
                  <input
                    type="text"
                    className="confirm-item-list-user-send-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    className="confirm-item-list-user-send-input"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button
                    type="button"
                    className="confirm-item-list-user-send-find"
                    onClick={handleFilterUser}
                  >
                    Find
                  </button>
                </div>
                {loading ? (
                  <Loading />
                ) : error ? (
                  errorMessage("Something went wrong")
                ) : listUser?.length === 0 ? (
                  <p>Not have any users</p>
                ) : (
                  listUser?.map((u, i) => (
                    <div
                      className="confirm-item-list-item"
                      key={i}
                      onClick={() => {
                        setUserSendId(u.id);
                        setOpenUserSend(false);
                      }}
                    >
                      <p className="confirm-item-list-item-name">
                        {u.name} with {u.email}
                      </p>
                    </div>
                  ))
                )}
                {totalPage > 0 && (
                  <div class="pagination confirm-item-p">
                    <button
                      className="pagination-btn prev-btn confirm-item-p"
                      type="button"
                      onClick={prevPage}
                    >
                      Prev
                    </button>
                    <p className="pagination-current confirm-item-p">
                      {page + 1} / {totalPage}
                    </p>
                    <button
                      className="pagination-btn next-btn confirm-item-p"
                      type="button"
                      onClick={nextPage}
                    >
                      Next
                    </button>
                  </div>
                )}
                <div
                  className="confirm-item-leader-close"
                  onClick={() => {
                    setOpenExchange(false);
                    setOpenUserSend(false);
                    setOpenUserReceive(false);
                    setPage(0);
                  }}
                >
                  <AiOutlineClose />
                </div>
              </div>
            )}

            {openUserReceive && (
              <div className="confirm-item-list-leader">
                <div className="confirm-item-list-user-send">
                  <input
                    type="text"
                    className="confirm-item-list-user-send-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    className="confirm-item-list-user-send-input"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button
                    type="button"
                    className="confirm-item-list-user-send-find"
                    onClick={handleFilterUser}
                  >
                    Find
                  </button>
                </div>
                {loading ? (
                  <Loading />
                ) : error ? (
                  errorMessage("Something went wrong")
                ) : listUser?.length === 0 ? (
                  <p>Not have any users</p>
                ) : (
                  listUser?.map((u, i) => (
                    <div
                      className="confirm-item-list-item"
                      key={i}
                      onClick={() => {
                        setUserReceiveId(u.id);
                        setOpenUserReceive(false);
                      }}
                    >
                      <p className="confirm-item-list-item-name">
                        {u.name} with {u.email}
                      </p>
                    </div>
                  ))
                )}
                {totalPage > 0 && (
                  <div class="pagination confirm-item-p">
                    <button
                      className="pagination-btn prev-btn confirm-item-p"
                      type="button"
                      onClick={prevPage}
                    >
                      Prev
                    </button>
                    <p className="pagination-current confirm-item-p">
                      {page + 1} / {totalPage}
                    </p>
                    <button
                      className="pagination-btn next-btn confirm-item-p"
                      type="button"
                      onClick={nextPage}
                    >
                      Next
                    </button>
                  </div>
                )}
                <div
                  className="confirm-item-leader-close"
                  onClick={() => {
                    setOpenExchange(false);
                    setOpenUserSend(false);
                    setOpenUserReceive(false);
                    setPage(0);
                  }}
                >
                  <AiOutlineClose />
                </div>
              </div>
            )}

            {openExchange && (
              <div className="confirm-item-list-leader">
                {isLoading ? (
                  <Loading />
                ) : error ? (
                  errorMessage("Something went wrong")
                ) : dataExchange?.length === 0 ? (
                  <p>Not have any exchange</p>
                ) : (
                  dataExchange?.map((u, i) => (
                    <div
                      className="confirm-item-list-item"
                      key={i}
                      onClick={() => {
                        setExchangeId(u.id);
                        setOpenExchange(false);
                      }}
                    >
                      <p className="confirm-item-list-item-name">
                        {u.exchangeAddress}
                      </p>
                    </div>
                  ))
                )}
                {totalPage > 0 && (
                  <div class="pagination confirm-item-p">
                    <button
                      className="pagination-btn prev-btn confirm-item-p"
                      type="button"
                      onClick={prevPage}
                    >
                      Prev
                    </button>
                    <p className="pagination-current confirm-item-p">
                      {page + 1} / {totalPage}
                    </p>
                    <button
                      className="pagination-btn next-btn confirm-item-p"
                      type="button"
                      onClick={nextPage}
                    >
                      Next
                    </button>
                  </div>
                )}
                <div
                  className="confirm-item-leader-close"
                  onClick={() => {
                    setOpenExchange(false);
                    setOpenUserSend(false);
                    setOpenUserReceive(false);
                    setPage(0);
                  }}
                >
                  <AiOutlineClose />
                </div>
              </div>
            )}

            <div className="confirm-item-input-controller">
              <p className="confirm-item-input-label">Exchange: </p>
              <input
                type="text"
                placeholder="Exchange"
                className="confirm-item-input"
                name="exchangeId"
                value={exchangeId}
                onChange={() => {}}
                required
              />
            </div>
            {inputConfirmReceivedItem.map((item, index) => (
              <div className="confirm-item-input-controller">
                <p className="confirm-item-input-label">{item.placeholder}: </p>
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
              </div>
            ))}
            <div className="confirm-item-input-controller">
              <p className="confirm-item-input-label">User send: </p>
              <input
                type="text"
                placeholder="User send"
                className="confirm-item-input"
                name="userSendId"
                value={userSendId}
                onChange={() => {}}
                required
              />
            </div>
            <div className="confirm-item-input-controller">
              <p className="confirm-item-input-label">User receive: </p>
              <input
                type="text"
                placeholder="User receive"
                className="confirm-item-input"
                name="userReceiveId"
                value={userReceiveId}
                onChange={() => {}}
                required
              />
            </div>
          </div>

          <button className="confirm-item-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <AiOutlineClose className="confirm-item-close" onClick={closeFormModal} />
    </div>
  );
};

export default ConfirmReceivedItem;
