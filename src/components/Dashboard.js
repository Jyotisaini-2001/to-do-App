import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import user from "./user.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../style/style.css";

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
 
  const [startDate, setStartDate] = useState(null); // Declare startDate state
  const [endDate, setEndDate] = useState(null);

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // Load tasks from local storage when component mounts
  useEffect(() => {
    // console.log("Loading tasks from local storage...");
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      // console.log("Tasks found in local storage:", JSON.parse(savedTasks));
      dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(savedTasks) });
    } else {
      // console.log("No tasks found in local storage.");
    }
  }, [dispatch]);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    // console.log("Saving tasks to local storage:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
//  console.log('this is task',tasks);
  const handleToggleTaskForm = () => {
    setShowTaskForm((prevState) => !prevState);
  };
 
  

  // console.log(tasks);

  return (
    <div className="dashboard">
      <nav className="container navbar navbar-light  p-4">
        <h1
          className="navbar-brand mb-0 "
          style={{ color: "#333", fontSize: "2rem" }}
        >
          Task Board
        </h1>
        <img src={user} className="user" alt="Profile Logo" />
      </nav>
      <div className="  box  ml-2 mr-2">
        <div className="filter-section  p-2 ml-2 mr-2">
          {/* Filter by label */}
          <div className="row">
            <div className="col">
              <label htmlFor="assigneeFilter" className="filter-label mb-2">
                Filter by:
              </label>
            </div>
          </div>

          {/* Filter functionality: Priority and Assignee */}
          <div className="row  ">
            <div className="col">
              <input
                type="text"
                id="assigneeFilter"
                placeholder="Assignee Name"
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className="form-control filter-input mb-2 dynamic-width"
              />
            </div>
            <div className="col">
              <select
                id="priorityFilter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="form-control filter-dropdown mb-2 dynamic-width "
              >
                <option value="">Priority ▼</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
          </div>

          {/* Filter functionality: Date */}
          <div className="row">
            <div className="col ">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="form-control mb-2 dynamic-width "
                dateFormat="dd/MM/yyyy"
                placeholderText="Start Date"
              />
            </div>
            <div className="col">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="form-control mb-2 dynamic-width"
                dateFormat="dd/MM/yyyy"
                placeholderText="End Date"
              />
            </div>
          </div>

          {/* Add New Task button at the bottom */}
          <div className="row  ml-auto add-button1">
            <div className="col text-center">
              <button
                className="btn btn-primary"
                onClick={handleToggleTaskForm}
              >
                Add New Task
              </button>
            </div>
          </div>
        </div>

      

        {/* Cards section with horizontal scrolling */}
        <TaskList
        tasks={tasks}
        assigneeFilter={assigneeFilter}
        priorityFilter={priorityFilter}
       
      />

        <div className="row   add-button2">
          <div className="col text-center">
            <button className="btn btn-primary" onClick={handleToggleTaskForm}>
              Add New Task
            </button>
          </div>
        </div>
        {/* Task form dialog */}
        {showTaskForm && (
          <TaskInput
            // onAddTask={handleAddTask}
            onClose={handleToggleTaskForm}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
