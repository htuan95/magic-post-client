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
import ManagerManageItem from "../managerController/ManagerManageItem";
import LeaderExchangeManageItem from "../managerController/LeaderExchangeManageItem";

const Main = ({ selectedMenu }) => {
  const { currentUser } = useContext(AuthContext);

  const caseManager = () => {
    switch (selectedMenu) {
      case "User":
        if (
          currentUser?.role === "LEADER_OF_COMMODITY_EXCHANGE" ||
          currentUser?.role === "LEADER_OF_COMMODITY_GATHERING"
        ) {
          return <MainTable title="Employee" />;
        } else if (currentUser?.role === "MANAGER") {
          return <MainTable title="Leader" />;
        }
        return <MainTable title="Employee" />;
      case "Exchange":
        return <ManageExchange />;
      case "Gathering":
        return <ManageGathering />;
      case "Items":
        if (currentUser?.role === "MANAGER") {
          return <ManagerManageItem />;
        } else if (currentUser?.role === "LEADER_OF_COMMODITY_EXCHANGE") {
          return <LeaderExchangeManageItem />;
        }
        return <ManageItem />;
      default:
        break;
    }
  };

  return <div className="main">{caseManager()}</div>;
};

export default Main;
