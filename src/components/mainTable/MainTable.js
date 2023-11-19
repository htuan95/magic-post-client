import { useState } from "react";
import Table from "../table/Table";
import "./mainTable.scss";
import { MdOutlineAdd } from "react-icons/md";
import FormModal from "../formModal/FormExchangeModal";
import ManageUser from "../manage_users/ManageUser";
import FormUser from "../formModal/FormUser";
import FilterExchange from "../filterPopup/FilterExchange";

const MainTable = ({ title }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [role, setRole] = useState("USER_NORMAL");
  const [isFilterExchange, setIsFilterExchange] = useState(false);

  // Open modal
  const openFormModal = () => setIsOpenModal(true);
  // Close modal
  const closeFormModal = () => setIsOpenModal(false);

  // on change role
  const onChangeRole = (e) => setRole(e.target.value);

  // open filter exchange
  const openFilterExchange = () => setIsFilterExchange(true);
  // close filter exchange
  const closeFilterExchange = () => setIsFilterExchange(false);
  return (
    <div className="main-table">
      <div className="main-table-container">
        <div className="main-table-top">
          <h2 className="main-table-title">{title} management</h2>
          <div className="main-table-top-actions">
            {title === "Exchange" && (
              <button
                className="main-table-filter"
                onClick={openFilterExchange}
              >
                Filters
              </button>
            )}
            {title === "User" && (
              <select
                name="roles"
                id="roles"
                className="main-table-roles"
                onChange={(e) => onChangeRole(e)}
              >
                <option className="main-table-role-option" value="USER_NORMAL">
                  USER_NORMAL
                </option>
                <option
                  className="main-table-role-option"
                  value="LEADER_OF_COMMODITY_EXCHANGE"
                >
                  LEADER_OF_COMMODITY_EXCHANGE
                </option>
                <option
                  className="main-table-role-option"
                  value="EMPLOYEE_OF_COMMODITY_EXCHANGE"
                >
                  EMPLOYEE_OF_COMMODITY_EXCHANGE
                </option>
                <option
                  className="main-table-role-option"
                  value="LEADER_OF_COMMODITY_GATHERING"
                >
                  LEADER_OF_COMMODITY_GATHERING
                </option>
                <option
                  className="main-table-role-option"
                  value="EMPLOYEE_OF_COMMODITY_GATHERING"
                >
                  EMPLOYEE_OF_COMMODITY_GATHERING
                </option>
              </select>
            )}
            <button className="btn-add" onClick={openFormModal}>
              <p>Add new {title.toLowerCase()}</p>
              <MdOutlineAdd />
            </button>
          </div>
        </div>
        {title === "User" ? <ManageUser role={role} /> : <Table name={title} />}
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
        <FormUser closeFormModal={closeFormModal} role={role} />
      )}

      {isFilterExchange && title === "Exchange" && (
        <FilterExchange closeFilterExchange={closeFilterExchange} />
      )}
    </div>
  );
};

export default MainTable;
