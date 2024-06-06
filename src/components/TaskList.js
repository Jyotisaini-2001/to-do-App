
import React from "react";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import "../style/style.css";

const TaskList = ({ assigneeFilter, priorityFilter }) => {

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-lightgray";
      case "InProgress":
        return "bg-orange";
      case "Completed":
        return "bg-lightgreen";
      default:
        return "bg-secondary";
    }
  };

  // Get the current user from Redux state
  const currentUser = useSelector((state) => state.auth.currentUser);

  // Get tasks from Redux state
  const tasks = useSelector((state) => state.tasks);

  // Check if currentUser is null
  if (!currentUser) {
    return <p>Please log in to see your tasks.</p>;
  }

  // Filter tasks to only show tasks created by the current user
  const userTasks = Object.entries(tasks).reduce((acc, [status, taskList]) => {
    const filteredTasks = taskList.filter(task => {
      console.log("Task UserID:", task.userId); // Log the userId of each task
      return task.userId === currentUser.username;
    });
    if (filteredTasks.length > 0) {
      acc[status] = filteredTasks;
    }
    return acc;
  }, {});
  console.log("Filtered User Tasks:", userTasks);

  return (
    <div className="mt-4 mb-4 card-scroll ml-2 mr-2" style={{ maxWidth: "100%" }}>
      <div className="row flex-nowrap">
        {Object.entries(userTasks).map(([status, taskList]) => (
          <div className="col-sm-12 col-md-6 col-lg-4" key={status}>
            <div className="card col-card d-flex flex-column h-100">
              <div className={`text-center card-header ${getStatusColor(status)}`}>
                {status}
              </div>
              <div className="card-body">
                {Array.isArray(taskList) ? (
                  taskList.map((task, index) => (
                    <TaskCard key={index} task={task} />
                  ))
                ) : (
                  <p>No tasks found</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
