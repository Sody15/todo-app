import { Task } from '@/models';

import { headers } from './util';

export const fetchTasks = (): Promise<Task[]> => {
  console.log('fetchTasks');
  return fetch('/api/tasks').then((res) => res.json());
};

export const updateTask = (_id: number, updatedTask: Partial<Task>): Promise<any> => {
  return fetch('/api/tasks/' + _id, {
    method: 'PATCH',
    body: JSON.stringify(updatedTask),
    headers,
  }).then((res) => res.json());
};

export const addTask = (task: Task): Promise<any> => {
  return fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers,
  }).then((res) => res.json());
};

export const deleteTask = (_id: number) => {
  return fetch('/api/tasks/' + _id, {
    method: 'DELETE',
  });
};
