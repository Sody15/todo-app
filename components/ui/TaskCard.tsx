import React, { FC, useMemo, useState } from 'react';
import clsx from 'clsx';

import { Task } from '@models';
import { TaskForm, Checkbox, Loader, Menu, Portal, Tag } from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask, updateTask } from '@/services/task-service';
import { ObjectId } from 'mongodb';

const DESCR_DISPLAY_LENGTH = 300;

const TaskCard: FC<{ task: Task }> = ({ task }) => {
  const client = useQueryClient();

  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const [isDone, setIsDone] = useState(task.done);
  const [isDeleting, setIsDeleting] = useState(false);

  const largeDesc = useMemo(() => {
    return task.description.length > DESCR_DISPLAY_LENGTH;
  }, [task.description]);

  const deleteMutation = useMutation({
    mutationFn: (_id: ObjectId) => deleteTask(_id),
    onSuccess: () =>
      client.setQueryData(['tasks'], (tasks: Task[] | undefined) => {
        if (tasks) {
          return tasks.filter((t) => t._id !== task._id);
        }
      }),
    onSettled: () => {
      setIsDeleting(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (_id: ObjectId) => updateTask(_id, { done: isDone }),
    onSuccess: () =>
      client.setQueryData(['tasks'], (prev: Task[] | undefined) => {
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

  const truncateDesc = (): string => {
    if (largeDesc && !showFullDesc) {
      return task.description.slice(0, DESCR_DISPLAY_LENGTH) + '...';
    }
    return task.description;
  };

  return (
    <>
      <div className='bg-custom-yellow relative  rounded-xl w-full max-w-xl xl:max-w-sm '>
        {
          // Loader on Delete
        }
        {isDeleting && (
          <>
            <div className='absolute bg-black opacity-5 w-full h-full'></div>
            <Loader className='absolute left-[50%] -translate-x-10 z-50 top-1/2 -translate-y-1/2' />
          </>
        )}
        {
          // Card
        }
        <div className='relative p-6'>
          {
            // Title & Menu
          }
          <div className='flex justify-between items-center'>
            <h3 className={clsx({ 'line-through': isDone })}>{task.title}</h3>
            <Menu
              onEdit={() => setIsUpdateTask((prevState) => !prevState)}
              onDelete={() => {
                deleteMutation.mutate(task._id!);
                setIsDeleting(true);
              }}
            />
          </div>
          {
            // Description
          }
          <p
            className={clsx('my-3', { 'cursor-pointer': largeDesc }, { 'line-through': isDone })}
            onClick={() => (largeDesc ? setShowFullDesc((prevVal) => !prevVal) : null)}
          >
            {truncateDesc()}
          </p>
          {
            // Tags & Done Checkbox
          }
          <div className='flex justify-between items-center'>
            <div className='flex gap-3'>
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
                name='done'
                label='done'
                checked={isDone}
                onChange={(checked) => {
                  setIsDone(checked);
                  updateMutation.mutate(task._id!);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {
        // Add Task Form on Edit
      }
      {isUpdateTask && (
        <Portal>
          <TaskForm task={task} type='Update' onClose={() => setIsUpdateTask(false)} />
        </Portal>
      )}
    </>
  );
};

export default TaskCard;
