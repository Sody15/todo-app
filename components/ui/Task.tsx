import React, { FC } from 'react';
import clsx from 'clsx';

import { TaskModel } from '@/models/task';
import Menu from './Menu';
import Checkbox from './Checkbox';
import { Tag } from './Tag';

const Task: FC<{ task: TaskModel }> = ({ task }) => {
  return (
    <div className="bg-custom-yellow p-6 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className={clsx({ 'line-through': task.done })}>{task.title}</h3>
        <Menu />
      </div>
      <p className={clsx('my-3', { 'line-through': task.done })}>
        {task.description}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {task.tags.map((tag) => {
            return <Tag key={tag} showText={false} name={tag} />;
          })}
        </div>
        <div>
          <Checkbox name="done" text="done" checked={task.done} />
        </div>
      </div>
    </div>
  );
};

export default Task;
