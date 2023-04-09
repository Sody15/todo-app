import { Task } from '@/models';

export const fetchTasks = (): Promise<Task[]> => {
  return fetch('/api/tasks')
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const updateTask = (_id: number, updatedTask: Partial<Task>): Promise<any> => {
  return fetch('/api/tasks/' + _id, {
    method: 'PATCH',
    body: JSON.stringify(updatedTask),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const addTask = (task: Task): Promise<any> => {
  return fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const deleteTask = (_id: number) => {
  return fetch('/api/tasks/' + _id, {
    method: 'DELETE',
  });
};
