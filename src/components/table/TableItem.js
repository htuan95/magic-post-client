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
import UpdateItemProcessInChange from "../exchangeController/updateItemProcessInChange/UpdateItemProcessInChange";
import ItemProcess from "../exchangeController/itemProcess/ItemProcess";
import ViewItem from "../viewPopup/ViewItem";

const TableItem = ({ isFiltering, dataItem, currentItem }) => {
  const getStrings = (s) =>
    s != null ? (s?.length > 12 ? s?.substr(0, 12) + "..." : s) : "";
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

  // update item
  const [openUpdateItem, setOpenUpdateItem] = useState(false);
  const closeUpdateItem = () => setOpenUpdateItem(false);
  const [itemId, setItemId] = useState("");

  const [openProcessItem, setOpenProcessItem] = useState(false);
  const closeProcessItem = () => setOpenProcessItem(false);
  const [listItemProcess, setListItemProcess] = useState([]);

  const [openDetailItem, setOpenDetailItem] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  return (
    <div class="table-item-box">
      {/* {isLoading && <Loading />} */}
      {/* table-item header  */}
      <div class="table-item-head">
        <div class="table-item-cell first-cell">
          <p>ID</p>
        </div>
        <div class="table-item-cell second-cell">
          <p>Name</p>
        </div>
        <div class="table-item-cell third-cell">
          <p>Type</p>
        </div>
        <div class="table-item-cell fourth-cell">
          <p>Mass</p>
        </div>
        <div class="table-item-cell fifth-cell">
          <p>Description</p>
        </div>
        <div class="table-item-cell sixth-cell">
          <p>Status</p>
        </div>
        <div class="table-item-cell last-cell">
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
              <p>{getStrings(item.itemName)}</p>
            </div>
            <div class="table-item-cell third-cell">
              <p>{getStrings(item.itemType)}</p>
            </div>
            <div class="table-item-cell fourth-cell">
              <p>{getStrings(item.itemMass)}</p>
            </div>
            <div class="table-item-cell fifth-cell">
              <p>{getStrings(item.itemDescription)}</p>
            </div>
            <div class="table-item-cell sixth-cell">
              <p>{getStrings(item.itemStatus)}</p>
            </div>
            <div class="table-item-cell last-cell table-item-actions">
              {/* <MdOutlineRemoveRedEye className="table-item-actions-icon add" /> */}
              {currentUser.role === "MANAGER" ? (
                <button
                  className="table-item-btn details"
                  onClick={() => {
                    setItemSelected(item);
                    setOpenDetailItem(true);
                  }}
                >
                  Details
                </button>
              ) : (
                <>
                  <button
                    className="table-item-btn process"
                    onClick={() => {
                      setListItemProcess(item.itemProcess);
                      setOpenProcessItem(true);
                    }}
                  >
                    Process
                  </button>
                  <button
                    className="table-item-btn update"
                    onClick={() => {
                      setOpenUpdateItem(true);
                      setItemId(item.id);
                    }}
                  >
                    Update
                  </button>
                </>
              )}
              {/* <MdOutlineEdit className="table-item-actions-icon edit" />
              <MdOutlineDelete
                className="table-item-actions-icon delete"
                onClick={() => {
                  setOpenPopupDelete(true);
                  setIdItemDelete(item.id);
                }}
              /> */}
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
              <p>{getStrings(item.itemName)}</p>
            </div>
            <div class="table-item-cell third-cell">
              <p>{getStrings(item.itemType)}</p>
            </div>
            <div class="table-item-cell fourth-cell">
              <p>{getStrings(item.itemMass)}</p>
            </div>
            <div class="table-item-cell fifth-cell">
              <p>{getStrings(item.itemDescription)}</p>
            </div>
            <div class="table-item-cell sixth-cell">
              <p>{getStrings(item.itemStatus)}</p>
            </div>
            <div class="table-item-cell last-cell table-item-actions">
              {currentUser.role === "MANAGER" ? (
                <button
                  className="table-item-btn details"
                  onClick={() => {
                    setItemSelected(item);
                    setOpenDetailItem(true);
                  }}
                >
                  Details
                </button>
              ) : (
                <>
                  <button
                    className="table-item-btn process"
                    onClick={() => {
                      setListItemProcess(item.itemProcess);
                      setOpenProcessItem(true);
                    }}
                  >
                    Process
                  </button>
                  <button
                    className="table-item-btn update"
                    onClick={() => {
                      setOpenUpdateItem(true);
                      setItemId(item.id);
                    }}
                  >
                    Update
                  </button>
                </>
              )}
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

      {openUpdateItem && (
        <UpdateItemProcessInChange
          closeFormModal={closeUpdateItem}
          itemId={itemId}
        />
      )}

      {openProcessItem && (
        <ItemProcess
          closeFormModal={closeProcessItem}
          listItemProcess={listItemProcess}
        />
      )}

      {openDetailItem && (
        <ViewItem
          item={itemSelected}
          closeVisible={() => setOpenDetailItem(false)}
        />
      )}
    </div>
  );
};

export default TableItem;
