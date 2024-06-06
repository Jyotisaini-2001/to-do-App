
// src/redux/reducers/taskReducer.js
import { ADD_TASK, UPDATE_TASK, DELETE_TASK, LOAD_TASKS } from "../types";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  Pending: [],
  InProgress: [],
  Completed: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const { task } = action.payload;
      const taskId = uuidv4();
      const taskWithId = { ...task, id: taskId };

      return {
        ...state,
        Pending: [...state.Pending, taskWithId],
      };
    }

    // case UPDATE_TASK: {
    //   const { taskId, updatedTaskData } = action.payload;
    //   const updatedState = { ...state };

    //   const currentStatus = Object.keys(updatedState).find((status) =>
    //     updatedState[status].some((task) => task.id === taskId)
    //   );

    //   if (
    //     updatedTaskData.status ===
    //     state[currentStatus].find((task) => task.id === taskId).status
    //   ) {
    //     updatedState[currentStatus] = updatedState[currentStatus].map((task) =>
    //       task.id === taskId ? { ...task, ...updatedTaskData } : task
    //     );
    //   } else {
    //     const updatedStatus = updatedState[currentStatus].filter(
    //       (task) => task.id !== taskId
    //     );
    //     updatedState[currentStatus] = updatedStatus;

    //     updatedState[updatedTaskData.status] = [
    //       ...updatedState[updatedTaskData.status],
    //       { id: taskId, ...updatedTaskData },
    //     ];
    //   }

    //   return updatedState;
    // }
    case UPDATE_TASK: {
      const { taskId, updatedTaskData } = action.payload;
      console.log("Task ID:", taskId);
      console.log("Updated Task Data:", updatedTaskData);
    
      const updatedState = { ...state };
    
      const currentStatus = Object.keys(updatedState).find((status) =>
        updatedState[status].some((task) => task.id === taskId)
      );
      console.log("Current Status:", currentStatus);
    
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
    
      console.log("Updated State:", updatedState);
      return updatedState;
    }
    
    case DELETE_TASK: {
      const deletedTaskId = action.payload;
      const updatedState = { ...state };

      Object.keys(updatedState).forEach((status) => {
        updatedState[status] = updatedState[status].filter(
          (task) => task.id !== deletedTaskId
        );
      });

      return updatedState;
    }

    case LOAD_TASKS: {
      const loadedTasks = action.payload;
      let updatedState = { ...initialState };

      Object.keys(updatedState).forEach((status) => {
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
