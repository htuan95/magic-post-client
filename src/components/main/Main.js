import Loading from "../loading/loading";
import MainTable from "../mainTable/MainTable";
import ManageExchange from "../manageExchange/ManageExchange";
import ManageUser from "../manage_users/ManageUser";
import "./main.scss";

const Main = ({ selectedMenu }) => {
  const caseManager = () => {
    switch (selectedMenu) {
      case "User":
        return <MainTable title="User" />;
      case "Exchange":
        return <ManageExchange />;
      case "Gathering":
        return <MainTable title="Gathering" />;
      default:
        break;
    }
  };

  return <div className="main">{caseManager()}</div>;
};

export default Main;
