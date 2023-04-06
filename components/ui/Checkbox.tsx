import React, { FC } from 'react';

import styles from './Checkbox.module.css';

export const Checkbox: FC<{ checked: boolean; text: string; name: string }> = ({
  checked,
  text,
  name,
}) => {
  const handleChange = () => {
    console.log('The checkbox was toggled');
  };

  return (
    <div className={styles.container}>
      <label htmlFor={name} className="pr-2 capitalize">
        {text}
      </label>
      <div className="relative w-6 h-6">
        <input
          type="checkbox"
          name={name}
          className={styles.checkbox}
          checked={checked}
          onChange={handleChange}
        />
        <span className={styles.checkmark}></span>
      </div>
    </div>
  );
};

export default Checkbox;
