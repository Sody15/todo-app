import React, { FC, useState } from 'react';
import clsx from 'clsx';

import { TaskModel } from '@models';
import { AddTaskForm, Checkbox, Menu, Portal, Tag } from '@components';
import { API_ENDPOINT } from '@/global/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Task: FC<{ task: TaskModel }> = ({ task }) => {
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const [isDone, setIsDone] = useState(task.done);

  const client = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (_id: number) => {
      return await fetch('/api/tasks/' + task!._id, {
        method: 'DELETE',
      });
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const updateMutation = useMutation({
    mutationFn: async (_id: number) => {
      return await fetch('/api/tasks/' + task!._id, {
        method: 'PATCH',
        body: JSON.stringify({ done: isDone }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () =>
      client.setQueryData(['tasks'], (prev: TaskModel[] | undefined) => {
        if (prev) {
          return prev.map((t) => {
            if (t._id === task._id) {
              console.log('match found');
              t.done = isDone;
              console.log(t);
            }
            return t;
          });
        }
      }),
  });

  const editHandler = () => {
    console.log(task._id);
  };

  return (
    <>
      <div className="bg-custom-yellow p-6 rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h3 className={clsx({ 'line-through': isDone })}>{task.title}</h3>
          <Menu
            onEdit={() => setIsUpdateTask((prevState) => !prevState)}
            onDelete={() => deleteMutation.mutate(task._id!)}
          />
        </div>
        <p className={clsx('my-3', { 'line-through': isDone })}>
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
            <Checkbox
              name="done"
              label="done"
              checked={isDone}
              onChange={(checked) => {
                setIsDone(checked);
                updateMutation.mutate(task._id!);
              }}
            />
          </div>
        </div>
      </div>
      {isUpdateTask && (
        <Portal>
          <AddTaskForm
            task={task}
            type="Update"
            onClose={() => setIsUpdateTask(false)}
          />
        </Portal>
      )}
    </>
  );
};

export default Task;
