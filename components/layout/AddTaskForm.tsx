import { tags } from '@/global/constants';
import React, { FC } from 'react';
import { Tag } from '../ui/Tag';

const AddTaskForm: FC<{ onCancel: () => void }> = ({ onCancel }) => {
  return (
    <form className="absolute top-0 left-0 w-full h-full bg-white p-6 z-10">
      <div className="flex justify-between mb-20">
        <button
          onClick={onCancel}
          id="cancel-btn"
          className=" rounded-lg  py-1"
        >
          Cancel
        </button>
        <button
          id="add-btn"
          className="bg-custom-dark-1 text-white rounded-lg px-16 py-3"
        >
          Add
        </button>
      </div>
      <div>
        <div className="mb-6 w-full">
          <label htmlFor="title" className="block text-xl font-bold pb-3">
            Title
          </label>
          <input
            type="text"
            name="title"
            id=""
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
            name="description"
            placeholder="add a description ..."
            rows={10}
            className="bg-zinc-100 rounded-lg resize-none px-3 py-2 w-full"
          ></textarea>
        </div>
        <div className="flex flex-col flex-wrap gap-y-6">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} showText={true} />
          ))}
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
