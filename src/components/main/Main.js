import { useContext } from "react";
import Loading from "../loading/loading";
import MainTable from "../mainTable/MainTable";
import ManageExchange from "../manageExchange/ManageExchange";
import ManageGathering from "../manageGathering/ManageGathering";
import ManageUser from "../manage_users/ManageUser";
import "./main.scss";
import { AuthContext } from "../../context/AuthContext";
import ConfirmReceivedItem from "../exchangeController/confirmReceivedItem/ConfirmReceivedItem";
import ManageItem from "../manageItems/ManageItem";

const Main = ({ selectedMenu }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const caseManager = () => {
    switch (selectedMenu) {
      case "User":
        if (currentUser?.role === "EMPLOYEE_OF_COMMODITY_EXCHANGE") {
          return <MainTable title="Employee" />;
        }
        return <MainTable title="Employee" />;
      case "Exchange":
        return <ManageExchange />;
      case "Gathering":
        return <ManageGathering />;
      case "Items":
          return <ManageItem />;
      default:
        break;
    }
  };

  return <div className="main">{caseManager()}</div>;
};

export default Main;
