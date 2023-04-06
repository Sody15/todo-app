import React, { FC } from 'react';

import styles from './Checkbox.module.css';

export const Checkbox: FC<{ checked: boolean; text: string; name: string }> = ({
  checked,
  text,
  name,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className="pr-2 lowercase">
        {text}
      </label>
      <div className="relative w-6 h-6">
        <input
          type="checkbox"
          name={name}
          className={styles.checkbox}
          checked={checked}
        />
        <span className={styles.checkmark}></span>
      </div>
    </div>
  );
};

export default Checkbox;
