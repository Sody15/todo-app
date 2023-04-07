import React, { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Loader, Task } from '@components';
import { TaskModel } from '@models';
import AppContext from '@/global/context';
import { fetchTasks } from '@/util/query-fn';

const Tasks = () => {
  const { hideDone } = useContext(AppContext);

  console.log('render');

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<TaskModel[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  if (isLoading) {
    return (
      <div className="absolute top-60 left-[50%] -translate-x-1/2 ">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <p>Error loading tasks</p>;
  }

  // Filter tasks by done
  const filteredTasks = tasks.filter((task) =>
    hideDone && task.done ? null : task
  );

  if (filteredTasks.length === 0) {
    const text = hideDone ? 'You have no pending tasks' : 'You have no tasks';
    const randomIllustration =
      'illustration-' + Math.floor(Math.random() * (3 - 1 + 1) + 1);

    return (
      <div className="absolute top-60 left-[50%] -translate-x-1/2 flex flex-col items-center">
        <h3>{text}</h3>
        <div className={randomIllustration}></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-6 md:flex-row flex-wrap">
      {filteredTasks.map((task) => {
        return <Task key={task._id} task={task} />;
      })}
    </div>
  );
};

export default Tasks;
