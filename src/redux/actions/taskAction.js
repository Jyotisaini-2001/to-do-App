// src/redux/actions/taskActions.js

import { ADD_TASK, UPDATE_TASK, DELETE_TASK,LOAD_TASKS } from '../types';
// taskAction.js

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: { task }, // Make sure the task object is wrapped properly
});


export const updateTask = (taskId, updatedTaskData) => ({
  type: UPDATE_TASK,
  payload: { taskId, updatedTaskData },
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});
export const loadTasks = (tasks) => ({
  type: LOAD_TASKS,
  payload: tasks,
});