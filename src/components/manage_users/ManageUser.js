import "./manageUser.css";
import {
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
  MdOutlineDelete,
} from "react-icons/md";

const ManageUser = () => {
  let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div class="manage-user-box">
      {/* table header  */}
      <div class="manage-user-head">
        <div class="manage-user-cell first-cell">ID</div>
        <div class="manage-user-cell second-cell">Email</div>
        <div class="manage-user-cell third-cell">Name</div>
        <div class="manage-user-cell fourth-cell">Nick name</div>
        <div class="manage-user-cell fifth-cell">Age</div>
        <div class="manage-user-cell sixth-cell">Address</div>
        <div class="manage-user-cell seventh-cell">Phone</div>
        <div class="manage-user-cell eighth-cell">Role</div>
        <div class="manage-user-cell last-cell"></div>
      </div>

      {/* table rows */}
      {rows.map((item, index) => (
        <div class="manage-user-row">
          <div class="manage-user-cell first-cell">
            <p className="manage-user-cell-text">
              Resume Hello world how are you today
            </p>
          </div>
          <div class="manage-user-cell second-cell">
            <p className="manage-user-cell-text">
              Resume Hello world how are you today
            </p>
          </div>
          <div class="manage-user-cell third-cell">
            <p className="manage-user-cell-text">
              Resume Hello world how are you today
            </p>
          </div>
          <div class="manage-user-cell fourth-cell">
            <p className="manage-user-cell-text">
              Resume Hello world how are you today
            </p>
          </div>
          <div class="manage-user-cell fifth-cell">
            <p className="manage-user-cell-text">
              Resume Hello world how are you today
            </p>
          </div>
          <div class="manage-user-cell sixth-cell">
            <p className="manage-user-cell-text">
              Resume Hello world how are you today
            </p>
          </div>
          <div class="manage-user-cell seventh-cell">
            <p className="manage-user-cell-text">
              Resume Hello world how are you today
            </p>
          </div>
          <div class="manage-user-cell eighth-cell">
            <p className="manage-user-cell-text">
              Resume Hello world how are you today
            </p>
          </div>
          <div class="manage-user-cell last-cell manage-user-actions">
            <MdOutlineRemoveRedEye className="manage-user-actions-icon add" />
            <MdOutlineEdit className="manage-user-actions-icon edit" />
            <MdOutlineDelete className="manage-user-actions-icon delete" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageUser;
