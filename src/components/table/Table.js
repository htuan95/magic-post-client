import "./table.css";
import {
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
  MdOutlineDelete,
} from "react-icons/md";

const Table = ({ name }) => {
  let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
          <p></p>
        </div>
      </div>

      {/* table rows */}
      {rows.map((item, index) => (
        <div class="table-row">
          <div class="table-cell first-cell">
            <p>Resume Website Tutorial</p>
          </div>
          <div class="table-cell second-cell">
            <p>999</p>
          </div>
          <div class="table-cell third-cell">
            <p>Address</p>
          </div>
          <div class="table-cell table-actions">
            <MdOutlineRemoveRedEye className="table-actions-icon add" />
            <MdOutlineEdit className="table-actions-icon edit" />
            <MdOutlineDelete className="table-actions-icon delete" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
