import "./viewItemCustomer.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../loading/loading";
import { AiOutlineClose } from "react-icons/ai";
import makeRequest from "../../services/makeRequest";
import { useQuery } from "@tanstack/react-query";

const ViewItemCustomer = ({ closeVisible, item }) => {
  const { successMessage, errorMessage, currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  
  return (
    <div class="view-popup-customer">
      {loading && <Loading />}
      <div className="view-popup-customer-container">
        <h2 className="view-popup-customer-title">Details information</h2>

        <div className="view-popup-customer-box">
          <div className="view-popup-customer-sender">
            <table className="view-popup-customer-details">
              <tr className="view-popup-customer-item">
                <td className="view-popup-customer-label"></td>
                <td className="view-popup-customer-label">Name</td>
                <td className="view-popup-customer-label">Nick name</td>
                <td className="view-popup-customer-label">Email</td>
                <td className="view-popup-customer-label">Age</td>
                <td className="view-popup-customer-label">Address</td>
                <td className="view-popup-customer-label">Phone</td>
              </tr>
              <tr className="view-popup-customer-item">
                <td
                  className="view-popup-customer-info"
                  style={{ textDecoration: "underline" }}
                >
                  User sent
                </td>
                <td className="view-popup-customer-info">
                  {item?.sendingItemUser?.name}
                </td>
                <td className="view-popup-customer-info">
                  {item?.sendingItemUser?.nickName}
                </td>
                <td className="view-popup-customer-info">
                  {item?.sendingItemUser?.email}
                </td>
                <td className="view-popup-customer-info">
                  {item?.sendingItemUser?.age}
                </td>
                <td className="view-popup-customer-info">
                  {item?.sendingItemUser?.address}
                </td>
                <td className="view-popup-customer-info">
                  {item?.sendingItemUser?.phoneNumber}
                </td>
              </tr>
              <tr className="view-popup-customer-item">
                <td
                  className="view-popup-customer-info"
                  style={{ textDecoration: "underline" }}
                >
                  User receive
                </td>
                <td className="view-popup-customer-info">
                  {item?.receivingItemUser?.name}
                </td>
                <td className="view-popup-customer-info">
                  {item?.receivingItemUser?.nickName}
                </td>
                <td className="view-popup-customer-info">
                  {item?.receivingItemUser?.email}
                </td>
                <td className="view-popup-customer-info">
                  {item?.receivingItemUser?.age}
                </td>
                <td className="view-popup-customer-info">
                  {item?.receivingItemUser?.address}
                </td>
                <td className="view-popup-customer-info">
                  {item?.receivingItemUser?.phoneNumber}
                </td>
              </tr>
            </table>
          </div>
          <h3 style={{ color: "black" }}>Items: </h3>
          <table className="view-popup-customer-details">
            <tr className="view-popup-customer-item">
              <td className="view-popup-customer-label">Name:</td>
              <td className="view-popup-customer-info">{item.itemName}</td>
            </tr>
            <tr className="view-popup-customer-item">
              <td className="view-popup-customer-label">Type:</td>
              <td className="view-popup-customer-info">{item.itemType}</td>
            </tr>
            <tr className="view-popup-customer-item">
              <td className="view-popup-customer-label">Mass:</td>
              <td className="view-popup-customer-info">{item.itemMass}</td>
            </tr>
            <tr className="view-popup-customer-item">
              <td className="view-popup-customer-label">Description:</td>
              <td className="view-popup-customer-info">
                {item.itemDescription}
              </td>
            </tr>
            <tr className="view-popup-customer-item">
              <td className="view-popup-customer-label">Status:</td>
              <td className="view-popup-customer-info">{item.itemStatus}</td>
            </tr>
            <tr className="view-popup-customer-item">
              <td className="view-popup-customer-label">Process:</td>
              <td className="view-popup-customer-info">{item.itemStatus}</td>
            </tr>
          </table>
        </div>
      </div>
      <AiOutlineClose
        className="view-popup-customer-close"
        onClick={closeVisible}
      />
    </div>
  );
};

export default ViewItemCustomer;
