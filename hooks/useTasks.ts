import { TaskModel } from '@/models/task';
import { useEffect, useState } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  return tasks;
};
