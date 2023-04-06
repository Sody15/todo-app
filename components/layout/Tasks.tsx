import React, { FC } from 'react';

import { Task } from '@components';
import { TaskModel } from '@models';

const Tasks: FC<{ tasks: TaskModel[] }> = ({ tasks }) => {
  if (!tasks) {
    return null;
  }
  return (
    <div className="flex flex-col gap-6 md:row-span-1 md:col-span-3 md:flex-row xl:col-span-7 flex-wrap">
      {tasks.map((task) => {
        return <Task key={task._id} task={task} />;
      })}
    </div>
  );
};

export default Tasks;
