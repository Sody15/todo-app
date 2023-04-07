import React, { FC, useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Loader, Task } from '@components';
import { TaskModel } from '@models';
import { API_ENDPOINT } from '@/global/constants';
import AppContext from '@/global/context';

const Tasks = () => {
  const { hideDone } = useContext(AppContext);

  console.log(hideDone);

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<TaskModel[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const tasks = await fetch(API_ENDPOINT + 'tasks')
        .then((res) => res.json())
        .catch((err) => console.error(err));
      return tasks;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10 md:col-span-3 xl:col-span-7">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <p>Error loading tasks</p>;
  }

  if (!tasks) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-6 md:col-span-3 md:flex-row xl:col-span-7 flex-wrap">
      {tasks
        .filter((task) => (hideDone && task.done ? null : task))
        .map((task) => {
          return <Task key={task._id} task={task} />;
        })}
    </div>
  );
};

// const Tasks: FC<{ tasks: TaskModel[] }> = ({ tasks }) => {
//   if (!tasks) {
//     return null;
//   }
//   return (
//     <div className="flex flex-col gap-6 md:row-span-1 md:col-span-3 md:flex-row xl:col-span-7 flex-wrap">
//       {tasks.map((task) => {
//         return <Task key={task._id} task={task} />;
//       })}
//     </div>
//   );
// };

export default Tasks;
