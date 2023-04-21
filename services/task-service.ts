import { Task } from '@/models';

import { headers } from './util';
import { ObjectId } from 'mongodb';

export const fetchTasks = (): Promise<Task[]> => {
  return fetch('/api/tasks').then((res) => {
    if (!res.ok) {
      throw Error('Error loading tasks');
    }
    return res.json();
  });
};

export const updateTask = (_id: ObjectId, updatedTask: Partial<Task>): Promise<any> => {
  return fetch('/api/tasks/' + _id, {
    method: 'PATCH',
    body: JSON.stringify(updatedTask),
    headers,
  }).then((res) => {
    if (!res.ok) {
      throw Error('Error updating task');
    }
    return res.json();
  });
};

export const addTask = (task: Task): Promise<any> => {
  return fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers,
  }).then((res) => {
    if (!res.ok) {
      throw Error('Error adding task');
    }
    return res.json();
  });
};

export const deleteTask = (_id: ObjectId) => {
  return fetch('/api/tasks/' + _id, {
    method: 'DELETE',
  });
};
