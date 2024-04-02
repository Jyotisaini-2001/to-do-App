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
  const tasks = useSelector((state) => state.tasks);

  return (
    <div
      className=" mt-4 mb-4 card-scroll ml-2 mr-2"
      style={{ maxWidth: "100%" }}
    >
      <div className="row flex-nowrap ">
        {Object.entries(tasks).map(([status, taskList]) => (
          <div className="col-sm-12 col-md-6 col-lg-4 " key={status}>
            <div className="card col-card d-flex flex-column h-100">
              <div
                className={`text-center card-header ${getStatusColor(status)}`}
              >
                {status}
              </div>
              <div className="card-body">
                {taskList
                  .filter(
                    (task) =>
                      task.assignee &&
                      task.assignee.includes(assigneeFilter) &&
                      (!priorityFilter || task.priority === priorityFilter)
                  )

                  .map((task, index) => (
                    <TaskCard key={index} task={task} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
