import React, { FC, useMemo, useState } from 'react';
import clsx from 'clsx';

import { TaskModel } from '@models';
import { AddTaskForm, Checkbox, Menu, Portal, Tag } from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask, updateTask } from '@/util/query-fn';

const DESCR_DISPLAY_LENGTH = 300;

const Task: FC<{ task: TaskModel }> = ({ task }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const [isDone, setIsDone] = useState(task.done);

  const largeDesc = useMemo(() => {
    return task.description.length > DESCR_DISPLAY_LENGTH;
  }, [task.description]);

  const client = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (_id: number) => deleteTask(_id),
    onSuccess: () =>
      client.setQueryData(['tasks'], (tasks: TaskModel[] | undefined) => {
        if (tasks) {
          return tasks.filter((t) => t._id !== task._id);
        }
      }),
  });

  const updateMutation = useMutation({
    mutationFn: (_id: number) => updateTask(_id, { done: isDone }),
    onSuccess: () =>
      client.setQueryData(['tasks'], (prev: TaskModel[] | undefined) => {
        if (prev) {
          return prev.map((t) => {
            if (t._id === task._id) {
              t.done = isDone;
            }
            return t;
          });
        }
      }),
  });

  const editHandler = () => {};

  const truncateDesc = (): string => {
    if (largeDesc && !showFullDesc) {
      return task.description.slice(0, DESCR_DISPLAY_LENGTH) + '...';
    }
    return task.description;
  };

  return (
    <>
      <div className="bg-custom-yellow p-6 rounded-xl w-full max-w-xl xl:max-w-sm">
        <div className="flex justify-between items-center">
          <h3 className={clsx({ 'line-through': isDone })}>{task.title}</h3>
          <Menu
            onEdit={() => setIsUpdateTask((prevState) => !prevState)}
            onDelete={() => deleteMutation.mutate(task._id!)}
          />
        </div>
        <p
          className={clsx(
            'my-3',
            { 'cursor-pointer': largeDesc },
            { 'line-through': isDone }
          )}
          onClick={() =>
            largeDesc ? setShowFullDesc((prevVal) => !prevVal) : null
          }
        >
          {truncateDesc()}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {task.tags.map((tag) => {
              return (
                <Tag
                  key={`${task._id} + ${tag}`}
                  showText={false}
                  text={tag}
                  onSelect={() => null}
                  onDeSelect={() => null}
                />
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
