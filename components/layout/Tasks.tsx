import React, { useContext, useEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Loader, TaskCard } from '@/components';
import { Task } from '@/models';
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
    onTaskLoad(tasks ? tasks.length : 0);
  }, [tasks]);

  // If no tasks, display image (random between 1-3)
  const randomIllustration = useMemo(() => {
    return 'illustration-' + Math.floor(Math.random() * (3 - 1 + 1) + 1);
  }, [tagFilters]);

  // Filter tasks based on hideDone, and tag filters
  const filteredTasks = useMemo<Task[] | undefined>(() => {
    if (tasks) {
      let filtered = tasks;
      // Filter tasks by- done
      if (hideDone) {
        filtered = tasks.filter((task) => (task.done ? null : task));
      }

      // Filter tasks by- tags
      if (tagFilters.length > 0) {
        filtered = filtered.filter((task) => {
          if (task.tags.some((tag) => tagFilters.includes(tag))) {
            return task;
          }
          return null;
        });
      }
      return filtered;
    }
    return tasks;
  }, [tasks, hideDone, tagFilters]);

  // Loading state
  if (isLoading) {
    return <Loader className='absolute top-60 left-[50%] -translate-x-1/2' />;
  }

  // Error state
  if (isError) {
    return <p>Error loading tasks</p>;
  }

  // No tasks
  if (filteredTasks?.length === 0) {
    const text = hideDone ? 'You have no pending tasks' : 'You have no tasks';

    return (
      <div className='absolute left-[50%] -translate-x-1/2 flex flex-col items-center md:mt-28'>
        <h3 className='dark:text-white'>{text}</h3>
        <div className={randomIllustration}></div>
      </div>
    );
  }

  // Display tasks
  return (
    <div className='flex flex-col items-start gap-6 md:flex-row flex-wrap pb-10'>
      {filteredTasks?.map((task) => {
        return <TaskCard key={task._id?.toString()} task={task} />;
      })}
    </div>
  );
};

export default Tasks;
