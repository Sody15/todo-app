import { TAGS } from '@/global/constants';
import React, { FC, FormEvent, useRef, useState } from 'react';
import { Tag } from '@components';
import { TaskModel } from '@/models';
import { useQueryClient } from '@tanstack/react-query';
import { Ubuntu } from 'next/font/google';
import clsx from 'clsx';

const ubuntu = Ubuntu({ weight: ['300', '500', '700'], subsets: ['latin'] });

const AddTaskForm: FC<{
  task?: TaskModel;
  type?: 'Update' | 'Add';
  onClose: () => void;
}> = ({ onClose, type = 'Add', task }) => {
  const client = useQueryClient();

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const [formState, setFormState] = useState({
    title: task?.title ?? '',
    description: task?.description ?? '',
    tags: task?.tags ?? [],
    done: task?.done ?? false,
  });

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log(titleRef.current.value);
    // console.log(descriptionRef.current);

    if (type === 'Add') {
      await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      await fetch('/api/tasks/' + task!._id, {
        method: 'PUT',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    client.invalidateQueries({ queryKey: ['tasks'] });
    onClose();
  };

  return (
    <>
      <div
        className="backdrop left-0 absolute h-full w-full bg-black bg-opacity-60"
        onClick={onClose}
      ></div>
      <form
        className={clsx(
          'absolute top-0 h-full bg-white p-6 z-20 w-full left-1/2 -translate-x-1/2 shadow-lg max-w-xl lg:h-auto',
          ubuntu.className
        )}
        onSubmit={submitHandler}
      >
        <div className="flex justify-between mb-20">
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
              className="bg-zinc-100 rounded-lg px-3 py-2 w-full"
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
              rows={10}
              required
              defaultValue={task?.description}
              className="bg-zinc-100 rounded-lg resize-none px-3 py-2 w-full"
            ></textarea>
          </div>
          <div className="flex flex-col flex-wrap gap-y-6">
            {TAGS.map((tag) => (
              <Tag
                key={tag}
                text={tag}
                showText={true}
                selected={task?.tags.includes(tag)}
              />
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTaskForm;
