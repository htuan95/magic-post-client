import Loading from "../loading/loading";
import MainTable from "../mainTable/MainTable";
import "./main.scss";

const Main = ({ selectedMenu }) => {
  return (
    <div className="main">
      <MainTable
        title={selectedMenu === "Gathering" ? "Gathering" : "Exchange"}
      />
    </div>
  );
};

export default Main;
