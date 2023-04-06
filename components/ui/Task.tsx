import React, { FC } from 'react';
import clsx from 'clsx';

import { TaskModel } from '@models';
import { Checkbox, Menu, Tag } from '@components';
import { API_ENDPOINT } from '@/global/constants';

const Task: FC<{ task: TaskModel }> = ({ task }) => {
  const editHandler = () => {
    console.log(task._id);
  };

  const deleteHandler = async () => {
    await fetch(`${API_ENDPOINT}tasks/${task._id}`, {
      method: 'DELETE',
    });
  };

  return (
    <div className="bg-custom-yellow p-6 rounded-xl w-full max-w-lg">
      <div className="flex justify-between items-center">
        <h3 className={clsx({ 'line-through': task.done })}>{task.title}</h3>
        <Menu onEdit={editHandler} onDelete={deleteHandler} />
      </div>
      <p className={clsx('my-3', { 'line-through': task.done })}>
        {task.description}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {task.tags.map((tag) => {
            return (
              <Tag key={`${task._id} + ${tag}`} showText={false} text={tag} />
            );
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
