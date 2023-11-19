import Loading from "../loading/loading";
import MainTable from "../mainTable/MainTable";
import ManageUser from "../manage_users/ManageUser";
import "./main.scss";

const Main = ({ selectedMenu }) => {
  const caseManager = () => {
    switch (selectedMenu) {
      case "User":
        return <MainTable title="User" />;
      case "Exchange":
        return <MainTable title="Exchange" />;
      case "Gathering":
        return <MainTable title="Gathering" />;
      default:
        break;
    }
  };

  return <div className="main">{caseManager()}</div>;
};

export default Main;
