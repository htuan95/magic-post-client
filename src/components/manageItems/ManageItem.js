import { useContext, useEffect, useState } from "react";
import "./manageItem.scss";
import { MdOutlineAdd } from "react-icons/md";
import FilterExchange from "../filterPopup/FilterExchange";
import Table from "../table/Table";
import Pagination from "../../commons/Pagination";
import { AuthContext } from "../../context/AuthContext";
import makeRequest from "../../services/makeRequest";
import Loading from "../loading/loading";
import FormExchangeModal from "../formModal/FormExchangeModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TableItem from "../table/TableItem";
import ConfirmReceivedItem from "../exchangeController/confirmReceivedItem/ConfirmReceivedItem";

const ManageItem = () => {
  const { currentUser, errorMessage } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFilterExchange, setIsFilterExchange] = useState(false);

  // Open modal
  const openFormModal = () => setIsOpenModal(true);
  // Close modal
  const closeFormModal = () => setIsOpenModal(false);

  // close filter exchange
  const closeFilterExchange = () => setIsFilterExchange(false);

  // Handle filters exchange
  const [currentItem, setCurrentItem] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const getFilterExchange = (data) => setCurrentItem(data);

  const queryClient = useQueryClient();

  // pagination
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const prevPage = () => {
    page > 0 && setPage(page - 1);
  };

  const nextPage = () => {
    page + 1 < totalPage && setPage(page + 1);
  };

  const itemLocationType =
    currentUser.role === "EMPLOYEE_OF_COMMODITY_EXCHANGE"
      ? "EXCHANGE"
      : "GATHERING";

  const { isLoading, data, error } = useQuery({
    queryKey: ["items", page, itemLocationType],
    queryFn: () =>
      makeRequest
        .post(
          `/listing/get-list-item-in-exchange-or-gathering?itemLocationType=${itemLocationType}&page=${page}`,
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

  const [itemStatus, setItemStatus] = useState("Select status");

  // const {
  //   isLoading: loadingStatus,
  //   data: dataStatus,
  //   error: errorStatus,
  // } = useQuery({
  //   queryKey: ["items", page, itemLocationType, itemStatus],
  //   queryFn: () =>
  //     makeRequest
  //       .get(
  //         `/listing/get-list-item-exchange-or-gathering?itemLocationType=${itemLocationType}&itemStatus=${itemStatus}&page=${page}`,
  //         {
  //           headers: { Authorization: `Bearer ${currentUser.accessToken}` },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res.data.data);
  //         setTotalPage(res.data.pagination.totalPage);
  //         return res.data.data;
  //       }),
  // });

  return (
    <div className="manage-item">
      <div className="manage-item-container">
        <div className="manage-item-header">
          <h2 className="manage-item-title">Items management</h2>
          <div className="manage-item-actions">
            {currentUser.role !== "LEADER_OF_COMMODITY_EXCHANGE" &&
              currentUser.role !== "LEADER_OF_COMMODITY_GATHERING" &&
              currentUser.role !== "EMPLOYEE_OF_COMMODITY_GATHERING" && (
                <div className="main-table-select-option">
                  <select
                    name="roles"
                    id="roles"
                    className="main-table-roles"
                    onChange={(e) => setItemStatus(e.target.value)}
                  >
                    <option
                      className="main-table-role-option"
                      value
                      style={{ fontSize: "16px" }}
                    >
                      Select status
                    </option>
                    <option
                      className="main-table-role-option"
                      value="USER_RECEIVED_SUCCESSFUL"
                    >
                      USER_RECEIVED_SUCCESSFUL
                    </option>
                    <option
                      className="main-table-role-option"
                      value="USER_RECEIVED_FAILED"
                    >
                      USER_RECEIVED_FAILED
                    </option>
                  </select>
                </div>
              )}
            {currentUser.role === "EMPLOYEE_OF_COMMODITY_EXCHANGE" && (
              <button className="btn-add" onClick={openFormModal}>
                <p>Create new item</p>
                <MdOutlineAdd />
              </button>
            )}
          </div>
        </div>
        <TableItem
          name="Item"
          dataItem={data}
          isFiltering={isFiltering}
          currentItem={currentItem}
        />
      </div>

      {/* <Pagination /> */}
      {totalPage > 0 && (
        <div class="pagination">
          <button
            className="pagination-btn prev-btn"
            // disabled={page < 1}
            onClick={prevPage}
          >
            Prev
          </button>
          <p className="pagination-current">
            {page + 1} / {totalPage}
          </p>
          <button
            className="pagination-btn next-btn"
            // disabled={page + 1 < totalPage}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      )}

      {currentUser.role !== "LEADER_OF_COMMODITY_EXCHANGE" &&
        currentUser.role !== "LEADER_OF_COMMODITY_GATHERING" &&
        isOpenModal && <ConfirmReceivedItem closeFormModal={closeFormModal} />}

      {isFilterExchange && (
        <FilterExchange
          closeFilterExchange={closeFilterExchange}
          getFilterExchange={getFilterExchange}
          setIsFiltering={setIsFiltering}
        />
      )}
    </div>
  );
};

export default ManageItem;
