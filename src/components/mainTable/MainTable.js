import { useState } from "react";
import Table from "../table/Table";
import "./mainTable.scss";
import { MdOutlineAdd } from "react-icons/md";
import FormModal from "../formModal/FormModal";
import ManageUser from "../manage_users/ManageUser";
import FormUser from "../formModal/FormUser";

const MainTable = ({ title }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Open modal
  const openFormModal = () => setIsOpenModal(true);
  // Close modal
  const closeFormModal = () => setIsOpenModal(false);

  return (
    <div className="main-table">
      <div className="main-table-container">
        <div className="main-table-top">
          <h2 className="main-table-title">{title} management</h2>
          <button className="btn-add" onClick={openFormModal}>
            <p>Add new {title.toLowerCase()}</p>
            <MdOutlineAdd />
          </button>
        </div>
        {title === "User" ? <ManageUser /> : <Table name={title} />}
      </div>
      <div class="main-table-pagination">
        <button className="pagination-btn prev-btn">Prev</button>
        <p className="pagination-current">1 / 20</p>
        <button className="pagination-btn next-btn">Next</button>
      </div>

      {isOpenModal && title === "Exchange" && (
        <FormModal closeFormModal={closeFormModal} />
      )}

      {isOpenModal && title === "User" && (
        <FormUser closeFormModal={closeFormModal} />
      )}
    </div>
  );
};

export default MainTable;
