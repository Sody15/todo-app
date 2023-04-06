import React from 'react';

import Task from '../ui/Task';
import { TaskModel } from '@/models/task';

const dummyData: TaskModel[] = [
  {
    title: 'The first task title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat et eum saepe illum ut eos quae perspiciatis sit.',
    done: false,
    tags: ['work', 'study', 'entertainment'],
  },
  {
    title: 'The second task title',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    done: true,
    tags: ['study', 'entertainment'],
  },
];

const Tasks = () => {
  return (
    <div className="flex flex-col gap-6">
      {dummyData.map((task) => {
        return <Task key={task.title} task={task} />;
      })}
    </div>
  );
};

export default Tasks;
