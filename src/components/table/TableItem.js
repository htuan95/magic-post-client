import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../services/makeRequest";
import "./tableItem.css";
import {
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
  MdOutlineDelete,
} from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../loading/loading";
import PopupOptions from "../popup/Popup";

const TableItem = ({ name, isFiltering, dataItem, currentItem }) => {
  const getStrings = (s) =>
    s != null ? (s?.length > 28 ? s?.substr(0, 24) + "..." : s) : "";
  const { currentUser, successMessage, errorMessage } = useContext(AuthContext);

  // remove item
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (exchangeId) => {
      setLoading(true);
      await makeRequest
        .post(
          `/manager/delete-exchange?exchangeId=${exchangeId}`,
          {},
          {
            headers: { Authorization: `Bearer ${currentUser.accessToken}` },
          }
        )
        .then((res) => {
          successMessage("Item deleted.");
          setLoading(false);
        })
        .catch(() => {
          errorMessage("Something went wrong...");
          setLoading(false);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exchanges"] });
    },
  });

  const handleRemoveItem = async (exchangeId) => {
    await mutation.mutateAsync(exchangeId);
  };

  const [openPopupDelete, setOpenPopupDelete] = useState(false);
  const [idItemDelete, setIdItemDelete] = useState("");

  return (
    <div class="table-item-box">
      {/* {isLoading && <Loading />} */}
      {/* table-item header  */}
      <div class="table-item-head">
        <div class="table-item-cell">
          <p>Name</p>
        </div>
        <div class="table-item-cell">
          <p></p>
        </div>
        <div class="table-item-cell">
          <p>{name} Address</p>
        </div>
        <div class="table-item-cell">
          <p>{name} leader id</p>
        </div>
        <div class="table-item-cell">
          <p></p>
        </div>
      </div>

      {/* table-item rows */}
      {currentItem?.length <= 0 && isFiltering ? (
        <p>No exchange match</p>
      ) : (
        currentItem?.map((item, index) => (
          <div class="table-item-row" key={index}>
            <div class="table-item-cell first-cell">
              <p>{getStrings(item.id)}</p>
            </div>
            <div class="table-item-cell second-cell">
              <p>{getStrings(item.exchangeName)}</p>
            </div>
            <div class="table-item-cell third-cell">
              <p>{getStrings(item.exchangeAddress)}</p>
            </div>
            <div class="table-item-cell last-cell">
              <p>{getStrings(item.exchangeLeaderId)}</p>
            </div>
            <div class="table-item-cell table-item-actions">
              <MdOutlineRemoveRedEye className="table-item-actions-icon add" />
              <MdOutlineEdit className="table-item-actions-icon edit" />
              <MdOutlineDelete
                className="table-item-actions-icon delete"
                onClick={() => {
                  setOpenPopupDelete(true);
                  setIdItemDelete(item.id);
                }}
              />
            </div>
          </div>
        ))
      )}
      {dataItem?.length <= 0 ? (
        <p></p>
      ) : (
        dataItem?.map((item, index) => (
          <div class="table-item-row" key={index}>
            <div class="table-item-cell first-cell">
              <p>{getStrings(item.id)}</p>
            </div>
            <div class="table-item-cell second-cell">
              <p>{getStrings(item.exchangeName)}</p>
            </div>
            <div class="table-item-cell third-cell">
              <p>{getStrings(item.exchangeAddress)}</p>
            </div>
            <div class="table-item-cell last-cell">
              <p>{getStrings(item.exchangeLeaderId)}</p>
            </div>
            <div class="table-item-cell table-item-actions">
              <MdOutlineRemoveRedEye className="table-item-actions-icon add" />
              <MdOutlineEdit className="table-item-actions-icon edit" />
              <MdOutlineDelete
                className="table-item-actions-icon delete"
                onClick={() => {
                  setOpenPopupDelete(true);
                  setIdItemDelete(item.id);
                }}
              />
            </div>
          </div>
        ))
      )}
      {openPopupDelete && (
        <PopupOptions
          title="Delete exchange"
          handleAction={() => handleRemoveItem(idItemDelete)}
          loading={loading}
          setOpenPopup={setOpenPopupDelete}
        />
      )}
    </div>
  );
};

export default TableItem;
