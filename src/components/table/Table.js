import "./table.css";
import {
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
  MdOutlineDelete,
} from "react-icons/md";

const Table = ({ name, isFiltering, dataExchange, currentExchange }) => {
  const getStrings = (s) => (s.length > 28 ? s.substr(0, 24) + "..." : s);

  return (
    <div class="table-box">
      {/* table header  */}
      <div class="table-head">
        <div class="table-cell">
          <p>ID</p>
        </div>
        <div class="table-cell">
          <p>{name} Name</p>
        </div>
        <div class="table-cell">
          <p>{name} Address</p>
        </div>
        <div class="table-cell">
          <p>{name} leader id</p>
        </div>
        <div class="table-cell">
          <p></p>
        </div>
      </div>

      {/* table rows */}
      {currentExchange.length <= 0 && isFiltering ? (
        <p>No exchange match</p>
      ) : (
        currentExchange.map((item, index) => (
          <div class="table-row" key={index}>
            <div class="table-cell first-cell">
              <p>{getStrings(item.id)}</p>
            </div>
            <div class="table-cell second-cell">
              <p>{getStrings(item.exchangeName)}</p>
            </div>
            <div class="table-cell third-cell">
              <p>{getStrings(item.exchangeAddress)}</p>
            </div>
            <div class="table-cell last-cell">
              <p>{getStrings(item.exchangeLeaderId)}</p>
            </div>
            <div class="table-cell table-actions">
              <MdOutlineRemoveRedEye className="table-actions-icon add" />
              <MdOutlineEdit className="table-actions-icon edit" />
              <MdOutlineDelete className="table-actions-icon delete" />
            </div>
          </div>
        ))
      )}
      {
        dataExchange.length <= 0 ? (
          <p></p>
        ) : (
          dataExchange.map((item, index) => (
            <div class="table-row" key={index}>
              <div class="table-cell first-cell">
                <p>{getStrings(item.id)}</p>
              </div>
              <div class="table-cell second-cell">
                <p>{getStrings(item.exchangeName)}</p>
              </div>
              <div class="table-cell third-cell">
                <p>{getStrings(item.exchangeAddress)}</p>
              </div>
              <div class="table-cell last-cell">
                <p>{getStrings(item.exchangeLeaderId)}</p>
              </div>
              <div class="table-cell table-actions">
                <MdOutlineRemoveRedEye className="table-actions-icon add" />
                <MdOutlineEdit className="table-actions-icon edit" />
                <MdOutlineDelete className="table-actions-icon delete" />
              </div>
            </div>
          ))
        )
        // )
      }
    </div>
  );
};

export default Table;
