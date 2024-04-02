import React, { useState } from "react";
import { useDispatch} from "react-redux";

import EditForm from "./TaskEditForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal component
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../redux/actions/taskAction";
import "../style/card.css"
const TaskCard = ({ task }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    assignee: task.assignee,
    priority: task.priority,
    status: task.status, // Initially set status to empty string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.title === task.title &&
      formData.description === task.description &&
      formData.assignee === task.assignee &&
      formData.priority === task.priority &&
      formData.status === task.status
    ) {
      setShowEditForm(false);
      return;
    }
    // console.log("Task Data:", task);
    // dispatch(updateTask(taskId, updatedTaskData));
    dispatch(updateTask(task.id, formData)); // Ensure taskId is passed here
    setShowEditForm(false);
  };

  const handleEdit = () => {
    setShowEditForm(true);
    setShowOptions(false);
  };
  const handleDelete = () => {
    setShowDeleteModal(true);
    setShowOptions(false);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(task.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="card card-inner mb-3">
      <div className="card-body" style={{ minHeight: "100px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">{task.title}</h5>
          <span className="badge badge-primary">{task.priority}</span>
        </div>
        <hr className="my-3" />
        <p className="card-text">{task.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="assignee-name">@{task.assignee}</p>
          <div
            className="vertical-dots badge badge-primary"
            onClick={() => setShowOptions(!showOptions)}
          >
            <span></span>
            <span></span>
            <span></span>
            {showOptions && (
              <div className="options">
                <p onClick={handleEdit}>Edit</p>
                <hr />
                <p onClick={handleDelete}>Delete</p>
              </div>
            )}
          </div>
        </div>

        <EditForm
          show={showEditForm}
          onHide={() => setShowEditForm(false)}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          task={task}
        />

        <DeleteConfirmationModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          taskName={task.title}
        />
        <button className="btn">{task.status ? task.status : "Assign"}</button>
      </div>
    </div>
  );
};

// export default TaskCard;
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTask: (taskId, updatedTaskData) => {
      dispatch(updateTask(taskId, updatedTaskData));
    },
    onDeleteTask: (taskId) => {
      dispatch(deleteTask(taskId));
    },
  };
};

export default connect(null, mapDispatchToProps)(TaskCard);
