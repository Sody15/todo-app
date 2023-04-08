import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Ubuntu } from 'next/font/google';

import clsx from 'clsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TagList } from '@components';
import { TaskModel } from '@/models';
import { addTask, updateTask } from '@/util/query-fn';

const ubuntu = Ubuntu({ weight: ['300', '500', '700'], subsets: ['latin'] });

type ActionType =
  | { type: 'TITLE'; payload: string }
  | { type: 'DESCRIPTION'; payload: string }
  | { type: 'TAGS'; payload: string[] };

const reducer = (state: TaskModel, action: ActionType) => {
  switch (action.type) {
    case 'TITLE':
      return { ...state, title: action.payload };
    case 'DESCRIPTION':
      return { ...state, description: action.payload };
    case 'TAGS':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

const AddTaskForm: FC<{
  task?: TaskModel;
  type?: 'Update' | 'Add';
  onClose: () => void;
}> = ({ onClose, type = 'Add', task }) => {
  const client = useQueryClient();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [formState, dispatch] = useReducer(reducer, {
    title: task?.title ?? '',
    description: task?.description ?? '',
    tags: task?.tags ?? [],
    done: task?.done ?? false,
  });

  const tagChange = (tags: string[]) => {
    dispatch({ type: 'TAGS', payload: tags });
  };

  const titleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'TITLE', payload: event.target.value });
  };

  const descriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'DESCRIPTION', payload: event.target.value });
  };

  const addMutation = useMutation({
    mutationFn: (task: TaskModel) => addTask(task),
    onSuccess: ({ insertedId }: { insertedId: number }) => {
      client.setQueryData(['tasks'], (tasks: TaskModel[] | undefined) => {
        if (tasks) {
          return [...tasks, { _id: insertedId, ...formState }];
        }
      });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (params: { id: number; task: TaskModel }) =>
      updateTask(params.id, params.task),
    onSuccess: () => {
      client.setQueryData(['tasks'], (tasks: TaskModel[] | undefined) => {
        if (tasks) {
          return tasks.map((t) => {
            if (t._id === task!._id) {
              t = { _id: t._id, ...formState };
            }
            return t;
          });
        }
      });
      onClose();
    },
  });

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (type === 'Add') {
      addMutation.mutate(formState);
    } else {
      updateMutation.mutate({ id: task?._id!, task: formState });
    }
  };

  return (
    <>
      <div
        className="backdrop left-0 absolute h-full w-full bg-black bg-opacity-60"
        onClick={onClose}
      ></div>
      <form
        className={clsx(
          'absolute  h-full bg-white p-6 z-20 w-full left-1/2 -translate-x-1/2 lg:translate-y-1/4 shadow-lg max-w-3xl lg:h-auto md:rounded-xl md:p-12',
          ubuntu.className
        )}
        onSubmit={submitHandler}
      >
        <div className="flex justify-between mb-20 lg:mb-6">
          <button
            onClick={onClose}
            id="cancel-btn"
            className=" rounded-lg  py-1"
          >
            Cancel
          </button>
          <button
            id="add-btn"
            className="bg-custom-dark-1 text-white rounded-lg px-16 py-3"
          >
            {type}
          </button>
        </div>
        <div>
          <div className="mb-6 w-full">
            <label htmlFor="title" className="block text-xl font-bold pb-3">
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              name="title"
              id="title"
              required
              defaultValue={task?.title}
              placeholder="add a title ..."
              className="bg-zinc-100 rounded-lg px-4 py-2 w-full"
              onChange={titleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block  text-xl font-bold pb-3"
            >
              Description
            </label>
            <textarea
              ref={descriptionRef}
              id="description"
              name="description"
              placeholder="add a description ..."
              rows={5}
              maxLength={500}
              required
              defaultValue={task?.description}
              className="bg-zinc-100 rounded-lg resize-none px-4 py-2 w-full"
              onChange={descriptionChange}
            ></textarea>
          </div>
          <div className="flex flex-col flex-wrap gap-6 lg:flex-row">
            <TagList
              tags={task?.tags}
              onTagChange={(tags) => tagChange(tags)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTaskForm;
