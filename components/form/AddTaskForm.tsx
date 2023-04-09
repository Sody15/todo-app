import React, { FC, FormEvent, useEffect, useReducer, useRef, useState } from 'react';
import { Ubuntu } from 'next/font/google';

import clsx from 'clsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Loader, TagList } from '@components';
import { Task } from '@/models';
import { addTask, updateTask } from '@/util/query-fn';
import { DESC_LENGTH, TITLE_LENGTH } from '@/global';

const ubuntu = Ubuntu({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
});

type ActionType =
  | { type: 'TITLE'; payload: string }
  | {
      type: 'DESCRIPTION';
      payload: string;
    }
  | { type: 'TAGS'; payload: string[] };

const reducer = (state: Task, action: ActionType) => {
  switch (action.type) {
    case 'TITLE':
      return {
        ...state,
        title: action.payload,
      };
    case 'DESCRIPTION':
      return {
        ...state,
        description: action.payload,
      };
    case 'TAGS':
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
};

const AddTaskForm: FC<{
  task?: Task;
  type?: 'Update' | 'Add';
  onClose: () => void;
}> = ({ onClose, type = 'Add', task }) => {
  const client = useQueryClient();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [formData, dispatch] = useReducer(reducer, {
    title: task?.title ?? '',
    description: task?.description ?? '',
    tags: task?.tags ?? [],
    done: task?.done ?? false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  type ErrorState = {
    hasError: boolean;
    errorText: string;
  };
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    errorText: 'No error',
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const tagChange = (tags: string[]) => {
    dispatch({
      type: 'TAGS',
      payload: tags,
    });
  };

  const addMutation = useMutation({
    mutationFn: () => addTask(formData),
    onSuccess: ({ insertedId }: { insertedId: number }) => {
      client.setQueryData(['tasks'], (tasks: Task[] | undefined) => {
        if (tasks) {
          return [
            ...tasks,
            {
              _id: insertedId,
              ...formData,
            },
          ];
        }
      });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      setError({
        hasError: true,
        errorText: 'There was an error adding your task',
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => updateTask(task?._id!, formData),
    onSuccess: () => {
      client.setQueryData(['tasks'], (tasks: Task[] | undefined) => {
        if (tasks) {
          return tasks.map((t) => {
            if (t._id === task!._id) {
              t = {
                _id: t._id,
                ...formData,
              };
            }
            return t;
          });
        }
      });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      setError({
        hasError: true,
        errorText: 'There was an error updating your task',
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      type: 'TITLE',
      payload: titleRef!.current!.value,
    });

    dispatch({
      type: 'DESCRIPTION',
      payload: descriptionRef!.current!.value,
    });

    setIsSubmitting(true);

    if (type === 'Add') {
      addMutation.mutate();
    } else {
      updateMutation.mutate();
    }
  };

  return (
    <>
      {
        // Backdrop
      }
      <div className='backdrop left-0 absolute h-full w-full bg-black bg-opacity-60 z-40' onClick={onClose}></div>
      <form
        className={clsx(
          'fixed bg-white p-6 z-50 h-screen w-full left-1/2 -translate-x-1/2 lg:translate-y-1/4 shadow-lg max-w-3xl lg:h-auto md:rounded-xl md:p-12 overflow-scroll',
          ubuntu.className
        )}
        onSubmit={submitHandler}
      >
        <div className='flex justify-between mb-4 lg:mb-0'>
          <button onClick={onClose} id='cancel-btn' className='rounded-lg py-1' type='button'>
            Cancel
          </button>
          <button
            type='submit'
            id='add-btn'
            className='bg-custom-dark-1 text-white rounded-lg px-16 py-3  disabled:opacity-40'
            disabled={isSubmitting}
          >
            {type}
          </button>
        </div>
        <div className='relative'>
          {
            // Error
          }
          <div
            className={clsx('text-red-300 py-6', {
              invisible: !error.hasError,
              visible: error.hasError,
            })}
          >
            {error.errorText}
          </div>
          {
            // Loader
          }
          {isSubmitting && (
            <>
              <div className='absolute bg-gray-50 opacity-50 w-full h-full'></div>
              <Loader className='absolute left-[50%] -translate-x-1/2 top-12' />
            </>
          )}
          {
            // Title
          }
          <div className='mb-6 w-full'>
            <label htmlFor='title' className='block text-xl font-bold pb-3'>
              Title
            </label>
            <input
              ref={titleRef}
              type='text'
              name='title'
              id='title'
              required
              defaultValue={task?.title}
              placeholder='add a title ...'
              className='bg-zinc-100 rounded-lg px-4 py-2 w-full'
              maxLength={TITLE_LENGTH}
            />
          </div>
          {
            // Description
          }
          <div className='mb-6'>
            <label htmlFor='description' className='block  text-xl font-bold pb-3'>
              Description
            </label>
            <textarea
              ref={descriptionRef}
              id='description'
              name='description'
              placeholder='add a description ...'
              rows={5}
              maxLength={DESC_LENGTH}
              required
              defaultValue={task?.description}
              className='bg-zinc-100 rounded-lg resize-none px-4 py-2 w-full'
            ></textarea>
          </div>
          {
            // Tags
          }
          <div className='flex flex-col flex-wrap gap-6 mb-16 lg:flex-row lg:mb-0'>
            <TagList tags={task?.tags} onTagChange={(tags) => tagChange(tags)} />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTaskForm;
