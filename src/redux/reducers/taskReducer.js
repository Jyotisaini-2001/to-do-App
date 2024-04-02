// taskReducer.js

import { ADD_TASK, UPDATE_TASK, DELETE_TASK,LOAD_TASKS } from "../types";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  Pending: [],
  InProgress: [],
  Completed: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      // console.log("Action:", action);
      const { task } = action.payload;
      // console.log(task);
      const taskId = uuidv4();
      const taskWithId = { ...task, id: taskId };

      // console.log("task-id",task);
      return {
        ...state,
        // Pending: [...state.Pending, { ...task, id: taskId }],
        Pending: state.Pending ? [...state.Pending, taskWithId] : [taskWithId],
      };
    }

    case UPDATE_TASK: {
      const { taskId, updatedTaskData } = action.payload;
      // console.log("Task ID:", taskId);
      // console.log("Updated Task Data:", updatedTaskData);
      // const updatedTasks = { ...tasks };
      const updatedState = { ...state };
      // console.log("Current Tasks:", updatedState);

      // Find the task to be updated and its current status
      const currentStatus = Object.keys(updatedState).find((status) =>
        updatedState[status].some((task) => task.id === taskId)
      );
      if (
        updatedTaskData.status ===
        state[currentStatus].find((task) => task.id === taskId).status
      ) {
        updatedState[currentStatus] = updatedState[currentStatus].map((task) =>
          task.id === taskId ? { ...task, ...updatedTaskData } : task
        );
      } else {
        const updatedStatus = updatedState[currentStatus].filter(
          (task) => task.id !== taskId
        );
        updatedState[currentStatus] = updatedStatus;

        updatedState[updatedTaskData.status] = [
          ...updatedState[updatedTaskData.status],
          { id: taskId, ...updatedTaskData },
        ];
      }

      return updatedState;
    }
    case DELETE_TASK: {
      const deletedTaskId = action.payload;
      const updatedState = { ...state };

      // Remove the task with the given ID from all statuses
      Object.keys(updatedState).forEach((status) => {
        updatedState[status] = updatedState[status].filter(
          (task) => task.id !== deletedTaskId
        );
      });

      return updatedState;
    }
    // case LOAD_TASKS: {
    //   // Load tasks logic
    //   const loadedTasks = action.payload;
    //   return {
    //     ...state,
    //     ...loadedTasks, // Replace the entire tasks state with the loaded tasks
    //   };
    // }
    case LOAD_TASKS: {
      // Load tasks logic
      const loadedTasks = action.payload;
    
      // Initialize an updated state with the initial state
      let updatedState = { ...initialState };
    
      // Iterate over each status (Pending, InProgress, Completed)
      Object.keys(updatedState).forEach(status => {
        // If loaded tasks contain tasks for this status, update the state accordingly
        if (loadedTasks.hasOwnProperty(status)) {
          updatedState[status] = loadedTasks[status];
        }
      });
    
      return updatedState;
    }
    

    default:
      return state;
  }
};

export default taskReducer;
