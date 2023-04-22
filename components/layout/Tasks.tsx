import React, { useContext, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Loader, TaskCard } from '@components';
import { Task } from '@models';
import NavContext from '@/context/NavContext';
import { fetchTasks } from '@/services/task-service';

const Tasks = ({ onTaskLoad }: { onTaskLoad: (numTasks: number) => void }) => {
  const { hideDone, tagFilters } = useContext(NavContext);

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    onTaskLoad(tasks?.length!);
  }, [tasks]);

  if (isLoading) {
    return <Loader className='absolute top-60 left-[50%] -translate-x-1/2' />;
  }

  if (isError) {
    return <p>Error loading tasks</p>;
  }

  let filteredTasks = tasks;

  // Filter tasks by- done
  if (hideDone) {
    filteredTasks = tasks.filter((task) => (task.done ? null : task));
  }

  // Filter tasks by- tags
  if (tagFilters.length > 0) {
    filteredTasks = filteredTasks.filter((task) => {
      if (task.tags.some((tag) => tagFilters.includes(tag))) {
        return task;
      }
      return null;
    });
  }

  // If no tasks, display image (random between 1-3)
  if (filteredTasks.length === 0) {
    const text = hideDone ? 'You have no pending tasks' : 'You have no tasks';
    const randomIllustration = 'illustration-' + Math.floor(Math.random() * (3 - 1 + 1) + 1);

    return (
      <div className='absolute left-[50%] -translate-x-1/2 flex flex-col items-center md:mt-28'>
        <h3>{text}</h3>
        <div className={randomIllustration}></div>
      </div>
    );
  }

  // Display tasks
  return (
    <div className='flex flex-col items-start gap-6 md:flex-row flex-wrap pb-10'>
      {filteredTasks.map((task) => {
        return <TaskCard key={task._id?.toString()} task={task} />;
      })}
    </div>
  );
};

export default Tasks;
