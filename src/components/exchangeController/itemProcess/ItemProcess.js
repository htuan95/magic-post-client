import React, { useContext, useState } from "react";
import makeRequest from "../../../services/makeRequest";
import { AuthContext } from "../../../context/AuthContext";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../loading/loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./itemProcess.scss";
import moment from "moment";
import { MdDone } from "react-icons/md";

const ItemProcess = ({ closeFormModal, listItemProcess }) => {
  const { successMessage, errorMessage, setCurrentUser, currentUser } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  console.log(listItemProcess);
  const formatTime = (timestamp) =>
    moment.unix(timestamp).format("DD-MM-YYYY hh:mm A");

  const isCurrentStatus = () =>
    listItemProcess?.[listItemProcess.length - 1].description;

  return (
    <div class="item-process">
      {loading && <Loading />}
      <div className="item-process-container">
        {listItemProcess
          ?.slice()
          .reverse()
          .map((item, index) => (
            <div className="item-process-child" key={index}>
              <p className="item-process-time">{formatTime(item.commitTime)}</p>
              <div className="item-process-status-progress">
                <div
                  className={
                    index === 0
                      ? "item-process-status active"
                      : "item-process-status"
                  }
                >
                  <MdDone
                    className={
                      index === 0
                        ? "item-process-icon active"
                        : "item-process-icon"
                    }
                  />
                </div>
              </div>

              <p className="item-process-description">{item.description}</p>
            </div>
          ))}
      </div>
      <AiOutlineClose className="item-process-close" onClick={closeFormModal} />
    </div>
  );
};

export default ItemProcess;
