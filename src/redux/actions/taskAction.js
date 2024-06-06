
import { ADD_TASK, UPDATE_TASK, DELETE_TASK, LOAD_TASKS } from '../types';

export const addTask = (task, userId) => ({
  type: ADD_TASK,
  payload: { task: { ...task, userId } },
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
